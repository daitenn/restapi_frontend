import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ContentType } from '../types'


export const useQueryContents = () => {
  const getContents = async () => {
    const { data } = await axios.get<ContentType[]>(
      `${process.env.REACT_APP_API_URL}/content`,
    )
    return data
  }
  // cacheを効かせる
  return useQuery<ContentType[], Error>({
    queryKey: ['contents'],
    queryFn: getContents,
    staleTime: Infinity,
    onError: (err : any) => {
        if (err.response.data.message) {
            console.log(err.response.data.message)
          } else {
            console.log(err.response.data)
          }
    }
  })
}