// You have a list of users with their age.
// Return an array of names of users who are above 18 and sort them alphabetically.

let userList = [
   { name : "ritesh",  age : 19},
   { name : "akash" , age :20},
   { name : "rishi" , age : 30},
   { name : "arvind", age : 17},
   { name : "pratik",  age : 15},
];
let filArr = userList.filter(user => user.age > 18);
let userNames = new Array();
filArr.forEach(user => userNames.unshift(user.name));
userNames.sort();
console.log(userNames);