function Footer(name) {
  return (
    <footer className="bg-dark text-white text-center py-3 fixed-bottom">
      <div className="container">
        <span>Name : {name}  | Your Website | All rights reserved</span>
      </div>
    </footer>
  );
}

export default Footer;
