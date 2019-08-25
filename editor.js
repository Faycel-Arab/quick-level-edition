const fs = require("fs");
const path = require("path");

// relative levels folder path
const folderPath = "./level";

// levels folders
const subFolders = [];

// moves to add for each star achievement
const s1 = 5;
const s2 = 7;
const s3 = 4;
const s4 = 3;

// populate the subFolders array
fs.readdirSync(folderPath).map(fileName => {
  subFolders.push(path.join(folderPath, fileName));
});

// edit level
const editLevel = lvl => {
  lvl.moves[0] += s1;
  lvl.moves[1] += s2;
  lvl.moves[2] += s3;
  lvl.moves[3] += s4;
  return lvl;
};

// save a lvl file
const saveLevel = lvl => {};

// keep track of errors
let err = 0;
let count = 0;
let corruptFiles = [];

// loop through each sub folder json file and edit it
subFolders.forEach(folderPath => {
  fs.readdirSync(folderPath).map(fileName => {
    count += 1; // level path
    const fp = path.join(folderPath, fileName);
    // read the level json
    let newLvl = fs.readFileSync(fp, "utf8");
    try {
      newLvl = JSON.parse(newLvl);
      newLvl = editLevel(newLvl);
      fs.writeFile(fp, JSON.stringify(newLvl), "utf-8", function() {});
    } catch (e) {
      err += 1;
      corruptFiles.push(fp);
    }
  });
});
if (corruptFiles.length > 0) console.info(corruptFiles);
console.log(err + " of " + count);
