import { useMutation, useQueryClient } from "@tanstack/react-query"
import useStore from "../store"
import { ContentType } from "../types"
import axios from "axios"


export const useMutateContent = () => {
    const queryClient = useQueryClient()
    const resetEditedContent = useStore((state) => state.resetEditedContent)

    const createContentMutation = useMutation(
        (content : Omit<ContentType, 'id' | 'createdAt' |  'updatedAt'>) =>
            axios.post<ContentType>(`${process.env.REACT_APP_API_URL}/content`, content),
        {
            onSuccess: (res) => {
                const previousContents = queryClient.getQueryData<ContentType[]>(['contents'])
                if (previousContents) {
                    queryClient.setQueryData(['contents'], [...previousContents, res.data])
                }
                resetEditedContent()
            },
            onError: (err) => {
                console.log(err)
            }
        }
    )
    const updateContentMutation = useMutation(
        (content: Omit<ContentType, 'createdAt' | 'updatedAt'>) =>
            axios.put<ContentType>(`${process.env.REACT_APP_API_URL}/content/${content.id}`, {
                title: content.title, body: content.body
            }),
        {
            onSuccess: (res, valiables) => {
                const previousContents = queryClient.getQueryData<ContentType[]>(['contents'])
                if (previousContents) {
                    queryClient.setQueryData<ContentType[]>(
                        ['contents'],
                        previousContents.map((content) => 
                            content.id == valiables.id ? res.data : content
                        )
                    )
                }
                resetEditedContent()
            },
            onError : (err) => {
                console.log(err)
            }
        }
    )
    const deleteContentMutation = useMutation(
        (id : number) => axios.delete(`${process.env.REACT_APP_API_URL}/content/${id}`),
        {
            onSuccess: (_, variables) => {
                const previousContent = queryClient.getQueryData<ContentType[]>(['contents'])
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
            }
        }
    )
    return {
        createContentMutation,
        updateContentMutation,
        deleteContentMutation
    }
}