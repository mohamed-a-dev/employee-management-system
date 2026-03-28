import React, { useEffect, useState } from 'react'
import EmployeesTable from '../components/Employees/EmployeesTable'
import EmployeeModal from '../components/Employees/EmployeeModal'
import { useEmployee } from '../context/EmployeeContext'
import CreateButton from '../components/CreateButton'
import SearchBar from '../components/SearchBar'
import PageHeader from '../components/PageHeader'
import Loading from '../components/Loading'

const Employees = () => {
  const { openCreateEmployeeModal, handleSearch, getEmployees, load } = useEmployee();
  
  useEffect(() => {
    getEmployees();
  }, [])

  if(load)
    return <Loading/>

  return (
    <section className='px-5 py-5 min-h-[calc(100vh-72px)] dark:bg-slate-800 bg-white duration-300 '>
      <PageHeader title={'Employees Management'} />
      <div className='mb-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between'>
        <SearchBar placeholder={"Search employees..."} handleSearch={handleSearch} />
        <CreateButton btnName={'Create New Employee'} openModal={openCreateEmployeeModal} />
      </div>
      <EmployeesTable />
      <EmployeeModal />
    </section>
  )
}

export default Employees