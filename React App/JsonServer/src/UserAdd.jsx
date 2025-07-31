import { useContext, useRef } from "react";
import { id } from "./Context/ContextApi";
function UserAdd() {
  const InName = useRef(null);
  const InEmail = useRef(null);

   const usecontextID=useContext(id);
   let nextUserID = usecontextID.userId;
    console.log("user id next : ",nextUserID+1);
    
  const adduser = async (e) => {
    e.preventDefault(); 
  

    const name = InName.current.value;
    const email = InEmail.current.value;

    const url = "http://localhost:3000/users";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },  
      body: JSON.stringify({ id:nextUserID+1 , name, email })
    });

    const data = await response.json();

    if (data) {
      alert("New user added!");
      console.log(data);
    }
  };

  return (
    <div className="container-fluid p-4 d-flex justify-content-center align-items-center flex-column">
      <h2>Add New User</h2>
      <div className="col-md-4 d-flex border justify-content-center align-items-center p-4">
        <form onSubmit={adduser}>
          <div className="form-group mb-3">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              ref={InName}
              id="name"
              className="form-control"
              placeholder="Enter Your Name"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              ref={InEmail}
              id="email"
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <button type="submit" className="btn btn-primary w-100 p-2">
            ADD
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserAdd;
