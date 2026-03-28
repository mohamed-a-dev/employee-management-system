import React, { useEffect } from 'react'
import { useTask } from '../context/TaskContext';
import CreateButton from '../components/CreateButton';
import TasksCards from '../components/Tasks/TasksCards';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import FilterButton from '../components/FilterButton';
import TaskModal from '../components/Tasks/TaskModal';
import PageHeader from '../components/PageHeader';
import Loading from '../components/Loading';

const Tasks = () => {
  const { openCreateTaskModal, showFilterDropdown, toggleFilterButton, handleSearch, setFilter, filterTasks, getTasks, load } = useTask();

  useEffect(() => {
    getTasks();
  }, [])

  
  if(load)
    return <Loading/>

  return (
    <section className='px-5 py-5 min-h-[calc(100vh-72px)] dark:bg-slate-800 bg-white duration-300 dark:text-white '>
      <PageHeader title={'Tasks Management'} />
      <div className='mb-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between'>
        <SearchBar placeholder={'Search Tasks...'} handleSearch={handleSearch} />
        <CreateButton btnName={'Create New Task'} openModal={openCreateTaskModal} />
      </div>

      <div className='relative'>
        <FilterButton toggleFilterButton={toggleFilterButton} />
        <FilterDropdown showFilterDropdown={showFilterDropdown} setFilter={setFilter} filterAction={filterTasks} />
      </div>

      <TasksCards />
      <TaskModal />
    </section>
  )
}

export default Tasks