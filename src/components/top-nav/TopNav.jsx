import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci'
import { MdClose } from 'react-icons/md';
import { BiMenu } from 'react-icons/bi';
import Cookies from 'js-cookie';
import { LuUserCircle } from "react-icons/lu";
import { GoChevronDown } from "react-icons/go";
import { BsEmojiSmile } from 'react-icons/bs';


const TopNav = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [notification, setNotification] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  const notificationArray = [
    {
      title:'New Daily Mint by Atari',
      desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    },
    {
      title:'Your weekly summary is ready for review🔥 ',
      desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    },
    {
      title:'Bitcoin(BTC) +1.1% ($40,00) in the last 18 mins.',
      desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    },
    {
      title:'Invitation Accepted!',
      desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    },
    {
      title:'50% off the service fee',
      desc:'Unlock community, gaming, and IRL utility with a new generation of Atari.'
    }
  ]

  const user = Cookies.get('token')
  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [userData, setUserData] = useState()

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

   const [selectedNav, setSelectedNav] = useState()

   useEffect(() => {
    getUserInfo()
   },[])

  return (
    <div>
      <div className='bg-[#FFFFFF] border border-[#BDBDBD] rounded-[8px] hidden lg:flex items-center justify-center gap-[70px] w-[95%] py-[1.2rem] top-0 right-0 z-[99] mx-auto mt-[1.2rem] relative'>
        {/* <div className='flex items-center gap-5'>
          <div className='flex items-center gap-2'>
            <img src="./images/overview.svg" alt="" />
            <p>
              <p className='text-[#737985] capitalize'>{location.pathname.replace(/^\//, '')}</p>
            </p>
          </div>
          <div className='flex items-center gap-2 bg-[#F8F8F8] border border-[#BDBDBD] rounded-[4px] px-[12px] py-[7px] w-[200px] lg:w-[400px] '>
            <CiSearch className='text-[#828282] text-[26px] cursor-pointer'/>
            <input type="text" placeholder='Search transactions, assets etc.' className='text-[#333333] w-full placeholder:text-[#333333] bg-transparent text-[14px] outline-none'/>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <img src="./images/moon.svg" alt="" />
          <div className='p-2 rounded-[8px] bg-[#B9B9B926]'>
            <img src="./images/notification.svg" alt="" className='cursor-pointer'  onClick={() => setNotification(true)} />
          </div>
          <button className="flex items-center gap-2 text-white px-4 py-[10px] rounded-[8px] cutom-btn-gradient" onClick={() => navigate('/leader-board')} >
            <img src="./images/ranking.svg" alt="" />
            <p>Leaderboard</p>
          </button>
        </div>
        {
          notification &&
          <div className='h-[500px] overflow-y-scroll absolute z-[9999] mt-[590px] right-0 bg-white shadow-md border w-[360px] p-5 rounded-[8px]'>
            <div className='flex items-center justify-between'>
              <p className='text-[#282828] font-[500] text-[20px]'>Notifications</p>
              <MdClose className='text-[#101828] cursor-pointer text-[20px]' onClick={() => setNotification(false)}/>
            </div>
            {
              notificationArray.map((item, index) => {
                return (
                  <div key={index} className='border-b mt-5 pb-1'>
                    <p className='text-primary-color font-[600]'>{item.title}</p>
                    <p className='text-[#767676] font-[300] text-[14px]'>{item.desc}</p>
                  </div>
                )
              })
            }
          </div>
        } */}
      </div>
      <div className={mobileNav === true ? `p-[20px] flex items-center justify-between border z-[9999] lg:hidden fixed w-full bg-[#F5F5F5]` : `p-[20px] flex lg:hidden items-center justify-between border`}>
        <Link  to='/' className=''>
            <img src="./images/rehoboth-logo.svg" className='' alt="" />
        </Link>
        <div className='flex items-center gap-4'>
          <div className='p-2 rounded-[8px] bg-[#B9B9B926]'>
            <img src="./images/notification.svg" alt="" className='cursor-pointer'  onClick={() => setNotification(true)} />
          </div>
          {
            userData?.userProfileUrl ?
            <img src={userData?.userProfileUrl} alt="" className='w-[50px]'/>
            :
            <LuUserCircle  className='text-[25px] cursor-pointer'/>
          }
        </div>
        {/* */}
        {
          notification &&
          <div className='h-[500px] overflow-y-scroll absolute z-[999999] mt-[590px] right-0 bg-white shadow-md border w-[360px] p-5 rounded-[8px]'>
            <div className='flex items-center justify-between'>
              <p className='text-[#282828] font-[500] text-[20px]'>Notifications</p>
              <MdClose className='text-[#101828] cursor-pointer text-[20px]' onClick={() => setNotification(false)}/>
            </div>
            {
              notificationArray.map((item, index) => {
                return (
                  <div key={index} className='border-b mt-5 pb-1'>
                    <p className='text-primary-color font-[600]'>{item.title}</p>
                    <p className='text-[#767676] font-[300] text-[14px]'>{item.desc}</p>
                  </div>
                )
              })
            }
          </div>
        }
      </div>
      <div className={mobileNav === true ? `py-4 px-6 flex items-center justify-between z-[9999] lg:hidden fixed w-full bg-[#F5F5F5] top-[82px]` : `py-4 px-6 flex items-center justify-between lg:hidden relative`}>
        <div>
            <p className='text-[#121212] font-[500] text-[18px]'>Hi, {userData?.username}</p>
            <p className='text-[#767676] text-[14px] font-[300]'>Welcome to Rehoboth finance </p>
        </div>
        <div className='p-2 rounded-[8px] bg-[#B9B9B926] text-[24px] cursor-pointer'>
          <BiMenu onClick={() => setMobileNav(!mobileNav)}/>
        </div>
        {
          mobileNav &&
          <div className='fixed left-0 w-full bg-[#12121266] h-full top-[160px] z-[9999]'>
            <div className="bg-[#F5F5F5] grid gap-5 px-6 text-[#919191] text-[12px] font-[500] pt-4">
              <div>
                <div className='flex items-center justify-between cursor-pointer' onClick={() => setSelectedNav(selectedNav === 'home' ? false : 'home')}>
                  <p>HOME</p>
                  <GoChevronDown className='text-[24px]'/>
                </div>
                {
                  selectedNav === "home" &&
                  <div className='ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]'>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Get Started</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Dashboard</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Earn Points</p>
                    </div>
                  </div>
                }
              </div>

              <div>
                <div className='flex items-center justify-between cursor-pointer' onClick={() => setSelectedNav(selectedNav === 'finance' ? false : 'finance')}>
                  <p>FINANCE</p>
                  <GoChevronDown className='text-[24px]'/>
                </div>
                {
                  selectedNav === "finance" &&
                  <div className='ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]'>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Wallet</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Deposit</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Withdraw</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>History</p>
                    </div>
                  </div>
                }
              </div>

              <div>
                <div className='flex items-center justify-between cursor-pointer' onClick={() => setSelectedNav(selectedNav === 'earn' ? false : 'earn')}>
                  <p>EARN</p>
                  <GoChevronDown className='text-[24px]'/>
                </div>
                {
                  selectedNav === "earn" &&
                  <div className='ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]'>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Savings</p>
                    </div>
                  </div>
                }
              </div>

              <div>
                <div className='flex items-center justify-between cursor-pointer' onClick={() => setSelectedNav(selectedNav === 'account' ? false : 'account')}>
                  <p>ACCOUNT</p>
                  <GoChevronDown className='text-[24px]'/>
                </div>
                {
                  selectedNav === "account" &&
                  <div className='ml-2 my-3 text-[#2B2D36] grid gap-2 text-[14px] font-[400]'>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Settings</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Help & Support</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Withdraw</p>
                    </div>
                    <div className='flex items-center gap-3 cursor-pointer'>
                      <BsEmojiSmile className='text-[16px]'/>
                      <p>Log out</p>
                    </div>
                  </div>
                }
              </div>
              <button className="flex items-center gap-2 text-white px-4 py-[10px] rounded-[8px] cutom-btn-gradient mt-[3rem] mb-5 justify-center" onClick={() => navigate('/leader-board')} >
                <img src="./images/ranking.svg" alt="" />
                <p>Leaderboard</p>
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default TopNav