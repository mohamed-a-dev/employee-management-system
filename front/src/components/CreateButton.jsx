
const CreateButton = ({ btnName, openModal }) => {
  return (
    <div className='mb-5 md:mb-0 flex md:justify-end items-center'>
      <button onClick={openModal} className='px-8 py-2 cursor-pointer duration-300 dark:hover:bg-slate-600 hover:bg-slate-600 dark:hover:text-white dark:bg-slate-300 dark:text-black bg-slate-800 text-green-500'>{btnName}</button>
    </div>
  )
}

export default CreateButton