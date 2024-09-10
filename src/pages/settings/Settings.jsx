import React, { useState, useEffect } from 'react'
import SideNav from '../../components/side-nav/Sidenav'
import TopNav from '../../components/top-nav/TopNav'
import { BiChevronDown, BiDotsHorizontal, BiDotsVertical, BiFilter, BiSearch } from 'react-icons/bi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PiArrowElbowUpLeftLight } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';

const Dashboard = () => {

  const userData = JSON.parse(localStorage.getItem('userData')) || null;

  useEffect(() => {
    console.log(userData?.data?.token);
    
    getLeaderBoard()
  },[])

  // const data = [
  //   { name: 'Cash Transactions', value: 20, color: '#FFBB28' },
  //   { name: 'Deposit', value: 20, color: '#FF8042' },
  //   { name: 'Withdrawal', value: 20, color: '#00C49F' },
  //   { name: 'Saved', value: 20, color: '#0088FE' },
  // ];

  const [loadingTx, setLoadingTx] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [leaderboardData, setLeaderboardData] = useState([])
  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_BASE_URL

  async function getLeaderBoard() {
    const res = await fetch(`${BASE_URL}/user/account/referrals/leaderboard`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userData?.data?.token}`,
            'Api-Key': `${API_KEY}`,
        }
    })
    const data = await res.json()
    setLeaderboardData(data.data.leaderboard)
    console.log(res, data);
}

  console.log(userData);

  return (
    <div>
        <div className='flex items-start bg-[#F5F5F5]'>
            <SideNav />
            <div className="w-full lg:w-[84%] bg-[#F5F5F5] ml-auto">
                <TopNav />
                <div className="p-[20px] mt-5 lg:mx-[25px] mx-[10px] bg-[#FFFFFF] border border-[#BDBDBD]">
                  <p className='text-[#121212] md:text-[24px] text-[18px]'>Hi, {userData?.data?.username}</p>
                  <p className='text-[#767676] text-[14px] font-[300]'>Welcome to Rehoboth Finance </p>

                  <p className='text-[28px] mt-3 text-gray-500'>Settings</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard