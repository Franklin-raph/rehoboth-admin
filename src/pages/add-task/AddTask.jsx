import React, { useState } from 'react'
import SideNav from '../../components/side-nav/Sidenav'
import TopNav from '../../components/top-nav/TopNav'
import { BiChevronDown, BiDotsHorizontal, BiDotsVertical, BiFilter, BiPlus, BiSearch } from 'react-icons/bi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PiArrowElbowUpLeftLight } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';
import AddTaskModal from '../../components/add-task-modal/AddTaskModal';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';

const AddTask = () => {

    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    const [modal, setModal] = useState(false)
    const navigate = useNavigate()

    async function getTaskNames(){
        try {
          const response = await fetch(`${BASE_URL}/referral/task-enum`, {
            headers: {
              'Api-Key': `GISUYDre8wt7984yupor5jp80YT%^%Rfuyih2wrk*&*^%&$^HJLIUTYDFwe576284`,
            }
          })
          const data = await response.json()
          console.log(data);
          if(response.ok){
            return data.data
          }
        } catch (error) {
          console.error(error);
        }
        return []
    }

  return (
    <div>
        <div className='flex items-start bg-[#F5F5F5]'>
            <SideNav />
            <div className="w-full lg:w-[84%] bg-[#F5F5F5] ml-auto">
                <TopNav />
                <div className="p-[20px] mt-5 lg:mx-[25px] mx-[10px] bg-[#FFFFFF] border border-[#BDBDBD]">
                    <div className="flex justify-between items-center">
                    <p>All Tasks</p>
                        <div onClick={() => setModal('task')} className='cursor-pointer cutom-btn-gradient text-white px-5 py-2 rounded-full flex items-center gap-3'>
                            <BiPlus />
                            <p>Add New</p>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
        {
            modal === "task" && <AddTaskModal setModal={setModal}/>
        }
    </div>
  )
}

export default AddTask