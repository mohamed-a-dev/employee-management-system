import React from 'react'

const Loading = () => {
    return (
        <section className="min-h-[calc(100vh-72px)] flex justify-center items-center dark:bg-slate-600 bg-slate-200">
            <div class="h-10 w-10 animate-spin rounded-full border-b-3 border-black dark:border-white duration-300" />
        </section>)
}

export default Loading