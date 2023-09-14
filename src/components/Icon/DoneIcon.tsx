import React from 'react'
import { ReactComponent as Done } from '../../assets/done.svg'

export const DoneIcon = () => {
  return (
    <div className="doned">
      <Done className="check" />
      <div className="done-title">Done</div>
    </div>
  )
}
