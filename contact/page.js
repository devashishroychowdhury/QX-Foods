import React from 'react'
import Navbar from "../components/navbar";

function page() {
  return (
    <div>
      <Navbar/>
        <div className='relative top-5'>
          <h1 className='text-center font-medium capitalize'>Need help with Orders ? <br/> You came the right place!</h1>
          <p className='text-center font-light text-2xl'>Post the message below & we will contact you in no time</p>
        </div>

        <div className='rounded-sm'>
          <img src='images/contact-us.png' className='w-xl'></img>
        </div>


      </div>
  )
}

export default page