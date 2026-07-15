const fs = require('fs');
const path = require('path');

let config = { esoUserPath: "" };
const configPath = path.join(__dirname, '../config.json');

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {
  const defaultPath = process.platform === 'win32'
    ? path.join(process.env.USERPROFILE, 'Documents/Elder Scrolls Online/live')
    : path.join(require('os').homedir(), 'Documents/Elder Scrolls Online/live');
  config = { esoUserPath: defaultPath };
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
}

if (!config.esoUserPath) {
  console.error("Please configure 'esoUserPath' in config.json");
  process.exit(1);
}

const savedVarsPath = path.join(config.esoUserPath, 'SavedVariables/EsoCompanion.lua');
const outputPath = path.join(__dirname, '../public/live_profile.json');

function parseLua(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath, 'utf8');
  
  const data = {};
  
  const getValue = (key) => {
    const regex = new RegExp(`\\["${key}"\\]\\s*=\\s*(?:"([^"]+)"|([^,\\n\\}]+))`);
    const match = content.match(regex);
    if (!match) return null;
    return match[1] || match[2].trim();
  };

  data.characterName = getValue("characterName");
  data.class = getValue("class");
  data.cp = parseInt(getValue("cp")) || 160;
  data.activeMundus = getValue("activeMundus") || "none";
  data.mountCooldownSeconds = parseFloat(getValue("mountCooldownSeconds")) || 0;

  // Extract equipment
  data.equipment = {};
  const slots = ["head", "shoulder", "chest", "hands", "waist", "legs", "feet", "neck", "ring1", "ring2", "mainHand", "offHand", "backBar"];
  
  slots.forEach(slot => {
    const slotRegex = new RegExp(`\\["${slot}"\\]\\s*=\\s*\\{([^\\}]+)\\}`);
    const slotMatch = content.match(slotRegex);
    if (slotMatch) {
      const setRegex = /\["setName"\]\s*=\s*"([^"]+)"/;
      const traitRegex = /\["trait"\]\s*=\s*"([^"]+)"/;
      const setMatch = slotMatch[1].match(setRegex);
      const traitMatch = slotMatch[1].match(traitRegex);
      data.equipment[slot] = {
        setName: setMatch ? setMatch[1] : "None",
        trait: traitMatch ? traitMatch[1] : "None"
      };
    }
  });

  return data;
}

function watch() {
  console.log(`Watching for changes in: ${path.dirname(savedVarsPath)}`);
  
  if (!fs.existsSync(savedVarsPath)) {
    console.log("EsoCompanion.lua SavedVariables not found yet. Go in-game and reload UI or logout once to generate it.");
  } else {
    // Initial run
    try {
      const parsed = parseLua(savedVarsPath);
      if (parsed) {
        fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2), 'utf8');
        console.log(`Initial profile sync completed to: ${outputPath}`);
      }
    } catch (err) {
      console.error("Initial parse failed:", err);
    }
  }
  
  let fsWait = false;
  fs.watch(path.dirname(savedVarsPath), (eventType, filename) => {
    if (filename === 'EsoCompanion.lua') {
      if (fsWait) return;
      fsWait = setTimeout(() => { fsWait = false; }, 200);
      
      console.log("SavedVariables updated! Parsing...");
      try {
        const parsed = parseLua(savedVarsPath);
        if (parsed) {
          fs.writeFileSync(outputPath, JSON.stringify(parsed, null, 2), 'utf8');
          console.log(`Profile updated: ${outputPath}`);
        }
      } catch (e) {
        console.error("Error parsing Lua SavedVariables:", e);
      }
    }
  });
}

watch();
