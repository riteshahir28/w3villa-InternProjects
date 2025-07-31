import { useState } from "react";

function Login() {
    let char=0,num=0,spec=0;
    const [color,setColor] = useState("success");
    const [btn,setbtn] = useState(true);

    const handlePass = (event)=>{
         let val = event.target.value;
         for(var i = 0 ; i<val.length ;i++){
            let ch = val.charAt(i);
            if(ch>='0' && ch<='9')
                num++;
            else if(ch>='a' && ch<='z' || ch>='A' && ch<='Z')
                char++;
            else if(ch=='$' || ch=='#' || ch=='@' || ch=='%' || ch=='&')
                spec++;
         }
         if(char>=2 && num>=2 && spec>=2 && val.length==16){
            setColor("green");
            setbtn(false);
            }
        else{
            setColor("red");
            setbtn(true);
        }
    }
    return (
        <>
            <div className="container-fluid p-4 justify-content-center align-items-center  d-flex flex-column">
                <h2 className="header">Login Form</h2>
                <div className="col-md-5 d-flex align-items-center justify-content-center border p-4 rounded-1">
                    <form>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <label for="inputPassword5" class="form-label">Password</label>
                        <input type="password" onChange={handlePass } id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
                       <div id="passwordHelpBlock" className="form-text" style={{ color: color }}>
                            Password must have 16 at least 2 letters, 2 numbers, and 2 special characters ($, #, @, %, &).
                        </div>

                        <button type="submit" disabled={btn} class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login;