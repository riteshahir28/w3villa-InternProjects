import { useState, useEffect } from "react";
function DeleteUser() {
    const url = "http://localhost:3000/users";
    const [userData, setData] = useState([]);
    const jsonserver = async () => {

        let response = await fetch(url);
        console.log("before json : ", response);
        response = await response.json();
        setData(response);
    }

    useEffect(() => {
        jsonserver();
    }, []);

    const deleteuser = async (id) => {
        
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Data deleted");
            jsonserver();
        } else {
            alert("Something went wrong");
        }
    };

    const getEmail = (id) => {
        deleteuser(id);
    }


    let count = 1;
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center p-4 flex-column">
            <h2>json data</h2>
            <div className="col-md-6">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col">DELETE USER</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((data, s) => (
                                <tr key={s}>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td><button onClick={() => getEmail(data.id)}>DELETE</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>

    )
}
export default DeleteUser;