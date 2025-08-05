const fs = require('fs');

const readerFile = fs.readFileSync('student.txt','utf-8');
 

let ln = readerFile.split('\n');

 fs.writeFileSync('college.txt','adsf');
 
ln.forEach((rt)=>{
    fs.appendFileSync('college.txt',rt+"\n");
});

const wrfile = fs.readFileSync('college.txt','utf-8');
 console.log(wrfile);
