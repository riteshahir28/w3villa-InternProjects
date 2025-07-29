import Footer from "../components/Footer";
function Home(username , setUserName){
    return(
       <>
        <div className="container-fluid p-2 d-flex flex-column justify-content-center align-items-center">
            <p class="h3 p-3">This page is created by using..</p>
            
            <div className="row col-md-10 justify-content-center align-items-center ">
                <div className="col-md-3">
                    <div class="card bg-dark text-white">
                            <div class="card-body">
                                <h5 class="card-title text-success">React JS</h5>
                                <h6 class="card-subtitle mb-2 text-warning">Contaxt API</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                 
                            </div>
                        </div>
                </div>
                <div className="col-md-3">
                    <div class="card bg-dark text-white">
                            <div class="card-body">
                                <h5 class="card-title text-success">React JS</h5>
                                <h6 class="card-subtitle mb-2  text-warning">Routing</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                 
                            </div>
                        </div>
                </div>
                <div className="col-md-3">
                    <div class="card bg-dark text-white">
                            <div class="card-body">
                                <h5 class="card-title text-success">React JS</h5>
                                <h6 class="card-subtitle mb-2 text-warning">useState</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                 
                            </div>
                        </div>
                </div>
            </div>
            <div className="row col-md-10 justify-content-center">
                <div className="col-md-5 p-3">
                    <div class="card bg-dark text-white">
                            <div class="card-body">
                                <h5 class="card-title text-success">React JS</h5>
                                <h6 class="card-subtitle mb-2 text-warning">useState</h6>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                 
                            </div>
                        </div>
                </div>
                <div className="col-md-5 p-4 ">
                    <div class="card bg-dark text-white">
                            <div class="card-body">
                                <h5 class="card-title text-success">React JS</h5>
                                <h6 class="card-subtitle mb-2 text-warning">Props</h6>
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
export default Home;