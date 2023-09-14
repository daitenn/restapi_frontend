import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL
// 共通ヘッダー
const headers = {
  'Content-Type': 'application/json',
}
// axiosの初期設定
export const ApiClient = axios.create({ baseURL, headers })

// レスポンスのエラー判定処理
ApiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log(error)
    switch (error?.response?.status) {
      case 401:
        break
      case 404:
        break
      default:
        console.log('== internal server error')
    }

    const errorMessage = (error.response?.data?.message || '').split(',')
    throw new Error(errorMessage)
  }
)
