import React from 'react';
import './Navbar.css';
import { CiSearch } from "react-icons/ci";
const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="logo">ArabDev</div>
      <div className='search'>
        <span className='search-icon'><CiSearch/></span>
        <input type="text" className="search-bar" placeholder="Search..." />
      </div>

      {/* <label class="toggle" arial-label="Toggle dark mode">
  <input type="checkbox" onChange={(e)=>{
     const root=document.documentElement;
      const mode=document.documentElement.dataset.mode = e.currentTarget.checked ? "dark" : "light";
      if(mode){
        root.style.setProperty("--primary-color", "black");
        root.style.setProperty("--secondary-color", "white");
      }
      else{
        root.style.setProperty("--secondary-color", "black");
        root.style.setProperty("--primary-color", "white");
      }
  }}/>
  <span>☀️</span>
  <span>🌙</span>
</label> */}

      <div className="auth-buttons">
        <button className="login-btn">Log in</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
