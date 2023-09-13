import { FormEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import useStore from '../../store'
import { useQueryContents } from '../../hooks/useQueryContent'
import { useMutateContent } from '../../hooks/useMutateContent'
import { ContentItem } from '../ContentStore/contentItem'
import './main.css'
import { useState } from 'react'
import { EditIcon, EditIconMain, EditIconTitle } from '../Icon/EditIcon'
import { SaveIcon, SaveIconBody } from '../Icon/SaveIcon'
import { CancelIcon, CancelIconBody } from '../Icon/CancelIcon'

export const Main = () => {
  const queryClient = useQueryClient()
  const { editedContent } = useStore()
  const updateTask = useStore((state) => state.updateEditedContent)
  const { data, isLoading } = useQueryContents()
  const { createContentMutation, updateContentMutation } = useMutateContent()
  const [stateTitle, setStateTitle] = useState('')
  const [stateBody, setStateBody] = useState('')
  const [inputTitleFlag, setInputTitleFlag] = useState<boolean>(false)
  const [inputBodyFlag, setInputBodyFlag] = useState<boolean>(false)
  const [editedContentValue, setEditedContentValue] = useState('')
  const [initialTitle, setInitialTitle] = useState(editedContent.title)

  const submitTaskHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedContent.id === 0)
      createContentMutation.mutate({
        title: editedContent.title,
        body: editedContent.body,
      })
    else {
      updateContentMutation.mutate(editedContent)
    }
  }

  const handleInput1 = () => {
    setInputTitleFlag(!inputTitleFlag)
  }
  const handleInput2 = () => {
    setInputBodyFlag(!inputBodyFlag)
  }

  // const handleInputChange = () => {
  //   e.preventDefault()
  // }

  const handleInputCancel = () => {
    setEditedContentValue(editedContent.title)
    setInputTitleFlag(!inputTitleFlag)
  }

  return (
    <>
      {/* main-header */}
      <div className="header-main">
        <div className="header-title">{editedContent.title}</div>
      </div>
      {inputTitleFlag ? (
        <>
          <form onSubmit={submitTaskHandler}>
            <div className="header-main-input">
              <input
                className="header-title-input"
                placeholder="title ?"
                type="text"
                onChange={(e) => {
                  updateTask({ ...editedContent, title: e.target.value })
                }}
                value={editedContent.title}
              />
            </div>
            <button className="save-main-title" onClick={handleInput1}>
              <SaveIcon />
            </button>
          </form>

          <div className="cancel-main-title" onClick={handleInputCancel}>
            <CancelIcon />
          </div>
        </>
      ) : (
        <>
          <div className="main-edit1" onClick={handleInput1}>
            <EditIconTitle />
          </div>
        </>
      )}

      {/* main-body */}
      <div>
        {inputBodyFlag ? (
          <>
            <form onSubmit={submitTaskHandler}>
              <div className="body-parent-input">
                <textarea
                  cols={53}
                  className="body-child-input"
                  placeholder="body ?"
                  onChange={(e) => {
                    setStateBody(e.target.value)
                    updateTask({ ...editedContent, body: e.target.value })
                  }}
                  value={editedContent.body}
                ></textarea>
              </div>
            </form>

            <div className="cancel-main-body" onClick={handleInput2}>
              <CancelIconBody />
            </div>
            <div className="save-main-body">
              <SaveIconBody />
            </div>
          </>
        ) : (
          <>
            <div className="body-parent">
              <div className="body-child">{editedContent.body}</div>
            </div>
            <div className="main-edit2" onClick={handleInput2}>
              <EditIconMain />
            </div>
          </>
        )}
      </div>

      {/* {!inputTitleFlag ? (
        <>
          <div className="flex">
            <div className="w-screen mb-3 mr-3 px-3 py-2 border border-gray-300 title">
              {editedContent.title}
            </div>
            <button
              className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
              disabled={!editedContent.title}
            >
              {editedContent.id === 0 ? 'Create' : 'Update'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex">
            <form onSubmit={submitTaskHandler} className="flex">
              <input
                className="w-screen mb-3 mr-3 px-3 py-2 border border-gray-300 title"
                placeholder="title ?"
                type="text"
                onChange={(e) => {
                  setStateTitle(e.target.value)
                  updateTask({ ...editedContent, title: e.target.value })
                }}
                readOnly
                value={editedContent.title}
              />
              <button
                className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
                disabled={!editedContent.title}
              >
                {editedContent.id === 0 ? 'Create' : 'Update'}
              </button>
            </form>
          </div>
        </>
      )}
      {!inputBodyFlag ? (
        <>
          <div className="flex">
            <div className="h-screen w-screen mb-3 mr-3 px-3 py-2 border border-gray-300 main">
              {editedContent.body}
            </div>
            <EditIcon/>
          </div>
        </>
      ) : (
        <form onSubmit={submitTaskHandler} className="flex">
          <textarea
            cols={53}
            className="h-screen w-screen mb-3 mr-3 px-3 py-2 border border-gray-300 main"
            placeholder="body ?"
            onChange={(e) => {
              setStateBody(e.target.value)
              updateTask({ ...editedContent, body: e.target.value })
            }}
            readOnly
            value={editedContent.body}
          ></textarea>

          <button
            className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
            disabled={!editedContent.body}
          >
            {editedContent.id === 0 ? 'Create' : 'Update'}
          </button>
        </form>
      )} */}
      {/* <form onSubmit={submitTaskHandler} className="flex">
        <input
          className="w-screen mb-3 mr-3 px-3 py-2 border border-gray-300 title"
          placeholder="title ?"
          type="text"
          onChange={(e) => {
            setStateTitle(e.target.value)
            updateTask({ ...editedContent, title: e.target.value })
          }}
          readOnly
          value={editedContent.title}
        />
        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedContent.title}
        >
          {editedContent.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>

      <form onSubmit={submitTaskHandler} className="flex">
        <textarea
          cols={53}
          className="h-screen w-screen mb-3 mr-3 px-3 py-2 border border-gray-300 main"
          placeholder="body ?"
          onChange={(e) => {
            setStateBody(e.target.value)
            updateTask({ ...editedContent, body: e.target.value })
          }}
          readOnly
          value={editedContent.body}
        ></textarea>

        <button
          className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedContent.body}
        >
          {editedContent.id === 0 ? 'Create' : 'Update'}
        </button>
      </form> */}
    </>
  )
}
