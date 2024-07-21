import React, { useEffect, useState } from 'react';
import SideNav from '../../components/side-nav/Sidenav';
import TopNav from '../../components/top-nav/TopNav';
import { BiChevronDown, BiDotsHorizontal, BiDotsVertical, BiFilter, BiPlus, BiSearch } from 'react-icons/bi';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { PiArrowElbowUpLeftLight } from 'react-icons/pi';
import { MdCancel } from 'react-icons/md';
import AddTaskModal from '../../components/add-task-modal/AddTaskModal';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaChevronDown } from 'react-icons/fa6';
import { LuInfo } from 'react-icons/lu';
import { IoTrashOutline } from 'react-icons/io5';
import EditTaskModal from '../../components/edit-task-modal/EditTaskModal';
import DeleteTaskModal from '../../components/delete-task-modal/DeleteTaskModal';

const AddTask = () => {
  const userData = JSON.parse(localStorage.getItem('userData')) || null;
  const [modal, setModal] = useState(null); // Change to null initially
  const [editTask, setEditTask] = useState(null); // State to store the task being edited
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const user = Cookies.get('token');
  const [tasks, setTasks] = useState([]);

  async function getTasks() {
    try {
      const response = await fetch(`${BASE_URL}/referralProgram/task`, {
        headers: {
          'Api-Key': API_KEY,
          'Authorization': `Bearer ${user}`,
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTasks(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const gradientStyle = {
    background: 'linear-gradient(90deg, #5A78FF 0%, #072AC8 100%)'
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <div className='flex items-start bg-[#F5F5F5]'>
        <SideNav />
        <div className="w-full lg:w-[84%] bg-[#F5F5F5] ml-auto">
          <TopNav />
          <div className="p-[20px] mt-5 lg:mx-[25px] mx-[10px] bg-[#FFFFFF] border border-[#BDBDBD]">
            <div className="flex justify-between items-center mb-5">
              <p>All Tasks</p>
              <div onClick={() => setModal('task')} style={gradientStyle} className='cursor-pointer custom-btn-gradient text-white px-5 py-2 rounded-full flex items-center gap-3'>
                <BiPlus />
                <p>Add New</p>
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-left">
              <thead className="text-[12px] text-[#121212]">
                <tr>
                  <th scope="col" className="px-6 py-3 th1 font-[400]">S/N</th>
                  <th scope="col" className="px-6 py-3 font-[400]">Task Name</th>
                  <th scope="col" className="px-6 py-3 font-[400]">Task Point</th>
                  <th scope="col" className="px-6 py-3 font-[400]">Task URL</th>
                  <th scope="col" className="px-6 py-3 font-[400]">Task Desc</th>
                  <th scope="col" className="px-6 py-3 font-[400]">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task._id} style={{ borderBottom: "1px solid #dcdcdc" }} className='text-[12px]'>
                    <td className="px-6 py-4">{index + 1}.</td>
                    <td className="px-6 py-4">{task.name}</td>
                    <td className="px-6 py-4 capitalize">{task.xp}</td>
                    <td className="px-6 py-4">{task.url}</td>
                    <td className="px-6 py-4">{task.description.slice(0, 20)}..........</td>
                    <td className="px-6 py-4 flex items-center gap-5">
                      <LuInfo className='cursor-pointer' onClick={() => { setModal('edit-task'); setEditTask(task); }} />
                      <IoTrashOutline className='cursor-pointer' onClick={() => { setModal('delete-task'); setEditTask(task); }}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modal === 'task' && <AddTaskModal setModal={setModal} getTasks={getTasks} />}
      {modal === 'edit-task' && <EditTaskModal setModal={setModal} getTasks={getTasks} task={editTask} />}
      {modal === 'delete-task' && <DeleteTaskModal setModal={setModal} getTasks={getTasks} taskId={editTask._id} />}
    </div>
  );
};

export default AddTask;
