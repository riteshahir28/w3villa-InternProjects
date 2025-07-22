// before dstructuring 

 var arr = ["ritesh" , "kumar","yadav"];

 var fname = arr[0];
 var mname = arr[1];
 var lname = arr[2];

 console.log("first name = ",fname ,"\n","middle name = ",mname ,"\n ", "last name = ",lname);

// After distructuring
// Array distructuring

var arr = ["ritesh" , "kumar " , "yadav"];

var [fname , mname , lname ] = arr;

console.log("first name = ",fname,"\n","middle name = ",mname,"\n","last name = ",lname);

