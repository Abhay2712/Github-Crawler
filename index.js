const fs = require('fs');
let dataCSV = fs.readFileSync(`./data/${process.argv[3]}`, 'utf8').split('\n');    // read data from csv file
const getPackage = require('./fetchPackage');
const update = require('./post');


const name = [];
const url = [];

for (let i = 1; i < dataCSV.length - 1; i++) {
    let arr = dataCSV[i].split(',');
    name.push(arr[0]);
    url.push(arr[1]);   // stored name and url in two arrays
}


let partA = "https://raw.githubusercontent.com";
let partC = ("/main/package.json");

let arr=process.argv[4].split('@');
let dep = arr[0];
let version = arr[1];

let res;

console.log("\n\n            Name              |                          URL                      |              Version            |  Status  ");
for (let i in url) {
    let partB = url[i].slice(18).trim();
    let str = `${partA}${partB}${partC}`;

    let fetchPackage = getPackage.getJSON(str);
    fetchPackage.then(async function (data) {
        res = data;

        console.log(`\n${name[i].trim()}     -----      ${url[i].trim()}     -----      ${data.dependencies[dep]}     -----      ${data.dependencies[dep] >= version}\n`);
        // console.log();
        if (!(data.dependencies[dep] >= version)) {
            if (process.argv[5]==='-update') {
                update.run(version, dep, res, url[i],data.dependencies[dep]);
            }
        }
    });
}





