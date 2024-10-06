
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/HeaderNavStyle.scss';
import { Link, Route } from "wouter";
import { useLocation } from "wouter";




const DrawHeaderNav = () => {
    const [location, setLocation] = useLocation();

    return (




  <nav className="Body-Position">
  <div className="logo">

<a > Jub Portfolio </a >   


  </div>
  <ul className="nav-links">
      <li><a onClick={() => setLocation("profile", true)}>Profil</a></li>
      <li><a onClick={() => setLocation("home", true)}>Projets</a></li>


   {/*  <li><a href="#">Solutions</a></li>
      <li><a href="#">Products</a></li>*/}
</ul>


</nav>

    )


}



const DrawFooterNav = () => {

    return (

       

<footer className="Body-Position">

<p> Thanks credit </p>   


</footer>


    );
}



export {DrawHeaderNav, DrawFooterNav}






