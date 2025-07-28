function fruit(name){
        alert("globle function",name);
    }
function Event(){
    // function fruit(name){
    //     alert("inner function",name);
    // }

    return(
        <button onClick={()=>fruit("mango")}>Click me</button>
    )
}

export default Event;