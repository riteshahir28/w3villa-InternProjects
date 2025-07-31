import { useEffect, useRef, useState } from "react";

function UpdateAll() {
  const [users, setUsers] = useState([]);
  const [userid, setUserId] = useState(null);

  const inName = useRef(null);
  const inEmail = useRef(null);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user) => {
    setUserId(user.id);
    inName.current.value = user.name;
    inEmail.current.value = user.email;
  };

  const updateAll = async () => {
    const updatedUser = {
      name: inName.current.value,
      email: inEmail.current.value,
    };

    const response = await fetch(`http://localhost:3000/users/${userid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    if (response.ok) {
      alert("User Updated!");
      fetchUsers(); // refresh table
    } else {
      alert("Update failed!");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center p-4 flex-column">
      <h2>User List</h2>
      <div className="col-md-8">
        <table className="table table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#updateModal"
                    onClick={() => openModal(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update User</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                ref={inName}
                className="form-control mb-2"
                placeholder="Enter Name"
              />
              <input
                type="email"
                ref={inEmail}
                className="form-control"
                placeholder="Enter Email"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={updateAll}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateAll;
