import React from 'react'
import { ReactComponent as Edit } from '../../assets/edit.svg'
import './icon.css'

export const EditIcon = () => {
  return (
    <div className="edit">
      <Edit className="icon" />
      <div className="edit-title">Edit</div>
    </div>
  )
}
export const EditIconTitle = () => {
  return (
    <div>
      <Edit className="iconMainTitle" />
      <div className="edit-main-title">Edit</div>
    </div>
  )
}

export const EditIconMain = () => {
  return (
    <div>
      <Edit className="iconMainBody" />
      <div className="edit-main-body">Edit</div>
    </div>
  )
}
