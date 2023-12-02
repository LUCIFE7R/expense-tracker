import React from 'react'
import Navbar from '../../component/Navbar/Navbar'
import "./Home.css"
function Home() {
  return (
    <div className='home-page-container'>
        <div><Navbar/></div>
        <div>
            <div className='home-heading'><span className='head'>💸 Expence Tracker System 💸</span></div>
                 <img className='home-img' src='https://repository-images.githubusercontent.com/410385203/215ee742-7e0a-4902-a9ca-8d2f42b126fd'/>
        </div>
    </div>
  )
}

export default Home
