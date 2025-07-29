import { useState , useRef} from "react";
import Footer from "../components/Footer";
function Newuser({username ,useremail, setUserName}) {

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    
    const changeUser = (event)=>{
        event.preventDefault();
        console.log("user name : ",username);
        console.log("user email :" ,useremail);
        setUserName([nameRef.current.value,emailRef.current.value,setUserName]);
    }

    return (
        <>
        <div class="container-fluid d-flex justify-content-center p-4" >
            <div class="card col-md-5 pb-4  ">
                <div class="card-body">
                    <h2 class="card-title text-center">New User Submition</h2>
                    <form action="#"  onSubmit={changeUser} >
                        <div class="form-group p-4 ">
                            <label for="exampleInputEmail1">User Name</label>
                            <input type="text" class="form-control" id="userName" ref={nameRef}  placeholder="Enter user name" />
                                 
                        </div>
                        <div class="form-group p-4">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" ref={emailRef} aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div class="form-group p-4">
                           <button type="submit" class="btn btn-primary w-100">Submit</button>                        
                        </div>
                    </form>
                </div>
            </div>

        </div>
        <Footer></Footer>
        </>
    )
}

export default Newuser;