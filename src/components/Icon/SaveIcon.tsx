import React from 'react'
import { ReactComponent as Save } from '../../assets/save.svg'
import './icon.css'

export const SaveIcon = () => {
  return (
    <div>
      <Save className="save-icon" />
      <div className="save-title">save</div>
    </div>
  )
}

export const SaveIconBody = () => {
  return (
    <div>
      <Save className="save-icon-body" />
      <div className="save-body">save</div>
    </div>
  )
}
