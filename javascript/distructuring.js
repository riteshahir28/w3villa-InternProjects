// // before dstructuring 

//  var arr = ["ritesh" , "kumar","yadav"];

//  var fname = arr[0];
//  var mname = arr[1];
//  var lname = arr[2];

//  console.log("first name = ",fname ,"\n","middle name = ",mname ,"\n ", "last name = ",lname);

// // After distructuring
// // Array distructuring

// var arr = ["ritesh" , "kumar " , "yadav"];

// var [fname , mname , lname ] = arr;

// console.log("first name = ",fname,"\n","middle name = ",mname,"\n","last name = ",lname);

// var arr = ['apple' ,'grapes' ,'banana','mango'];

// var ret = arr.splice(2,3,"orange","apple");
// console.log(ret);
// console.log(arr);

// var sl = arr.slice(-4);
// console.log(sl);

var arr = [1,2,3,4];
delete arr[2];
arr.forEach(element => {
    console.log(element);
});
console.log(arr);