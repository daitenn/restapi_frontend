import React from 'react'
import { Main } from './components/layout/Main'
import Sidebar from './components/Sidebar/Sidebar'
import './index.css'
import { Bottombar } from './components/Bottombar/Bottombar'

function App() {
  return (
    <>
      {/* <div className="flex">
        <Sidebar />
        <div className="">
          <Main />
        </div>
      </div> */}
      <div className='flex'>
        <div className='container border'>
          <Sidebar />
          {/* <Bottombar /> */}
        </div>
        <div className='ml-5'>
          <Main/>
        </div>
      </div>
    </>
  )
}

export default App
