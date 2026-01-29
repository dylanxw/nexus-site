// Script to export data from SQLite database to JSON
// Run with: node scripts/export-sqlite-data.js

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'prisma', 'dev.db');

if (!fs.existsSync(dbPath)) {
  console.error('Error: SQLite database not found at:', dbPath);
  process.exit(1);
}

const db = new Database(dbPath, { readonly: true });

console.log('Exporting data from SQLite...\n');

const data = {};

// Get all tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma%'").all();

for (const { name } of tables) {
  try {
    const records = db.prepare(`SELECT * FROM "${name}"`).all();
    data[name] = records;
    console.log(`  ${name}: ${records.length} records`);
  } catch (e) {
    console.log(`  ${name}: error - ${e.message}`);
  }
}

// Write to JSON file
const outputPath = path.join(__dirname, 'exported-data.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

console.log(`\nData exported to: ${outputPath}`);
console.log(`\nFile size: ${(fs.statSync(outputPath).size / 1024).toFixed(2)} KB`);

db.close();
