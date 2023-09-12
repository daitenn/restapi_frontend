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
      <div className='item border'>
        <li
          className="item-title border"
          onClick={() => {
            updateContent({
              title: title,
              body: body,
              id: id,
            })
          }}
        >
          {title}
        </li>
      </div>

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
