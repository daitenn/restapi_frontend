import React from 'react'
import { ReactComponent as NewIcon } from '../../assets/+.svg'
import './icon.css'

export const NewPageIcon = () => {
  return (
    <div className='grid justify-items-start flex flex-col icon'>
        <NewIcon/>
        <a>New page</a>
    </div>
    
  )
}
