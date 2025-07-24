let studentList = {
    name : "ritesh kumar",
    age : 21 
};

let college = {
    name : "IICS",
    students : 200
};

function getName(){
    return this.name;
}


let Sname = getName.call(studentList);
let Cname = getName.call(college);
console.log("student name : ",Sname);
console.log("college name : ",Cname);