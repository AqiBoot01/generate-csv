import fs from "node:fs";
import { resolve } from "node:path";

const header = "name,email,age\n";

const fileStream = fs.createWriteStream("dummy.csv", { highWaterMark: 4096 });
const writeLine = (line) => {
  return new Promise((resolve, reject) => {
    if (!fileStream.write(line)) {
      fileStream.once("drain", resolve);
    } else {
      process.nextTick(resolve);
    }
  });
};

const writeLines = (lines) => {
  return new Promise((resolve) => {
    if (!fileStream.write(lines)) {
      fileStream.once("drain", resolve);
    } else {
      process.nextTick(resolve);
    }
  });
};

await writeLine(header);
const linesToGenerate = 10_000_000;

let linesToWrite = [];
const maxLinesPerWrite = 100;

for (let i = 0; i < linesToGenerate; i++) {
  // await writeLine("ali,ali@gmail.xom,77\n");
  linesToWrite.push("ali,ali@gmail.xom,77\n");
  if (linesToWrite.length === maxLinesPerWrite) {
    await writeLines(linesToWrite.join(""));
    linesToWrite = [];
  }

  if (i % 1000 === 0) {
    console.log(`${i} rows written`);
  }
}
fileStream.close();
