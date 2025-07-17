import { useCallback } from 'react'
import { useSnackMateContext } from '../context'
import { SnackType, SnackPosition } from '../types'

export const useSnackMate = () => {
  const { addSnack, removeSnack, clearSnacks } = useSnackMateContext()

  const showSnack = useCallback((
    message: string,
    type: SnackType = 'info',
    options?: {
      duration?: number
      position?: SnackPosition
      onClose?: () => void
    }
  ) => {
    addSnack({
      message,
      type,
      ...options
    })
  }, [addSnack])

  const success = useCallback((message: string, options?: Parameters<typeof showSnack>[2]) => {
    showSnack(message, 'success', options)
  }, [showSnack])

  const error = useCallback((message: string, options?: Parameters<typeof showSnack>[2]) => {
    showSnack(message, 'error', options)
  }, [showSnack])

  const warning = useCallback((message: string, options?: Parameters<typeof showSnack>[2]) => {
    showSnack(message, 'warning', options)
  }, [showSnack])

  const info = useCallback((message: string, options?: Parameters<typeof showSnack>[2]) => {
    showSnack(message, 'info', options)
  }, [showSnack])

  return {
    showSnack,
    success,
    error,
    warning,
    info,
    removeSnack,
    clearSnacks
  }
} 