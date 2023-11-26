import {useState} from "react"


export const useFetching = <T>(callback: () => Promise<T>) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('');

    const fetch = async () => {
        try {
            setIsLoading(true)
            await callback()
        } catch (e) {
            setError((<Error>e).message)
        } finally{
            setIsLoading(false)
        }
    }

    return { fetch, isLoading, error }
}