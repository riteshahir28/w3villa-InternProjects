import { useState ,useEffect } from "react";

function DeleteData() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        try {
            const res = await fetch("http://localhost:3001/todos");
            const data = await res.json();
            setTodos(data);


        } catch (err) {
            console.error("Error fetching todos:", err);
        }
    };

   async function DeleteRow(id){
    const url = "http://localhost:3001/todos";
         const response = await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert("Data deleted");
            fetchTodos();
        } else {
            alert("Something went wrong");
        }
    }

    useEffect(() => {
        fetchTodos();

    }, []);

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center p-4 flex-column">
            <h2>TO-DO DATA</h2>
            <div className="col-md-6">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TITLE</th>
                            <th scope="col">NAME</th>
                            <th scope="col">DELETE ROW</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((data, s) => (
                                <tr key={s}>
                                    <th scope="row">{data.id}</th>
                                    <td>{data.title}</td>
                                    <td>{data.name}</td>
                                    <td><button onClick={()=>DeleteRow(data.id)}>DELETE</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>

    )
}
export default DeleteData;