"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface ErrorState {
  error: Error | null
  isLoading: boolean
}

export function useErrorHandler() {
  const [errorState, setErrorState] = useState<ErrorState>({ error: null, isLoading: false })
  const { toast } = useToast()

  const handleError = useCallback(
    (error: Error | string, showToast = true) => {
      const errorObj = typeof error === "string" ? new Error(error) : error

      console.error("[v0] Error handled:", errorObj)
      setErrorState({ error: errorObj, isLoading: false })

      if (showToast) {
        toast({
          title: "Error",
          description: errorObj.message || "An unexpected error occurred",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const clearError = useCallback(() => {
    setErrorState({ error: null, isLoading: false })
  }, [])

  const executeAsync = useCallback(
    async (
      asyncFn: () => Promise<any>,
      options?: {
        loadingMessage?: string
        successMessage?: string
        showToast?: boolean
      },
    ): Promise<any | null> => {
      try {
        setErrorState({ error: null, isLoading: true })

        if (options?.loadingMessage && options.showToast !== false) {
          toast({
            title: "Loading",
            description: options.loadingMessage,
          })
        }

        const result = await asyncFn()

        setErrorState({ error: null, isLoading: false })

        if (options?.successMessage && options.showToast !== false) {
          toast({
            title: "Success",
            description: options.successMessage,
          })
        }

        return result
      } catch (error) {
        handleError(error as Error, options?.showToast !== false)
        return null
      }
    },
    [handleError, toast],
  )

  return {
    error: errorState.error,
    isLoading: errorState.isLoading,
    handleError,
    clearError,
    executeAsync,
  }
}
