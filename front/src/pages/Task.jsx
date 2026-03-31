import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TaskCard from '../components/Tasks/TaskCard';
import { displayError } from '../utils/displayError';
import TaskModal from '../components/Tasks/TaskModal'
import { useTask } from '../context/TaskContext';
import Loading from '../components/Loading';

const Task = () => {
  const { taskId } = useParams();
  const { task, setTask } = useTask();
  const [load,setLoad] = useState(true);
  const token = localStorage.getItem('employees-dashboard-token') || '';

  const getTask = async () => {
    const api = import.meta.env.VITE_API_URL + 'tasks/' + taskId;

    try {
      setLoad(true);
      const res = await fetch(api, {
        headers: {
          authorization: 'Bearer ' + token
        }
      });
      const data = await res.json();
      if (!res.ok) {
        displayError(data.errorMsg, 'get task');
        return;
      }
      setTask(data.task);
    }
    catch (error) {
      displayError(error.message, 'error task');
    } finally {
      setLoad(false);
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  if (Object.keys(task) === 0)
    return null;

  if (load) return <Loading/>

  return (
    <div className='px-5 py-5 dark:bg-slate-800 bg-white min-h-screen duration-300 '>
      <TaskCard task={task} />
      <TaskModal />
    </div>
  )
}

export default Task