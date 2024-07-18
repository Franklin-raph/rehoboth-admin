import React, { useState } from 'react'
import SideNav from '../../components/side-nav/Sidenav'
import TopNav from '../../components/top-nav/TopNav'
import { BiChevronDown, BiDotsHorizontal, BiDotsVertical, BiFilter, BiPlus, BiSearch } from 'react-icons/bi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PiArrowElbowUpLeftLight } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';
import AddTaskModal from '../../components/add-task-modal/AddTaskModal';
import { useNavigate } from 'react-router-dom';


const Tasks = () => {

    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

  return (
    <div>
        <div className='flex items-start bg-[#F5F5F5]'>
            <SideNav />
            <div className="w-full lg:w-[84%] bg-[#F5F5F5] ml-auto">
                <TopNav />
                <div className="p-[20px] mt-5 lg:mx-[25px] mx-[10px] bg-[#FFFFFF] border border-[#BDBDBD]">
                <p className='text-[#121212] md:text-[24px] text-[18px]'>Hi, {userData?.data?.username}</p>
                <p className='text-[#767676] text-[14px] font-[300]'>Welcome to Rehoboth finance </p>
                <div className='grid grid-cols-4 gap-4 mt-10 justify-between items-center'>
                    <div className='border p-3 border-[#E1E1E1] rounded-[8px]'>
                        <div className='flex items-center justify-between mb-4'>
                            <p>Total Users</p>
                            <BiDotsVertical className='cursor-pointer' />
                        </div>
                        <p className='text-[32px]'>1,892,019</p>
                    </div>
                    <div className='border p-3 border-[#E1E1E1] rounded-[8px]'>
                    <div className='flex items-center justify-between mb-4'>
                        <p>Total Tasks</p>
                        <BiDotsVertical className='cursor-pointer' />
                    </div>
                    <p className='text-[32px] flex items-end'>80</p>
                    </div>
                    <div className='border p-3 border-[#E1E1E1] rounded-[8px] cursor-pointer' onClick={() => navigate('/add-task')}>
                    <div className='flex items-center justify-between mb-4'>
                        <p>Add New Task</p>
                        <BiPlus className='cursor-pointer' />
                    </div>
                    <p className='text-[32px]'>1,892,019</p>
                    </div>
                    <div className='border p-3 border-[#E1E1E1] rounded-[8px]'>
                    <div className='flex items-center justify-between mb-4'>
                        <p>Total Users</p>
                        <BiDotsVertical className='cursor-pointer' />
                    </div>
                    <p className='text-[32px]'>1,892,019</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
        {
            modal === "task" && <AddTaskModal />
        }
    </div>
  )
}

export default Tasks