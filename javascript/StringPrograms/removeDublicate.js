var str = "akash kumar";
console.log(str);
var upstr="";
 for(i = 0 ;i<str.length ; i++){
     if(!upstr.includes(str[i])){
         upstr += str[i];
     }
 }
 console.log(upstr);
 
 