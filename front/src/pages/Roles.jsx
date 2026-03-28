import React, { useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import CreateButton from '../components/CreateButton'
import { useRole } from '../context/RoleContext'
import RolesTable from '../components/Roles/RolesTable'
import RoleModal from '../components/Roles/RoleModal'
import Loading from '../components/Loading'

const Roles = () => {
  const { openCreateRoleModal, getRoles, load } = useRole();
  useEffect(() => {
    getRoles();
  }, [])

  if (load)
    return <Loading />

  return (
    <section className='px-5 py-5 min-h-[calc(100vh-72px)] dark:bg-slate-800 bg-white duration-300'>
      <PageHeader title={'Roles Management'} />
      <div className='mb-3 flex flex-col md:flex-row gap-3 justify-between items-center'>
        <p className='font-semibold text-xl dark:text-white'>Manage roles and permissions for employees</p>
        <CreateButton btnName={'Create New Role'} openModal={openCreateRoleModal} />
      </div>
      <RolesTable />
      <RoleModal />
    </section>
  )
}

export default Roles