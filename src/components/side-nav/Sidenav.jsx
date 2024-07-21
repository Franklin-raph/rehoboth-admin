import React, { useEffect, useState } from "react";

import { RxDashboard } from "react-icons/rx";
import { BsTrophy } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { RiSettingsLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { TbMessageQuestion } from "react-icons/tb";
import { PiUsersThreeLight } from "react-icons/pi";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LuBadgePercent } from "react-icons/lu";
import Cookies from 'js-cookie';
import { MdSwapVert } from "react-icons/md";
import { BiTask } from "react-icons/bi";


const SideNav = () => {

   const navigate = useNavigate()
   const location = useLocation()
   const user = Cookies.get('token')
   const API_KEY = import.meta.env.VITE_API_KEY
   const BASE_URL = import.meta.env.VITE_BASE_URL
   const [userData, setUserData] = useState()

   function handleLogout(){
    localStorage.clear()
    Cookies.remove('token')
    navigate('/')
   }

   async function getUserInfo(){
    console.log(user);
    try {
      const res = await fetch(`${BASE_URL}/user/account/profile`, {
        headers: {
          'Authorization': `Bearer ${user}`,
          'Api-Key': `${API_KEY}`,
        }
      })
      const data = await res.json()
      if(!res.ok) throw new Error(data, 'Failed to fetch user info')
      setUserData(data.data)
      // localStorage.setItem('userData', JSON.stringify(data.data))
    } catch (error) {
      console.error(error)
    }
   }

   useEffect(() => {
    getUserInfo()
    console.log(userData);
   },[])
   
  
  return (
    <div className='bg-[#ffffff] border border-[#BDBDBD] scrollbar w-[18%] hidden lg:block' style={{ borderTopRightRadius:'8px', borderBottomRightRadius:'8px' }}>
        <div className='p-5 border-b cursor-pointer'>
            <img src="./images/rehoboth-logo.svg" alt="" />
        </div>
        <div className=" my-10 text-white">
          <p className="text-[12px] text-[#98A2B3] mb-2 px-3">HOME</p>
          <Link to='/dashboard' className={ location.pathname.includes('/dashboard') ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5` :`px-5 flex items-center justify-between py-[10px] text-[#101828]`}>
            <div className="flex items-center">
                <RxDashboard />
                <p className="ml-[10px]">Dashboard</p>
            </div>
          </Link>
          <Link to='/earn-points' className={ location.pathname.includes('/earn-points') ? `flex items-center justify-between py-[10px] text-[#072AC8] px-5 bg-[#072AC81F]` :`px-5 flex items-center justify-between py-[10px] text-[#101828]`}>
            <div className="flex items-center">
                <PiUsersThreeLight />
                <p className="ml-[10px]">Users</p>
            </div>
          </Link>
          <Link to='/earn-points' className={ location.pathname.includes('/earn-points') ? `flex items-center justify-between py-[10px] text-[#072AC8] px-5 bg-[#072AC81F]` :`px-5 flex items-center justify-between py-[10px] text-[#101828]`}>
            <div className="flex items-center">
                <HiOutlineBriefcase />
                <p className="ml-[10px]">Administrators</p>
            </div>
          </Link>
          <Link to='/earn-points' className={ location.pathname.includes('/earn-points') ? `flex items-center justify-between py-[10px] text-[#072AC8] px-5 bg-[#072AC81F]` :`px-5 flex items-center justify-between py-[10px] text-[#101828]`}>
            <div className="flex items-center">
                <LuBadgePercent />
                <p className="ml-[10px]">Promotions</p>
            </div>
          </Link>
          <Link to='/add-task' className={ location.pathname.includes('tasks') ? `flex items-center justify-between py-[10px] text-[#072AC8] px-5 bg-[#072AC81F]` :`px-5 flex items-center justify-between py-[10px] text-[#101828]`}>
            <div className="flex items-center">
                <BiTask />
                <p className="ml-[10px]">Tasks</p>
            </div>
          </Link>
        </div>

        <div className=" my-10 text-white">
          <p className="text-[12px] text-[#98A2B3] mb-2 px-3">ACCOUNT</p>
          <Link to='/settings' className={ location.pathname.includes('/settings') ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5` :`px-5 flex items-center justify-between py-[10px] text-[#101828]`}>
            <div className="flex items-center">
              <RiSettingsLine />
              <p className="ml-[10px]">Settings</p>
            </div>
          </Link>
          <Link to='/help-and-support' className={ location.pathname.includes('/help-and-support') ? `flex items-center justify-between py-[10px] text-[#072AC8] bg-[#072AC81F] px-5` :`px-5 flex items-center justify-between py-[10px] text-[#101828]`}>
            <div className="flex items-center">
                <TbMessageQuestion />
                <p className="ml-[10px]">Help & Support</p>
            </div>
          </Link>
          <div onClick={handleLogout} className='cursor-pointer px-5 flex items-center justify-between py-[10px] text-[#101828]'>
            <div className="flex items-center">
              <TbLogout />
              <p className="ml-[10px]">Logout</p>
            </div>
          </div>
        </div>

        <div className="ml-[10px] mt-[15rem] mb-16">
          <div className="flex align-center">
              <img src={userData?.userProfileUrl} className="w-[50px]" style={{ marginRight: 12, }} />
              <div>
                <p className='text-[#101828] text-[14px] font-[500]'>{userData?.username}</p>
                <p className="text-[#6F7975] text-[12px]">{userData?.primaryEmail}</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SideNav