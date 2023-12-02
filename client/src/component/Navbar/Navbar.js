
import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
function Navbar() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const localuser = JSON.parse(localStorage.getItem('expenseuser') || "{}");
    setUser(localuser);
  }, [])

  const logout = () => {
    localStorage.removeItem('expenseuser');
    window.location.href = '/login';
    alert('Logout Succesfully..!')
  }

  return (
    <div>
      <div className='top-container'>
        <img className='logo-img' src='https://vma4.com/wp-content/uploads/2017/06/vma4-software-icon.jpeg' />
        <p className='title'>Expence Tracker</p>
      </div>
      <div className='nav-container'>
        <Link className='nav-item' to="/" >🏠 Home</Link>



        {
          user?.name ? <Link className='nav-item' to="/dashboard" >🎨 Dashboard</Link>
            :
            <>                 <Link className='nav-item' to="/signup" >➡️ Signup</Link>
              <Link className='nav-item' to="/login" >🔐 Login</Link></>
        }
        <p className='nav-item'>🙅‍♂️ {user?.name || "Hello User Signup fast"}</p>
        {
          user?.name ? <p className="logout" onClick={logout}>📤 Logout</p> : null
        }
        <p className='help-item'>🛍️ Help</p>
        <p className='help-item-con'>📞 +91 7057461164</p>
        <p className='help-item-con'>📩 expence@tracker.com</p>
      </div>
    </div>
  )
}

export default Navbar