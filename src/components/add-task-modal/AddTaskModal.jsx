import React, { useEffect, useState } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'
import BtnLoader from '../btn-loader/BtnLoader'
import Cookies from 'js-cookie'
import Alert from '../alert/Alert'

const AddTaskModal = ({setModal}) => {

  const [dropDown, setDropDown] = useState(false)
  const [xp, setXp] = useState()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const API_KEY = process.env.VITE_API_KEY
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const user = Cookies.get('token')
  const [tasks, setTasks] = useState()

  const [msg, setMsg] = useState('')
  const [alertType, setAlertType] = useState('')

  async function getTaskNames(){
    console.log(user);
    try {
      const response = await fetch(`${BASE_URL}/referral/task-enum`, {
        headers: {
          'Api-Key': `GISUYDre8wt7984yupor5jp80YT%^%Rfuyih2wrk*&*^%&$^HJLIUTYDFwe576284`,
          'Authorization': `Bearer ${user}`,
        }
      })
      const data = await response.json()
      console.log(data);
      if(response.ok){
        setTasks(data.data)
      }
    } catch (error) {
      console.error(error);
    }
    return []
  }

  async function addTask(){
    console.log({
      xp:Number(xp),
      name,
      description
    });
    if(!xp ||!name ||!description){
      setMsg('Please fill all required fields')
      setAlertType('error')
      return
    }else{
      setLoading(true)
      const response = await fetch(`${BASE_URL}/referral/create-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': `GISUYDre8wt7984yupor5jp80YT%^%Rfuyih2wrk*&*^%&$^HJLIUTYDFwe576284`,
          'Authorization': `Bearer ${user}`,
        },
        body: JSON.stringify({
          xp:Number(xp),
          name,
          description
        }),
      })
      const data = await response.json()
      console.log(response, data);
      if(response) setLoading(false)
      if(!response.ok){
        setMsg(data?.message)
        setAlertType('error')
        return
      }
      if(response.ok){
        setMsg('Task added successfully')
        setAlertType('success')
        setModal(false)
        setName('')
        setDescription('')
        setXp('')
        return
      }
    }
  }

  useEffect(() => {
    getTaskNames()
  },[])

  return (
    <>
      <div className="h-full w-full fixed top-0 left-0 z-[101]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
      <div className="bg-white w-[65%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[12px] z-[102] rouunded-[10px]">
          <div className="flex items-center justify-between px-[2rem] flex-col pb-2">
            <div className='flex items-center justify-between w-full border-b'>
              <p className='font-[500] text-[22px] mb-2 text-gray-500'>Add Task</p>
              <p className='text-[30px] cursor-pointer text-gray-500' onClick={() => setModal(false)}>&times;</p>
            </div>
            <div className='w-full'>
              <div className='flex flex-col sm:flex-row items-center gap-5 w-full my-[1rem]'>
                <div className='w-full relative'>
                    <label className='block text-left mb-2'>Select Name</label>
                    <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} className='outline-none w-full rounded-[4px] capitalize'/>
                        <IoChevronDownOutline className='cursor-pointer' onClick={() => setDropDown(dropDown === 'name' ? false : 'name')} />
                    </div>
                    {
                        dropDown === 'name' &&
                        <div className='absolute z-10 top-[80px] border rounded-[5px] bg-white w-full h-[350px] overflow-y-scroll'>
                            {
                                tasks.map(task => {
                                    return (
                                        <p className='cursor-pointer hover:bg-gray-300 p-2 capitalize' onClick={() => {
                                            setName(task)
                                            setDropDown(false)
                                        }}>{task}</p>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
                <div className='w-full relative'>
                    <label className='block text-left mb-2'>Point (XP)</label>
                    <div className='flex items-center gap-5 w-full'>
                        <div className='flex items-center justify-between border rounded-[6px] py-3 px-5 w-full'>
                            <input type="number" value={xp} onChange={e => setXp(e.target.value)} className='outline-none w-full rounded-[4px]'/>
                        </div>
                    </div>
                </div>
              </div>
              <div className="w-full reative">
                <label className='block text-left mb-2'>Description</label>
                <div className='flex items-center gap-5 w-full'>
                    <div className='flex items-center justify-between border rounded-[6px] w-full'>
                      <textarea onChange={(e) => setDescription(e.target.value)} cols="30" rows="5" className='w-full outline-none p-3 resize-none'></textarea>
                    </div>
                </div>
              </div>
              {
                  loading?
                  <BtnLoader />
                  :
                  <button onClick={addTask} className="bg-primary-color text-white py-2 px-4 rounded-[8px] mt-5 w-full">Add Task</button>
              }
              {/* <button className=''>Add Task</button> */}
            </div>
          </div>
      </div>
      {
          msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType}/>
      }
    </>
  )
}

export default AddTaskModal