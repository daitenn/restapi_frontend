import { ReactComponent as LogoIcon } from '../../assets/logo.svg'
import './sidebar.css'
import { useQueryContents } from '../../hooks/useQueryContent'
import { EditIcon } from '../Icon/EditIcon'
import { NewPageIcon } from '../Icon/NewPageIcon'
import { DoneIcon } from '../Icon/DoneIcon'
import { useState } from 'react'

import { ContentItem } from '../ContentStore/contentItem'
import useStore from '../../store'
import { useBooleanState } from '../../store'
import { useMutateContent } from '../../hooks/useMutateContent'
import { DeleteIcon } from '../Icon/DeleteIcon'

const Sidebar = () => {
  const { data, isLoading } = useQueryContents()
  const { createContentMutation } = useMutateContent()
  const [isItemVisible, setIsItemVisible] = useState(false)
  const { isValid, toggleValid } = useBooleanState()

  // EditIconをクリックしたときにNewPageIconを表示する関数
  const handleEditIconClick = () => {
    setIsItemVisible(!isItemVisible)
    toggleValid(true)
  }

  const handleDoneIconClick = () => {
    setIsItemVisible(!isItemVisible)
    toggleValid(false)
  }

  const handleNewPage = () => {
    createContentMutation.mutate({
      title: 'タイトル',
      body: 'コンテンツ',
    })
  }

  return (
    <>
      <div className="sidebar">
        {isLoading ? (
          <p></p>
        ) : (
          <>
            <div>
              <div className="header flex">
                <LogoIcon className="logo" />
                <a className="title">ServiceName</a>
              </div>
              <ul className="body">
                {data?.map((val) => (
                  <>
                    <div className="flex list">
                      <ContentItem
                        key={val.id}
                        id={val.id}
                        title={val.title}
                        body={val.body}
                      />
                    </div>
                  </>
                ))}
              </ul>
              {!isItemVisible ? (
                <>
                  <div className="sidebar-bottom">
                    <div className="edit-icon" onClick={handleEditIconClick}>
                      <EditIcon />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="sidebar-bottom">
                    <div className="done-icon" onClick={handleDoneIconClick}>
                      <DoneIcon />
                    </div>
                    <div className="newPage-icon" onClick={handleNewPage}>
                      <NewPageIcon />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
export default Sidebar

{
  /* <div className='flex flex-col'>
        {isLoading ? (
          <p></p>
        ) : (
          <div className="ml-10 pr-2.5 mr-10 border head">
            <div className="flex title">
              <LogoIcon />
              <a className="text-2xl">ServiceName</a>
            </div>
            <div className="">
              <ul className="mt-5 border">
                {data?.map((val) => (
                  <>
                    <div className="flex list">
                      <ContentItem
                        key={val.id}
                        id={val.id}
                        title={val.title}
                        body={val.body}
                      />
                      <DeleteIcon className="delete-icon" />
                    </div>
                  </>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div> */
}
