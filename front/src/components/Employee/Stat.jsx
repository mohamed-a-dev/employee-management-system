import React from 'react'

const Stat = ({ title, value }) => {
    return (
        <div className="bg-white p-4 rounded dark:bg-slate-900 border border-black/50 shadow-2xl dark:border-white/50">
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-xl font-semibold">{value}</p>
        </div>
    );
}

export default Stat