import { useState } from 'react'

export const useFetching = <G>(callback: (data?: G) => Promise<unknown>) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetch = async (data?: G) => {
    try {
      setIsLoading(true)
      await callback(data)
    } catch (e) {
      setError((<Error>e).message)
    } finally {
      setIsLoading(false)
    }
  }

  return { fetch, isLoading, error }
}
