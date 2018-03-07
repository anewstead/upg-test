/*
to run this script
- have you installed node - https://nodejs.org/en/
- open terminal CD to folder conatining this script and numbers.txt
- type node numbers.js
*/

//import node file system
var numbersFile = 'numbers.txt';
var fs = require('fs');

//generic function to read a utf8 txt file
function read(file, callback) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
      console.log(err);
    }
    callback(data);
  });
}

//array.find test if an entry for a given number already exists
function existingNumber(obj) {
  return obj.num === this[0];
}

/*
parse array into object array/ dictionary,
each new number creates an object where num=the number and count=1,
duplicate numbers increments the count in the exsiting id
*/
function parseData(arr) {
  var dict = [];
  for (var i = 0; i < arr.length; i++) {
    var hasNum = dict.find(existingNumber, [arr[i]])
    if (hasNum) {
      hasNum.count++;
    } else {
      dict.push({
        'num': arr[i],
        'count': 1
      });
    }
  }
  return dict;
}

//find most common numbers
function mostCommon(objArr, howMany) {
  var sorted = objArr.sort(function (a, b) {
    return b.count - a.count;
  });
  return sorted.slice(0, howMany);
}

//run it, and log out top five values
var output = read(numbersFile, function(data) {
  var simpleData = data.split("\n");
  var complexData = parseData(simpleData);
  var largestItems = mostCommon(complexData, 5);

  //log json object of numbers and their count
  //console.log(largestItems);

  //log only the top five number as specified
  for (var i = 0; i < largestItems.length; i++) {
    console.log(largestItems[i].num);
  }
});
