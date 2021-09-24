"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

//My Solution
function arrayManipulation(n, queries) {
  const arr = [];
  for (const [start, end, value] of queries) {
    arr[start] = (arr[start] || 0) + value;
    arr[end + 1] = (arr[end + 1] || 0) - value;
  }

  let last = 0;
  let max = 0;
  for (let i = 0; i < n + 1; i++) {
    const current = arr[i] || 0;
    last = last + current;
    if (last > max) {
      max = last;
    }
  }

  return max;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const n = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  let queries = Array(m);

  for (let i = 0; i < m; i++) {
    queries[i] = readLine()
      .replace(/\s+$/g, "")
      .split(" ")
      .map((queriesTemp) => parseInt(queriesTemp, 10));
  }

  const result = arrayManipulation(n, queries);

  ws.write(result + "\n");

  ws.end();
}
