import React, { createContext, useContext, useState, useCallback } from 'react'
import { SnackMateContextType, SnackMateProviderProps, Snack } from './types'

const SnackMateContext = createContext<SnackMateContextType | undefined>(undefined)

export const SnackMateProvider: React.FC<SnackMateProviderProps> = ({
  children,
  defaultPosition = 'bottom-right',
  defaultDuration = 5000,
  maxSnacks = 5
}) => {
  const [snacks, setSnacks] = useState<Snack[]>([])

  const addSnack = useCallback((snack: Omit<Snack, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newSnack: Snack = {
      ...snack,
      id,
      position: snack.position || defaultPosition,
      duration: snack.duration ?? defaultDuration
    }

    setSnacks(prev => {
      const updated = [...prev, newSnack]
      return updated.slice(-maxSnacks)
    })
  }, [defaultPosition, defaultDuration, maxSnacks])

  const removeSnack = useCallback((id: string) => {
    setSnacks(prev => prev.filter(snack => snack.id !== id))
  }, [])

  const clearSnacks = useCallback(() => {
    setSnacks([])
  }, [])

  const value: SnackMateContextType = {
    snacks,
    addSnack,
    removeSnack,
    clearSnacks
  }

  return (
    <SnackMateContext.Provider value={value}>
      {children}
    </SnackMateContext.Provider>
  )
}

export const useSnackMateContext = (): SnackMateContextType => {
  const context = useContext(SnackMateContext)
  if (context === undefined) {
    throw new Error('useSnackMateContext must be used within a SnackMateProvider')
  }
  return context
} 