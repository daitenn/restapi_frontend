import { FC, memo } from 'react'
import useStore from '../../store'
import { useBooleanState } from '../../store'
import { ContentType } from '../../types'
import { useMutateContent } from '../../hooks/useMutateContent'
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg'
import './contentItem.css'

const ContentItemMemo: FC<Omit<ContentType, 'createdAt' | 'updatedAt'>> = ({
  id,
  title,
  body,
}) => {
  const updateContent = useStore((state) => state.updateEditedContent)
  const { isValid } = useBooleanState()
  const { deleteContentMutation } = useMutateContent()
  return (
    <>
      <li
        className="item"
        onClick={() => {
          updateContent({
            title: title,
            body: body,
            id: id,
          })
        }}
      >
        <span className="">{title}</span>
      </li>
      {isValid ? (
        <div
          className="delete-icon"
          onClick={() => {
            deleteContentMutation.mutate(id)
          }}
        >
          <DeleteIcon className="border" />
        </div>
      ) : (
        <p></p>
      )}
    </>
  )
}
export const ContentItem = memo(ContentItemMemo)
