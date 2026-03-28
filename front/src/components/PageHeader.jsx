import React from 'react'

const PageHeader = ({title}) => {
  return (
      <h1 className='mb-3 text-2xl font-bold bg-slate-950/20 p-1 border-b-2 border-slate-950 text-black duration-300 dark:text-white dark:border-white inline-block'>{title}</h1>
  )
}

export default PageHeader