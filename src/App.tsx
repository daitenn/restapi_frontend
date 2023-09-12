import React from 'react'
import { Main } from './components/layout/Main'
import Sidebar from './components/Sidebar/Sidebar'
import './index.css'
import { Bottombar } from './components/Bottombar/Bottombar'
import { Border } from './components/layout/Border'

function App() {
  return (
    <>
      {/* <div className="flex">
        <Sidebar />
        <div className="">
          <Main />
        </div>
      </div> */}
      <div>
        <div className='border'>
          <Sidebar />
          <Border/>
          {/* <Bottombar /> */}
        </div>
        <div className='main'>
          <Main/>
        </div>
      </div>
    </>
  )
}

export default App
