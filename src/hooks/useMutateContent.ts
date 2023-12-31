import { useMutation, useQueryClient } from '@tanstack/react-query'
import useStore from '../store'
import { ContentType } from '../api/model'
import axios from 'axios'
import { contentFactory } from '../api/factory/content_factory'

export const useMutateContent = () => {
  const queryClient = useQueryClient()
  const resetEditedContent = useStore((state) => state.resetEditedContent)

  const createContentMutation = useMutation(
    (content: Omit<ContentType, 'id' | 'createdAt' | 'updatedAt'>) =>
      // axios.post<ContentType>(`${process.env.REACT_APP_API_URL}/content`, content),
      contentFactory().post(content),
    {
      onSuccess: (res) => {
        const previousContents = queryClient.getQueryData<ContentType[]>([
          'contents',
        ])
        if (previousContents) {
          queryClient.setQueryData(
            ['contents'],
            [...previousContents, res.data]
          )
        }
        resetEditedContent()
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )
  const updateContentMutation = useMutation(
    (content: Omit<ContentType, 'createdAt' | 'updatedAt'>) =>
      // axios.put<ContentType>(`${process.env.REACT_APP_API_URL}/content/${content.id}`, {
      //     title: content.title, body: content.body
      // }),
      contentFactory().update(content),
    {
      onSuccess: (res, valiables) => {
        const previousContents = queryClient.getQueryData<ContentType[]>([
          'contents',
        ])
        if (previousContents) {
          queryClient.setQueryData<ContentType[]>(
            ['contents'],
            previousContents.map((content) =>
              content.id == valiables.id ? res.data : content
            )
          )
        }
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )
  const deleteContentMutation = useMutation(
    (id: number) => contentFactory().delete(id),
    {
      onSuccess: (_, variables) => {
        const previousContent = queryClient.getQueryData<ContentType[]>([
          'contents',
        ])
        if (previousContent) {
          queryClient.setQueryData<ContentType[]>(
            ['contents'],
            previousContent.filter((content) => content.id !== variables)
          )
        }
        resetEditedContent()
      },
      onError: (err) => {
        console.log(err)
      },
    }
  )
  return {
    createContentMutation,
    updateContentMutation,
    deleteContentMutation,
  }
}
