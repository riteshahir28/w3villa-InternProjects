import { useState , useEffect, useContext } from "react";
import { id } from "./Context/ContextApi";
function UserList() {
    let idnumber=0;
    const [userData, setData] = useState([]);
    const useIdCoontext = useContext(id);
    
    const jsonserver = async () => {
        const url = "http://localhost:3000/users";
        let response = await fetch(url);
        console.log("before json : ", response);
        response = await response.json();
        setData(response);
        

        response.map((data)=>{
         
           idnumber = data.id;
        })
        
         useIdCoontext.setUserId(idnumber)
    }
 
    useEffect(() => {
        jsonserver();
    }, []);

  
   
    return (
        <div class="container-fluid d-flex justify-content-center align-items-center p-4 flex-column">
            <h2>json data</h2>
            <div className="col-md-6">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            userData.map((data) => (
                                <tr key={data.id}>
                                    <th scope="row">{data.id}</th>
                                    
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>

    )
}
export default UserList;