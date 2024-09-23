import React from 'react'
import Chart from './components/Chart'
import Table from './components/Table'

const App = () => {
  return (
    <>
    <div className='py-8 px-4 overflow-hidden'>
      <p className='text-4xl font-bold'>Assignment Submission for MERN Internship</p>
      <hr className='mt-4'/>
      <Chart/>
      <Table/>

    </div>
      <p className='bg-gray-200 p-4 text-center'>Made by Rachit Tandale</p>
      </>
  )
}

export default App
