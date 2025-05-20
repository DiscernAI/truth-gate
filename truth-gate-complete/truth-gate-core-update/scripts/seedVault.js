const fs = require('fs');
const path = require('path');
const vaultPath = path.join(__dirname, '../config/vault.json');
const defaultVault = {
  core_truths: ["Truth must never be used to manipulate."],
  violation_keywords: ["manipulate"],
  collapse_triggers: ["core truth override attempt"]
};
fs.writeFileSync(vaultPath, JSON.stringify(defaultVault, null, 2));
console.log("Vault seeded.");