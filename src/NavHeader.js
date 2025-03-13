
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/HeaderNavStyle.scss';
import { useNavigate } from "react-router-dom";


const DrawHeaderNav = () => {

  const navigate = useNavigate();

  function handleClick(path) {
    navigate(path);
  }



  return (

    
    <nav className="Body-Position">
      <div className="logo">
        <a href={() => false}> Jub Portfolio </a >
      </div>



      <ul className="nav-links">
        <li><a href={() => false} onClick={() => handleClick("/Jub_Biography/profile")}>Profil</a></li>
        <li><a href={() => false}  onClick={() => handleClick("/Jub_Biography/home")}>Projets Unity</a></li>
      </ul>

      <ul className="nav-logos">
        <li><a href="https://www.linkedin.com/in/julien-faidide-17397b174/">
            <img alt="linkedin link" src="/Jub_Biography/in-logo.png"/>
          </a></li>
      </ul>




      


    </nav>

  )


}



const DrawFooterNav = () => {

  return (



    <footer className="Body-Position">


      <p>Julien Faidide | 2025</p>

      


    </footer>


  );
}



export { DrawHeaderNav, DrawFooterNav }






