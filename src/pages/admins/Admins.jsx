import React, { useState, useEffect } from 'react'
import SideNav from '../../components/side-nav/Sidenav'
import TopNav from '../../components/top-nav/TopNav'
import { BiChevronDown, BiDotsHorizontal, BiDotsVertical, BiFilter, BiSearch } from 'react-icons/bi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PiArrowElbowUpLeftLight } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';

const Admins = () => {

  const userData = JSON.parse(localStorage.getItem('userData')) || null;

  useEffect(() => {
    console.log(userData?.data?.token);
    getAllAdmins()
    getLeaderBoard()
  },[])

  const [loadingTx, setLoadingTx] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [allUsers, setAllUsers] = useState([])
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

  async function getAllAdmins() {
    const res = await fetch(`${BASE_URL}/admin/admins`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userData?.data?.token}`,
            'Api-Key': `${API_KEY}`,
        }
    })
    const data = await res.json()
    setAllUsers(data.data)
    console.log(res, data.data);
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
                  <p className='text-[#767676] text-[14px] font-[300]'>Welcome to Rehoboth finance </p>
                  <div className='grid grid-cols-1 gap-4 mt-10 justify-between items-center'>
                    <div className='border p-3 border-[#E1E1E1] rounded-[8px]'>
                      <div className='flex items-center justify-between mb-4'>
                        <p>Total Admins</p>
                        <BiDotsVertical className='cursor-pointer' />
                      </div>
                      <p className='text-[32px]'>{allUsers?.count}</p>
                    </div>
                  </div>

                  <div className='mt-[3rem]'>
                    <p className='text-[#121212] sm:text-[20px] mb-3'>All Users</p>
                    <div className='border p-[3px] rounded-[7px]'>
                      <div className='flex items-center justify-center mb-10'>
                        <div className='flex items-center gap-2 border rounded-full py-[6px] px-3 m-3 w-[40%] mx-auto'>
                            <BiSearch />
                            <input onChange={e => setSearchText(e.target.value)} type="text" className='w-full py-1 bg-transparent outline-none text-[12px] text-[#0E0F0C]' placeholder='Filter Users'/>
                        </div>
                      </div>
                      <div className="relative overflow-x-auto">                    
                        <table className="w-full text-sm text-left rtl:text-left">
                            <thead className="text-[12px] text-[#121212]">
                                <tr>
                                    <th scope="col" className="px-6 py-3 th1 font-[400]">S/N</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Username</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Email</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Wallet Address</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Is Email Verified</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Is Suspended</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Role</th>
                                    <th scope="col" className="px-6 py-3 font-[400]">Date</th>
                                </tr>
                            </thead>
                            {
                                loadingTx && 
                                <tr>
                                    <td colSpan="7" className='py-20 text-center'>
                                        <img src="./images/loader.gif" className='w-[50px] mx-auto' alt="Loading..." />
                                    </td>
                                </tr>
                            }
                            <tbody>
                                {
                                    allUsers?.admins?.filter(user => user?.username?.includes(searchText?.toLowerCase()))
                                    .map((user, index) => {
                                        return (
                                            <tr style={{borderBottom:"1px solid #dcdcdc"}} className='text-[12px] cursor-pointer' onClick={() => transactionInfo(transaction)}>
                                                <td className="px-6 py-4">{index + 1}.</td>
                                                <td className="px-6 py-4">{user?.username.slice(0, 6)}...</td>
                                                <td className="px-6 py-4">{user?.primaryEmail.slice(0, 6)}...</td>
                                                <td className="px-6 py-4 capitalize">{user?.stellarPublicKey?.slice(0, 6)}....{user?.stellarPublicKey?.slice(-6)}</td>
                                                <td className='px-6 py-4 text-center capitalize'> {user?.isEmailVerified.toString()} </td>
                                                <td className="px-6 py-4">
                                                  {
                                                      user?.isSuspended ?
                                                      <p>True</p>
                                                      :
                                                      <p>False</p>
                                                  }
                                                </td>
                                                <td className="px-6 py-4">{ user?.role?.map(x => <p>{x}</p> ) }</td>
                                                <td className="px-6 py-4">
                                                    {new Date(user?.createdAt).toDateString()}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Admins