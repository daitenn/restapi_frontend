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
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  const handleItemClick = (id: number) => {
    setSelectedItem(id)
  }

  return (
    <>
      <div className={selectedItem == id ? 'item-select' : 'item-noSelect'}>
        <div className="item">
          <li
            className="item-title"
            onClick={() => {
              handleItemClick(id)
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
