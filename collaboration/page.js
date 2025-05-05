import React from 'react'

import Navbar from "../components/navbar";

function page() {
  return (
    <div>
    <Navbar/>


    <div className="relative top-4 left-4 flex gap-32">
      <img src="/images/resturant.jpg" alt="Restaurant" className="w-xl relative left-7 top-10" />
      <div className='description flex-col'>
      <h3 className='relative top-12 text-center font-semibold text-2xl '>We have been collaborating with the resturants nearby locations</h3>
      <p className='relative top-14'>We can provide all kinds of cuisine to your doorstep with the single click</p>
      </div>
    </div>


    <div className='relative top-18'>
     
    </div>



      </div>
  )
}

export default page