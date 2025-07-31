import { useState } from "react";
import { id } from './ContextApi.jsx';
import UserList from "../UserList";
import UserAdd from "../UserAdd";
function ProviderContext({children}){
    const [userId , setUserId] = useState(6);
    return(
        <id.Provider value={{userId,setUserId}}> 
            
            {children}
        </id.Provider>
    )
}
export default ProviderContext;