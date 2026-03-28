import { useEffect } from "react"
import TasksPerEmployeeBarChart from "../components/Dashboard/BarChart"
import Cards from "../components/Dashboard/Cards"
import TasksStatusPieChart from "../components/Dashboard/PieChart"
import PageHeader from "../components/PageHeader"
import { useDashboard } from "../context/DashboardContext"
import Loading from "../components/Loading"


const Dashboard = () => {
  const { fetchAllStats, load } = useDashboard();

  useEffect(() => {
    fetchAllStats();
  }, [])

  if (load)
    return <Loading />



  return (
    <section className='px-5 py-5 dark:bg-slate-600 bg-slate-200 min-h-screen text-white'>
      <PageHeader title={'Dashboard'} />
      <Cards />
      <main className="mt-10 grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr] gap-5 overflow-hidden">
        <div className="p-3 h-90 shadow-xl flex flex-col items-start bg-white dark:bg-slate-900 duration-300">
          <p className="mb-2 text-black text-xl font-bold dark:text-white">Tasks Per Employee Chart</p>
          <TasksPerEmployeeBarChart />
        </div>
        <div className="p-3 h-90 shadow-xl flex flex-col items-start dark:bg-slate-900 duration-300 bg-white">
          <p className="mb-2 text-black text-xl font-bold dark:text-white">Tasks Status Chart</p>
          <TasksStatusPieChart />
        </div>
      </main>

    </section>
  )
}

export default Dashboard