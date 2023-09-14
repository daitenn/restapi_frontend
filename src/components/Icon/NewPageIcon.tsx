import React from 'react'
import { ReactComponent as NewIcon } from '../../assets/+.svg'
import './icon.css'

export const NewPageIcon = () => {
  return (
    <div className="">
      <NewIcon className="new-icon" />
      <a className="new-title">New page</a>
    </div>
  )
}
