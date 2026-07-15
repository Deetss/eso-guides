import os
import sys
import json
import time
import shutil
import threading
import re
from http.server import HTTPServer, BaseHTTPRequestHandler
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

ADDON_FOLDER_NAME = "EsoCompanion"

class CORSRequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def log_message(self, format, *args):
        return

    def do_GET(self):
        if self.path == '/profile':
            profile_path = os.path.join(os.path.dirname(__file__), '../public/live_profile.json')
            if not os.path.exists(profile_path):
                profile_path = "live_profile.json"
                
            if os.path.exists(profile_path):
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                with open(profile_path, 'r', encoding='utf-8') as f:
                    self.wfile.write(f.read().encode('utf-8'))
            else:
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"error": "Profile not loaded yet. Reload UI in-game."}')
        else:
            self.send_response(404)
            self.end_headers()

class CompanionApp:
    def __init__(self, root):
        self.root = root
        self.root.title("ESO Companion Sync Client")
        self.root.geometry("520x580")
        self.root.configure(bg="#101216")
        self.root.resizable(False, False)
        
        # Style configuration
        self.style = ttk.Style()
        self.style.theme_use('clam')
        self.style.configure("TCheckbutton", background="#101216", foreground="#ffffff", font=("Outfit", 9))
        
        # Addon source (package path)
        if hasattr(sys, '_MEIPASS'):
            self.addon_src = os.path.join(sys._MEIPASS, 'eso-addon')
        else:
            self.addon_src = os.path.join(os.path.dirname(__file__), '../eso-addon')
            if not os.path.exists(self.addon_src):
                self.addon_src = "eso-addon" # fallback
            
        self.eso_path = tk.StringVar()
        self.status_msg = tk.StringVar(value="Status: Idle")
        self.sync_active = False
        self.watcher_thread = None
        self.server_thread = None
        self.httpd = None
        
        # Task Checklist variables
        self.task_vars = {
            "mount": tk.BooleanVar(),
            "writs": tk.BooleanVar(),
            "dungeon": tk.BooleanVar(),
            "bg": tk.BooleanVar(),
            "endeavors": tk.BooleanVar(),
            "pledges": tk.BooleanVar(),
            "weekly_endeavor": tk.BooleanVar()
        }
        
        self.load_config()
        self.load_saved_tasks()
        self.create_widgets()
        self.start_server()
        if self.eso_path.get():
            self.start_sync()

    def load_config(self):
        config_path = os.path.join(os.path.dirname(__file__), '../config.json')
        if not os.path.exists(config_path):
            config_path = "config.json"
            
        default_path = ""
        if sys.platform == "win32":
            default_path = os.path.expanduser("~/Documents/Elder Scrolls Online/live")
        else:
            default_path = os.path.expanduser("~/Documents/Elder Scrolls Online/live")

        if os.path.exists(config_path):
            try:
                with open(config_path, 'r', encoding='utf-8') as f:
                    cfg = json.load(f)
                    default_path = cfg.get("esoUserPath", default_path)
            except:
                pass
        self.eso_path.set(default_path)

    def save_config(self):
        config_path = os.path.join(os.path.dirname(__file__), '../config.json')
        if not os.path.exists(os.path.dirname(config_path)) and os.path.dirname(config_path) != "":
            config_path = "config.json"
        try:
            with open(config_path, 'w', encoding='utf-8') as f:
                json.dump({"esoUserPath": self.eso_path.get()}, f, indent=2)
        except Exception as e:
            print("Failed to save config:", e)

    def load_saved_tasks(self):
        output_path = os.path.join(os.path.dirname(__file__), '../public/live_profile.json')
        if not os.path.exists(output_path):
            output_path = "live_profile.json"
            
        if os.path.exists(output_path):
            try:
                with open(output_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    checked = data.get("checkedTasks", {})
                    for task_id, var in self.task_vars.items():
                        var.set(checked.get(task_id, False))
            except:
                pass

    def create_widgets(self):
        # Header banner
        header = tk.Label(self.root, text="📜 ESO COMPANION SYNC", font=("Cinzel", 16, "bold"), fg="#d5b875", bg="#101216")
        header.pack(pady=10)
        
        # Subtitle
        subtitle = tk.Label(self.root, text="Auto-syncs in-game gear, CP, and Mundus to your dashboard.", font=("Outfit", 9), fg="#94a3b8", bg="#101216")
        subtitle.pack(pady=2)

        # Path select frame
        path_frame = tk.Frame(self.root, bg="#101216")
        path_frame.pack(fill="x", padx=30, pady=10)
        
        path_label = tk.Label(path_frame, text="ESO Live Directory Path:", font=("Outfit", 9, "bold"), fg="#94a3b8", bg="#101216")
        path_label.pack(anchor="w")
        
        path_input_frame = tk.Frame(path_frame, bg="#101216")
        path_input_frame.pack(fill="x", pady=5)
        
        self.path_entry = tk.Entry(path_input_frame, textvariable=self.eso_path, font=("Outfit", 9), bg="#1c1f26", fg="#ffffff", insertbackground="white", borderwidth=1, relief="solid")
        self.path_entry.pack(side="left", fill="x", expand=True, ipady=4, padx=(0, 8))
        
        browse_btn = tk.Button(path_input_frame, text="Browse", command=self.browse_folder, font=("Outfit", 9, "bold"), bg="#1c1f26", fg="#d5b875", activebackground="#2a2f3a", activeforeground="#d5b875", relief="flat", padx=10)
        browse_btn.pack(side="right")

        # Operations Frame
        ops_frame = tk.Frame(self.root, bg="#101216")
        ops_frame.pack(fill="x", padx=30, pady=5)
        
        # Install and Manual Sync buttons side-by-side
        buttons_frame = tk.Frame(ops_frame, bg="#101216")
        buttons_frame.pack(fill="x", pady=5)
        
        self.install_btn = tk.Button(buttons_frame, text="⚙️ Install Addon", command=self.install_addon, font=("Outfit", 9, "bold"), bg="#1c1f26", fg="#d5b875", activebackground="#2a2f3a", activeforeground="#d5b875", relief="flat", height=2)
        self.install_btn.pack(side="left", fill="x", expand=True, padx=(0, 4))
        
        self.manual_sync_btn = tk.Button(buttons_frame, text="🔄 Refresh Sync", command=self.manual_sync, font=("Outfit", 9, "bold"), bg="#1c1f26", fg="#d5b875", activebackground="#2a2f3a", activeforeground="#d5b875", relief="flat", height=2)
        self.manual_sync_btn.pack(side="right", fill="x", expand=True, padx=(4, 0))

        # Checklist LabelFrame
        chk_frame = tk.LabelFrame(self.root, text="📋 Daily & Weekly Task Tracker", font=("Outfit", 10, "bold"), fg="#d5b875", bg="#101216", bd=1, labelanchor="n")
        chk_frame.pack(fill="both", expand=True, padx=30, pady=10)
        
        grid_frame = tk.Frame(chk_frame, bg="#101216")
        grid_frame.pack(pady=10, padx=10)
        
        # Column 1 (Dailies)
        col1 = tk.Frame(grid_frame, bg="#101216")
        col1.pack(side="left", fill="both", expand=True, padx=10)
        tk.Label(col1, text="Everyday Checks", font=("Outfit", 9, "bold"), fg="#d5b875", bg="#101216").pack(anchor="w", pady=(0, 5))
        
        tk.Checkbutton(col1, text="🐴 Mount Upgrade", variable=self.task_vars["mount"], command=self.save_current_state, bg="#101216", fg="#ffffff", selectcolor="#1c1f26", activebackground="#101216", activeforeground="#ffffff").pack(anchor="w", pady=2)
        tk.Checkbutton(col1, text="🔨 Daily Writs", variable=self.task_vars["writs"], command=self.save_current_state, bg="#101216", fg="#ffffff", selectcolor="#1c1f26", activebackground="#101216", activeforeground="#ffffff").pack(anchor="w", pady=2)
        tk.Checkbutton(col1, text="⚔️ Daily Dungeon", variable=self.task_vars["dungeon"], command=self.save_current_state, bg="#101216", fg="#ffffff", selectcolor="#1c1f26", activebackground="#101216", activeforeground="#ffffff").pack(anchor="w", pady=2)
        tk.Checkbutton(col1, text="🛡️ Daily BG Run", variable=self.task_vars["bg"], command=self.save_current_state, bg="#101216", fg="#ffffff", selectcolor="#1c1f26", activebackground="#101216", activeforeground="#ffffff").pack(anchor="w", pady=2)
        tk.Checkbutton(col1, text="🌟 Daily Endeavors", variable=self.task_vars["endeavors"], command=self.save_current_state, bg="#101216", fg="#ffffff", selectcolor="#1c1f26", activebackground="#101216", activeforeground="#ffffff").pack(anchor="w", pady=2)

        # Column 2 (Weeklies)
        col2 = tk.Frame(grid_frame, bg="#101216")
        col2.pack(side="right", fill="both", expand=True, padx=10)
        tk.Label(col2, text="Weekly Resets", font=("Outfit", 9, "bold"), fg="#d5b875", bg="#101216").pack(anchor="w", pady=(0, 5))
        
        tk.Checkbutton(col2, text="🔑 Undaunted Pledges", variable=self.task_vars["pledges"], command=self.save_current_state, bg="#101216", fg="#ffffff", selectcolor="#1c1f26", activebackground="#101216", activeforeground="#ffffff").pack(anchor="w", pady=2)
        tk.Checkbutton(col2, text="🏆 Weekly Endeavor", variable=self.task_vars["weekly_endeavor"], command=self.save_current_state, bg="#101216", fg="#ffffff", selectcolor="#1c1f26", activebackground="#101216", activeforeground="#ffffff").pack(anchor="w", pady=2)

        # Status box
        self.status_box = tk.Label(self.root, textvariable=self.status_msg, font=("Outfit", 10, "italic"), fg="#94a3b8", bg="#1c1f26", height=2, relief="solid", bd=1)
        self.status_box.pack(fill="x", padx=30, pady=5)
        
        # Local Sync Address note
        api_note = tk.Label(self.root, text="API running on http://localhost:42069/profile", font=("Outfit", 8), fg="#4b5563", bg="#101216")
        api_note.pack(pady=2)
        
        # Quick Tip
        tip_note = tk.Label(self.root, text="💡 Tip: Type /sync in-game in the chat window to sync instantly!", font=("Outfit", 8, "italic"), fg="#d5b875", bg="#101216")
        tip_note.pack(pady=4)

    def browse_folder(self):
        selected = filedialog.askdirectory(initialdir=self.eso_path.get())
        if selected:
            self.eso_path.set(selected)
            self.save_config()
            if self.sync_active:
                self.stop_sync()
                self.start_sync()

    def install_addon(self):
        dest = os.path.join(self.eso_path.get(), "Addons", ADDON_FOLDER_NAME)
        if not os.path.exists(self.eso_path.get()):
            messagebox.showerror("Error", "The specified ESO Live path does not exist. Please browse to the correct folder first.")
            return
            
        try:
            if not os.path.exists(dest):
                os.makedirs(dest)
                
            shutil.copy2(os.path.join(self.addon_src, "EsoCompanion.txt"), os.path.join(dest, "EsoCompanion.txt"))
            shutil.copy2(os.path.join(self.addon_src, "EsoCompanion.lua"), os.path.join(dest, "EsoCompanion.lua"))
            
            messagebox.showinfo("Success", f"EsoCompanion Addon successfully installed to:\n{dest}\n\nMake sure to enable it in the game's Addons menu!")
            self.status_msg.set("Status: Addon installed successfully.")
        except Exception as e:
            messagebox.showerror("Error", f"Failed to copy files:\n{str(e)}")

    def manual_sync(self):
        saved_vars = os.path.join(self.eso_path.get(), "SavedVariables", "EsoCompanion.lua")
        if not os.path.exists(saved_vars):
            messagebox.showwarning("Warning", "EsoCompanion.lua SavedVariables not found. Go in-game and reload UI first!")
            return
        
        try:
            data = self.get_merged_data(saved_vars)
            if data:
                output_path = os.path.join(os.path.dirname(__file__), '../public/live_profile.json')
                if not os.path.exists(os.path.dirname(output_path)) and os.path.dirname(output_path) != "":
                    output_path = "live_profile.json"
                with open(output_path, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2)
                self.status_msg.set(f"Refreshed Sync: {data.get('characterName', 'Unknown')} (CP {data.get('cp', 160)})")
        except Exception as e:
            messagebox.showerror("Error", f"Sync failed:\n{str(e)}")

    def get_merged_data(self, saved_vars_path):
        data = parse_lua_file(saved_vars_path)
        if not data:
            return None
            
        # Auto-check Mount Upgrade task if cooldown is active in-game
        if data.get("mountCooldownSeconds", 0) > 0:
            self.task_vars["mount"].set(True)
            
        # Merge currently checked tasks in GUI
        data["checkedTasks"] = {task_id: var.get() for task_id, var in self.task_vars.items()}
        return data

    def save_current_state(self):
        output_path = os.path.join(os.path.dirname(__file__), '../public/live_profile.json')
        if not os.path.exists(output_path):
            output_path = "live_profile.json"
            
        # Read existing file to preserve character gear/stats
        merged = {}
        if os.path.exists(output_path):
            try:
                with open(output_path, 'r', encoding='utf-8') as f:
                    merged = json.load(f)
            except:
                pass
                
        merged["checkedTasks"] = {task_id: var.get() for task_id, var in self.task_vars.items()}
        
        try:
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(merged, f, indent=2)
        except Exception as e:
            print("Failed to save state:", e)

    def start_server(self):
        def run_server():
            server_address = ('', 42069)
            self.httpd = HTTPServer(server_address, CORSRequestHandler)
            self.httpd.serve_forever()

        self.server_thread = threading.Thread(target=run_server, daemon=True)
        self.server_thread.start()

    def start_sync(self):
        if self.sync_active:
            return
            
        self.sync_active = True
        saved_vars = os.path.join(self.eso_path.get(), "SavedVariables", "EsoCompanion.lua")
        output_path = os.path.join(os.path.dirname(__file__), '../public/live_profile.json')
        if not os.path.exists(os.path.dirname(output_path)) and os.path.dirname(output_path) != "":
            output_path = "live_profile.json"

        def watcher():
            last_mtime = 0
            while self.sync_active:
                if os.path.exists(saved_vars):
                    try:
                        mtime = os.path.getmtime(saved_vars)
                        if mtime != last_mtime:
                            last_mtime = mtime
                            data = self.get_merged_data(saved_vars)
                            if data:
                                with open(output_path, 'w', encoding='utf-8') as f:
                                    json.dump(data, f, indent=2)
                                self.status_msg.set(f"Synced Profile: {data.get('characterName', 'Unknown')} (CP {data.get('cp', 160)})")
                    except Exception as e:
                        print("Sync error:", e)
                time.sleep(1)

        self.watcher_thread = threading.Thread(target=watcher, daemon=True)
        self.watcher_thread.start()

    def stop_sync(self):
        self.sync_active = False

def parse_lua_file(file_path):
    if not os.path.exists(file_path):
        return None
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    except:
        return None
        
    data = {}
    
    def get_val(key):
        match = re.search(r'\["' + key + r'"\]\s*=\s*(?:"([^"]+)"|([^,\n\}]+))', content)
        if match:
            return match.group(1) or match.group(2).strip()
        return None

    data["characterName"] = get_val("characterName")
    data["class"] = get_val("class")
    
    cp_val = get_val("cp")
    data["cp"] = int(cp_val) if cp_val else 160
    
    data["activeMundus"] = get_val("activeMundus") or "none"
    
    mount_val = get_val("mountCooldownSeconds")
    data["mountCooldownSeconds"] = float(mount_val) if mount_val else 0

    # Parse equipment
    data["equipment"] = {}
    slots = ["head", "shoulder", "chest", "hands", "waist", "legs", "feet", "neck", "ring1", "ring2", "mainHand", "offHand", "backBar"]
    for slot in slots:
        slot_match = re.search(r'\["' + slot + r'"\]\s*=\s*\{([^\}]+)\}', content)
        if slot_match:
            slot_content = slot_match.group(1)
            set_match = re.search(r'\["setName"\]\s*=\s*"([^"]+)"', slot_content)
            trait_match = re.search(r'\["trait"\]\s*=\s*"([^"]+)"', slot_content)
            data["equipment"][slot] = {
                "setName": set_match.group(1) if set_match else "None",
                "trait": trait_match.group(1) if trait_match else "None"
            }
            
    return data

if __name__ == "__main__":
    root = tk.Tk()
    app = CompanionApp(root)
    root.mainloop()
