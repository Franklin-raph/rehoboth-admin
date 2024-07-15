import React, { useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { BsLightningCharge } from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const AuthNav = () => {

    const [openNav, setOpenNav] = useState(false)

  return (
    <nav className="border-b flex items-center justify-between py-5 relative bg-white md:px-[100px] px-[20px]">
        <div className="flex items-center gap-10">
            <Link  to='/' className='block'>
                <img src="./images/rehoboth-logo.svg" className='w-[70%] sm:w-full' alt="" />
            </Link>
            
            {
                openNav &&
                <div className="px-[20px] py-[20px] w-full flex flex-col fixed bg-white left-0 translate-x-0 h-[100vh] z-[12] top-0 items-center gap-10">
                    <div className='flex items-center justify-between w-full'>
                        <Link  to='/' className='block'>
                            <img src="./images/rehoboth-logo.svg" className='w-[70%]' alt="" />
                        </Link>
                        <IoClose className='text-[25px] cursor-pointer' onClick={() => setOpenNav(false)}/>
                    </div>
                    <ul className='w-full'>
                        <li className="text-[#667085] flex items-center gap-2 cursor-pointer w-full justify-between mb-9">
                            <p>Blog</p>
                            <FaChevronDown />
                        </li>
                        <li className="text-[#667085]">
                            <Link href='#'>Faq</Link>
                        </li>
                    </ul>
                </div>
            }
            <ul className="sm:flex items-center gap-10 hidden">
                <li className="text-[#667085] flex items-center gap-2 cursor-pointer">
                    <p>Blog</p>
                    <FaChevronDown />
                </li>
                <li className="text-[#667085]">
                    <Link href='#'>Faq</Link>
                </li>
            </ul>
        </div>
        <button className="hidden sm:flex items-center gap-2 bg-primary-color text-white px-4 py-[10px] rounded-[8px]">
            <BsLightningCharge />
            <p>Leaderboard</p>
        </button>
        <BiMenu className='text-[25px] cursor-pointer sm:hidden' onClick={() => setOpenNav(true)}/>
    </nav>
  )
}

export default AuthNav