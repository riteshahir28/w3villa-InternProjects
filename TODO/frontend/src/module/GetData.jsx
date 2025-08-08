import { useState, useEffect } from "react";
function GetData() {

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
 
    useEffect(() => {
        fetchTodos();
        
    }, []);


    return (
        <div class="container-fluid d-flex justify-content-center align-items-center p-4 flex-column">
            <h2>TO-DO DATA</h2>
            <div className="col-md-6">
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">TITLE</th>
                            <th scope="col">NAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            todos.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td> {data.title}</td>
                                <td> {data.name}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default GetData;