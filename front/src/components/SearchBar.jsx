import { CiSearch } from 'react-icons/ci'

const SearchBar = ({ placeholder, handleSearch }) => {
    return (
        <form action="">
            <div className="relative duration-300 dark:text-white">
                <span className="text-2xl absolute left-1 top-1/2 -translate-y-1/2"><CiSearch /></span>
                <input onChange={(e) => handleSearch(e.target.value)} type="search" className="pl-8 pr-1 py-1 outline-none border-0 bg-black/10 rounded dark:placeholder:text-white/40 placeholder:text-black/40  dark:bg-slate-600/50" placeholder={placeholder} />
            </div>
        </form>
    )
}

export default SearchBar
