let array = new Array(1,2,3,4,5,6,7,8,9,10);
console.log("original array : ",array);

let evenArray = array.filter(elem => elem % 2 == 0);
console.log("even elements of array : ",evenArray);