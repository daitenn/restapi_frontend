import React from 'react'
import { ReactComponent as Cancel } from '../../assets/cancel.svg'
import './icon.css'

export const CancelIcon = () => {
  return (
    <div>
        <Cancel className='cancel-icon'/>
        <div className='cancel-title'>cancel</div>
    </div>
  )
}
export const CancelIconBody = () => {
    return (
        <div>
            <Cancel className='cancel-icon-body'/>
            <div className='cancel-body'>cancel</div>
        </div>
      )
}
