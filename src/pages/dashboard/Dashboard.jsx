import React, { useState, useEffect } from 'react'
import SideNav from '../../components/side-nav/Sidenav'
import TopNav from '../../components/top-nav/TopNav'
import { BiChevronDown, BiDotsHorizontal, BiDotsVertical, BiFilter, BiSearch } from 'react-icons/bi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PiArrowElbowUpLeftLight } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';
import { LiaAnkhSolid, LiaLinkSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom'
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';
import { IoChevronDownOutline } from 'react-icons/io5';
import { RxExternalLink } from 'react-icons/rx';

const Dashboard = () => {

  const userData = JSON.parse(localStorage.getItem('userData')) || null;


  useEffect(() => {
    console.log(userData?.data?.token);
    getAllUsers()
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
  const [allUsers, setAllUsers] = useState([])
  const [leaderboardData, setLeaderboardData] = useState([])
  const [suspendedUser, setSuspendUser] = useState()
  const [makeAdmin, setMakeAdmin] = useState()
  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState('')

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

  async function getAllUsers() {
    const res = await fetch(`${BASE_URL}/admin/users`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userData?.data?.token}`,
            'Api-Key': `${API_KEY}`,
        }
    })
    const data = await res.json()
    setAllUsers(data.data)
    console.log(res, data.data.users);
}

async function toggleUserSuspension(){
  setLoadingTx(true)
  const res = await fetch(`${BASE_URL}/owner/suspendOrUnsuspendAccount/${suspendedUser}`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${userData?.data?.token}`,
            'Api-Key': `${API_KEY}`,
        }
    })
    if(res) setLoadingTx(false);
    const data = await res.json()
    console.log(res, data);
    if(res.ok){
      getAllUsers()
      setAlertType('success')
      setMsg('User suspension toggled successfully')
      getAllUsers()
    }else{
      setAlertType('error')
      setMsg('Failed to toggle user suspension')
    }
}

async function toggleUserRole(){
  setLoadingTx(true)
  const res = await fetch(`${BASE_URL}/owner/addOrRemoveAdmin/${suspendedUser}`,{
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${userData?.data?.token}`,
            'Api-Key': `${API_KEY}`,
        }
    })
    if(res) setLoadingTx(false);
    const data = await res.json()
    console.log(res, data);
    if(res.ok){
      getAllUsers()
      setAlertType('success')
      setMsg('User suspension toggled successfully')
      getAllUsers()
    }else{
      setAlertType('error')
      setMsg('Failed to toggle user suspension')
    }
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
                        <p>Total Users</p>
                        <BiDotsVertical className='cursor-pointer' />
                      </div>
                      <p className='text-[32px]'>{allUsers?.count}</p>
                    </div>
                    {/* <div className='border p-3 border-[#E1E1E1] rounded-[8px]'>
                      <div className='flex items-center justify-between mb-4'>
                        <p>Transactions</p>
                        <BiDotsVertical className='cursor-pointer' />
                      </div>
                      <p className='text-[32px] flex items-end'>0 <span className='text-[14px] mb-[0.5rem]'>NGN</span> </p>
                    </div> */}
                  </div>

                  <div className='mt-12 grid grid-cols-1 gap-5'>
                    {/* <div className='w-full'>
                      <p className='text-[#6C6C6B] mb-2'>Transaction Statistics</p>
                      <div className='flex items-center gap-[3rem] h-[430px]'>
                        <div className='flex items-center gap-2 p-[30px] border w-full rounded-[8px] justify-between'>
                          <div>
                            <PieChart width={220} height={220}>
                              <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={90}
                                outerRadius={110}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {data.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </div>
                          <div className='flex flex-col gap-10'>
                            <div className='text-center'>
                              <div className='flex items-center gap-2'>
                                <div className='p-[2px] bg-red-500 rounded-full'></div>
                                <p className='text-[12px] texxt-[#707070]'>Cash Transactions</p>
                              </div>
                              <p className='text-[26px] ml-[-30px]'>0</p>
                            </div>
                            <div className='text-center'>
                              <div className='flex items-center gap-2'>
                                <div className='p-[2px] bg-red-500 rounded-full'></div>
                                <p className='text-[12px] texxt-[#707070]'>Deposit</p>
                              </div>
                              <p className='text-[26px] ml-[-30px]'>0</p>
                            </div>
                            <div className='text-center'>
                              <div className='flex items-center gap-2'>
                                <div className='p-[2px] bg-red-500 rounded-full'></div>
                                <p className='text-[12px] texxt-[#707070]'>Withdrawal</p>
                              </div>
                              <p className='text-[26px] ml-[-30px]'>0</p>
                            </div>
                            <div className='text-center'>
                              <div className='flex items-center gap-2'>
                                <div className='p-[2px] bg-red-500 rounded-full'></div>
                                <p className='text-[12px] texxt-[#707070]'>Saved</p>
                              </div>
                              <p className='text-[26px] ml-[-30px]'>0</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className='w-full'>
                      <p className='text-[#6C6C6B] mb-2'>Top Affiliates</p>
                      <div className='flex flex-col gap-2 p-[30px] border w-full rounded-[8px] h-[430px] overflow-y-scroll'>
                        <div className='flex items-center justify-between font-[500] text-gray-500 pb-1 border-b'>
                            <p>Username</p>
                            <p>Total Referrals</p>
                            <p>Points</p>
                        </div>
                        {
                            leaderboardData?.map((item, index) => {
                                return (
                                    <div className='flex items-center justify-between my-2 text-gray-500' key={index}>
                                        <div className='flex items-center gap-7'>
                                            <p>{index + 1}.</p>
                                            <p>{item?.username}</p>
                                        </div>
                                        <p>{item?.totalReferrals}</p>
                                        <p>{item?.xp}</p>
                                    </div>
                                )
                            })
                        }
                      </div>
                    </div>
                  </div>

                  <div className='mt-[3rem]'>
                    <p className='text-[#121212] sm:text-[20px] mb-3'>All Users</p>
                    <div className='border p-[3px] rounded-[7px]'>
                      <div className='flex items-center justify-between mb-10'>
                        <div className='flex items-center gap-2 border rounded-full py-[6px] px-3 m-3 w-[30%]'>
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
                                    allUsers?.users?.filter(user => user?.username?.includes(searchText?.toLowerCase()))
                                    .map((user, index) => {
                                        return (
                                            <tr style={{borderBottom:"1px solid #dcdcdc"}} className='text-[12px] cursor-pointer'>
                                                <td className="px-6 py-4">{index + 1}.</td>
                                                <td className="px-6 py-4">{user?.username.slice(0, 6)}...</td>
                                                <td className="px-6 py-4">{user?.primaryEmail.slice(0, 6)}...</td>
                                                {/* https://stellar.expert/explorer/public/account/ */}
                                                <td className="px-6 py-4 capitalize flex items-center gap-1">{user?.stellarPublicKey?.slice(0, 6)}....{user?.stellarPublicKey?.slice(-6)} <Link target='_blank' to={`https://stellar.expert/explorer/public/account/${user?.stellarPublicKey}`}> <RxExternalLink className='text-primary-color text-[20px]'/> </Link> </td>

                                                <td className='px-6 py-4 text-center capitalize'> {user?.isEmailVerified.toString()} </td>
                                                <td className="px-6 py-4" onClick={() => setSuspendUser(user._id)}>
                                                  {
                                                      user?.isSuspended ?
                                                      <p>True</p>
                                                      :
                                                      <p>False</p>
                                                  }
                                                </td>
                                                <td className="px-6 py-4" onClick={() => setMakeAdmin(user._id)}>{ user?.role?.map(x => <p>{x}</p> ) }</td>
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

        { suspendedUser &&
          <>
            <div className="h-full w-full fixed top-0 left-0 z-[101]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
            <div className="bg-white w-[65%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[12px] z-[102] rouunded-[10px]">
                <div className="flex items-center justify-between px-[2rem] flex-col pb-2">
                  <div className='flex items-center justify-between w-full border-b'>
                    <p className='font-[500] text-[18px] mb-2 text-gray-500'>Suspennd Or Unsuspend User</p>
                    <p className='text-[30px] cursor-pointer text-gray-500' onClick={() => setSuspendUser(false)}>&times;</p>
                  </div>
                  <div className='w-full text-center py-5'>
                    <p>Are you sure, you want to suspend or Unsuspend this user?</p>
                    {
                        loadingTx?
                        <BtnLoader />
                        :
                        <button onClick={toggleUserSuspension} className="bg-primary-color text-white py-2 px-4 rounded-[8px] mt-5 w-full">Confirm</button>
                    }
                    {/* <button className=''>Add Task</button> */}
                  </div>
                </div>
            </div>
          </>
        }

        { makeAdmin &&
          <>
            <div className="h-full w-full fixed top-0 left-0 z-[101]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setMakeAdmin(false)}></div>
            <div className="bg-white w-[65%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[12px] z-[102] rouunded-[10px]">
                <div className="flex items-center justify-between px-[2rem] flex-col pb-2">
                  <div className='flex items-center justify-between w-full border-b'>
                    <p className='font-[500] text-[18px] mb-2 text-gray-500'>Make user and admin</p>
                    <p className='text-[30px] cursor-pointer text-gray-500' onClick={() => setMakeAdmin(false)}>&times;</p>
                  </div>
                  <div className='w-full text-center py-5'>
                    <p>Are you sure, you want to make this user an admin?</p>
                    {
                        loadingTx?
                        <BtnLoader />
                        :
                        <button onClick={toggleUserRole} className="bg-primary-color text-white py-2 px-4 rounded-[8px] mt-5 w-full">Confirm</button>
                    }
                    {/* <button className=''>Add Task</button> */}
                  </div>
                </div>
            </div>
          </>
        }
        {
            msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
        }
    </div>
  )
}

export default Dashboard