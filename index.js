const fs = require("fs");

const path = "./a.txt";

const fileCleanUpPromise = fileCleanUp(path);

fileCleanUpPromise
.then(function(message){
    console.log(message)
})


function readFile(file) {
  const pr = new Promise((resolve, reject) => {
    if (!file) {
      reject("File not found");
    } else {
      fs.readFile(file, "utf-8", function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }
  });

  return pr;
}

function removeSpace(fileTxt) {
  const pr = new Promise((resolve, reject) => {
    if (!fileTxt) {
      reject("File has no text");
    } else {
      resolve(fileTxt.replace(/\s+/g, " ").trim());
    }
  });
  return pr;
}

function writeBack(file, data) {
  const pr = new Promise((resolve, reject) => {
    fs.writeFile(file, data, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Successfully Cleaned Up the File.");
      }
    });
  });
  return pr;
}

function fileCleanUp(file) {
  const pr = new Promise((resolve, reject) => {
    if (!file) {
      reject("No file found");
    } else {
      const fileDataPromise = readFile(path);

      fileDataPromise
        .then(function (data) {
          return data;
        })
        .then(function (data) {
          return removeSpace(data);
        })
        .then(function (dataWithoutSpace) {
          return dataWithoutSpace;
        })
        .then(function (dataWithoutSpace) {
          return writeBack(file, dataWithoutSpace);
        })
        .then(function (message) {
          resolve(message);
        })
        .catch(function (err) {
          console.log(err);
          reject(err);
        });
    }
  });

  return pr;
}
