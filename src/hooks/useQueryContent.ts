import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ContentType } from '../api/model'
import { useState } from 'react'
import { useAsync } from 'react-use'
import { contentFactory } from '../api/factory/content_factory'

export const useQueryContents = () => {
  const [contents, setContents] = useState<ContentType[]>([])

  // factoryMethod
  const getContents = async () => {
    const data = contentFactory().index()
    return data
  }
  // cacheを効かせる
  return useQuery<ContentType[], Error>({
    queryKey: ['contents'],
    queryFn: getContents,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        console.log(err.response.data.message)
      } else {
        console.log(err.response.data)
      }
    },
  })
}
