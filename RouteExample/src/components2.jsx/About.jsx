import { useState } from "react";
import Footer from "../components/Footer";
function About({ username, useremail, setUserName }) {
    console.log("about", username);

    return (
        <>
            <div class="container-fluid p-4  ">
                <div class="text-center">
                    <h1 class="display-4">{username}</h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, est.</p>
                </div>
                <div class=" row d-flex justify-content-center g-4 p-4align-items-center">
                    <div className="col-md-3  "> 
                        <div class="card bg-warning">
                            <div class="card-body">
                                <h5 class="card-title">React JS</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                 
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 ">
                        <div class="card bg-success">
                            <div class="card-body">
                                <h5 class="card-title">Java Fulstack</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                 
                            </div>
                        </div>

                    </div>
                    <div className="col-md-3 ">
                        <div class="card bg-danger">
                            <div class="card-body">
                                <h5 class="card-title">JavaScript</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}
export default About;