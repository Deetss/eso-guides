const fs = require('fs');
const path = require('path');

let config = { esoUserPath: "" };
const configPath = path.join(__dirname, '../config.json');

try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} catch (e) {
  // Create default config
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

const addonDest = path.join(config.esoUserPath, 'Addons/EsoCompanion');
const addonSrc = path.join(__dirname, '../eso-addon');

try {
  if (!fs.existsSync(addonDest)) {
    fs.mkdirSync(addonDest, { recursive: true });
  }
  
  fs.copyFileSync(path.join(addonSrc, 'EsoCompanion.txt'), path.join(addonDest, 'EsoCompanion.txt'));
  fs.copyFileSync(path.join(addonSrc, 'EsoCompanion.lua'), path.join(addonDest, 'EsoCompanion.lua'));
  
  console.log(`Addon installed successfully to: ${addonDest}`);
} catch (err) {
  console.error("Failed to copy addon files:", err);
}
