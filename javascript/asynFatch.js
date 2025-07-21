async function getData() {
    try{
        const result  = await fetch("https://dummyjson.com/products");
        const data = await result.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }

}
getData();