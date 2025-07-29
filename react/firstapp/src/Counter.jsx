import { useContext } from "react"
import { count } from "./Context";

function Counter({counting}){
    // const c = useContext(count);
    console.log("value  = : ");
    return(
        <>
            <div>
                <h3>Count value :{counting} </h3>
            </div>
        </>
    )
}
export default Counter;