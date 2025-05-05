import React from 'react'
import Navbar from "../components/navbar";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "700"], // Add "300" for lighter font weight
  subsets: ["latin"],
});

function page() {
  return (
    <div className={ubuntu.className}>
      <Navbar/>
      
      <div className='flex-col' style={{'margin':'2rem'}}>
        <h1 className='text-2xl text-blue-600 mx-1.5'> Welcome to XQFood </h1>
        <p>We are the platform of food delivery we collect orders from the customer and share it with the resturant.
           Our goal is to fullfill your cravings in no time.  
          </p>


        <img src='images/about-team.jpg' style={{'height': '30rem', 'marginTop': '3rem'}}/> 
      </div>


      </div>
  )
}

export default page