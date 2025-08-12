import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function SetData() {
    const navigate=useNavigate()
 

    const titleRef = useRef();
    const nameRef = useRef();


    const pData = async (e) => {
        e.preventDefault();
        const data = {
            "title": titleRef.current.value,
            "name": nameRef.current.value
        }

        let bd = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try {
            let res = await fetch("http://localhost:3001/todos", bd);
            let json = await res.json();
            console.log("Response from server:", json);

            alert("add successful");
            navigate("/");
        } catch (err) {
            alert(err);
            console.error("Fetch error:", err);
        }
    };




    return (
        <>
            <div className="container-fluid p-4 d-flex justify-content-center align-items-center flex-column ">
                <h2 className="mb-4 p-2">ADD DATA </h2>
                <div className="col-md-5 justify-content-center border p-4 rounded-2">
                    <form onSubmit={pData}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Title</label>
                            <input ref={titleRef} type="text" class="form-control" id="title" placeholder="fill the title" />
                            <div id="emailHelp" class="form-text">title</div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Name</label>
                            <input ref={nameRef} type="text" class="form-control" id="name" placeholder="enter your name" />
                        </div>
                        <button type="submit" class="btn btn-primary w-100" >Submit</button>
                    </form>
                </div>
            </div>

        </>
    )
}
export default SetData;