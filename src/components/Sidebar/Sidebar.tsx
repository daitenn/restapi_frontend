import { ReactComponent as LogoIcon } from '../../assets/logo.svg'
import './sidebar.css'
import { useQueryContents } from '../../hooks/useQueryContent'
import { EditIcon } from '../Icon/EditIcon'
import { NewPageIcon } from '../Icon/NewPageIcon'
import { DoneIcon } from '../Icon/DoneIcon'
import { useState } from 'react'

import { ContentItem } from '../contentItem'
import useStore from '../../store'
import { useBooleanState } from '../../store'

const Sidebar = () => {
  const { data, isLoading } = useQueryContents()
  const updateContent = useStore((state) => state.updateEditedContent)
  const [isItemVisible, setIsItemVisible] = useState(false)
  const updateFlag = useBooleanState((state) => state.toggleValid)

  // EditIconをクリックしたときにNewPageIconを表示する関数
  const handleEditIconClick = () => {
    setIsItemVisible(!isItemVisible)
    updateFlag(true)
  }

  const handleTrashIconClick = () => {
    setIsItemVisible(!isItemVisible)
    updateFlag(false)
  }

  return (
    <>
      <div className="flex-col">
        {isLoading ? (
          <p></p>
        ) : (
          <>
            <div className="ml-10">
              <div className="flex border header container">
                <LogoIcon />
                <a className="">ServiceName</a>
              </div>
              <ul className="mt-5 border container body">
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
              <div className="flex border container">
                {isItemVisible ? (
                  <>
                    <div className="flex">
                      <div className="newPage border mr-10">
                        <NewPageIcon />
                      </div>
                      <div
                        className="done border"
                        onClick={handleTrashIconClick}
                      >
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
