import React from 'react'

export default function Navbar (){
  return (
    <nav className='flex justify-around bg-slate-700 text-white py-2'>
      <div className="logo">
                <span className='font-bold text-xl mx-9'> I task </span> 
            </div>  
        <ul className="flex gap-8 mx-9">
            
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-75'>Your Task </li>
        </ul>
    </nav>
  )
}
