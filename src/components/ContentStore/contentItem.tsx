import { FC, memo, useState } from 'react'
import useStore from '../../store'
import { useBooleanState } from '../../store'
import { ContentType } from '../../api/model'
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
  const [selectedItem, setSelectedItem] = useState<boolean>(false)

  const handleItemClick = () => {
    setSelectedItem(!selectedItem)
  }

  return (
    <>
      <div className={selectedItem ? 'item-select' : 'item-noSelect'}>
        <div className="item">
          <li
            className="item-title"
            onClick={() => {
              handleItemClick()
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
      </div>

      {isValid ? (
        <div className="delete-icon-parent">
          <div
            className="delete-icon-${id}"
            onClick={() => {
              deleteContentMutation.mutate(id)
            }}
          >
            <DeleteIcon />
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </>
  )
}
export const ContentItem = memo(ContentItemMemo)
