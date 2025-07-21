// before arrow function 
// first--->
function showName(){
    console.log("showName() is called ");
}

showName();

// second--->

function showName(name){
    console.log("name = ",name);
}

showName("ritesh kumar");


// After arrow function 
// first-->
const showName = ()=>{
    console.log("showName() is called");
} 

showName();

// second--->
const showName = name =>{
    console.log("name = ",name);
}

showName("ritesh yadav");