function Btn({counting,setCounting}){
     const inc = ()=>{
        setCounting(++counting);
     }
    return(
        <>
            <div>
                <button onClick={inc}>Increase</button>
            </div>
        </>
    )
}
export default Btn;