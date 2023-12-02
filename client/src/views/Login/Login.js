import React, {useState} from 'react'
import "./Login.css"
import Navbar from '../../component/Navbar/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios';
function Login() {
    
const [email , setEmail]= useState("");
const [password , setPassword]= useState("");

const userLogin = async ()=>{

    const responce = await axios.post('/api/login',
    {
        email:email,
        password : password
    })
    alert(responce?.data?.message);

    if (responce?.data?.success) {
      localStorage.setItem('expenseuser', JSON.stringify(responce.data.data))
      window.location.href = "/";
  }

}
    return (
        <div className='signup-container'>
            <div> <Navbar /></div>
            <div>
                <div className='home-heading-signup'><span className='head-signup'>💸 Expence Tracker System 💸</span></div>
                <div>
                    <form className='manage-height'>
                        <p className='text-center signup-heading'>Login</p>

                        <input className='input-signup' 
                        type='text'
                         placeholder='Enter Your Email'
                         onChange={(e)=>{
                            setEmail(e.target.value)
                         }} 
                         />

                        <input className='input-signup'
                         type='password'
                          placeholder='Create Password' 
                          onChange={(e)=>{
                            setPassword(e.target.value)
                          }}
                          />

                        <button type='button' className='signup-btn' onClick={userLogin}>Login</button>
                        <p className='text-center'>Create an account ? <Link to="/signup">Signup</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login