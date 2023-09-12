import React from 'react'
import '../Icon/icon.css'
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg'
import { EditIcon } from '../Icon/EditIcon'
import { NewPageIcon } from '../Icon/NewPageIcon'
import { useState } from 'react'
import { DoneIcon } from '../Icon/DoneIcon'
import './bottom.css'

export const Bottombar = () => {
  const [isItemVisible, setIsItemVisible] = useState(false)

  // EditIconをクリックしたときにNewPageIconを表示する関数
  const handleEditIconClick = () => {
    setIsItemVisible(!isItemVisible)
  }
  return (
    <div className="flex border ml-10 mr-10">
      {isItemVisible ? (
        <>
          <div className='flex'>
            <NewPageIcon />
            <div className="child" onClick={handleEditIconClick}>
              <DoneIcon />
            </div>
          </div>
        </>
      ) : (
        <div className="edit" onClick={handleEditIconClick}>
          <EditIcon />
        </div>
      )}
    </div>
  )
}
