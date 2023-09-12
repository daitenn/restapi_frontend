import React from 'react'
import { ReactComponent as Edit } from '../../assets/edit.svg'
import './icon.css'

export const EditIcon = () => {
  return (
    <div className='flex flex-col edit'>
        <Edit/>
        <div>Edit</div>
    </div>
  )
}
