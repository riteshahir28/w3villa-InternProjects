let str = "madam"
let lind = str.length-1;
 
let ans = true;
for(i = 0;i<str.length/2 ;i++){
    if(str.charAt(i)!=str.charAt(lind--)){
        ans = false;
        break;
    }
}
if(ans){
    console.log("it is polindrom");
}
else
    console.log("it is not polindrome");