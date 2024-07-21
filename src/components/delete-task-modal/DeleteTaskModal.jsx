import React from 'react'
import Cookies from 'js-cookie'

const DeleteTaskModal = ({taskId, getTasks, setModal}) => {

  const user = Cookies.get('token')
  const BASE_URL = import.meta.env.VITE_BASE_URL

  async function deleteTask(){
    // setLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/admin/referralProgram/delete-task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Api-Key': `GISUYDre8wt7984yupor5jp80YT%^%Rfuyih2wrk*&*^%&$^HJLIUTYDFwe576284`,
          'Authorization': `Bearer ${user}`,
        }
      })

      if(!response.ok){
        throw new Error('Failed to delete task')
      }

      await response.json()
      setModal(false)
      getTasks()
      // setLoading(false)

    } catch (error) {
      console.error(error)
      // setLoading(false)
    }
  }

  return (
    <>
      <div className="h-full w-full fixed top-0 left-0 z-[101]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
      <div className="bg-white w-[65%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-[12px] z-[102] rouunded-[10px]">
          <div className="flex items-center justify-between px-[2rem] flex-col pb-2">
            <div className='flex items-center justify-between w-full border-b'>
              <p className='font-[500] text-[20px] mb-2 text-gray-500'>Update Task</p>
              <p className='text-[30px] cursor-pointer text-gray-500' onClick={() => setModal(false)}>&times;</p>
            </div>
            <p className='text-[20px] text-gray-500 font-bold my-10'>Are you sure you want to delete this task?</p>
            <div className='flex gap-5'>
              <button className='text-gray-500 border border-primary-color px-4 py-1 rounded-sm' onClick={() => setModal(false)}>No</button>
              <button className='bg-primary-color text-white px-4 py-1 rounded-sm' onClick={deleteTask}>Yes, Continue</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default DeleteTaskModal