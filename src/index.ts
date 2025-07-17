// Main exports
export { SnackMateProvider } from './context'
export { useSnackMate } from './hooks/useSnackMate'
export { SnackMateContainer } from './SnackMateContainer'

// Type exports
export type {
  SnackType,
  SnackPosition,
  Snack,
  SnackMateContextType,
  SnackMateProviderProps
} from './types'

// Component exports (for advanced usage)
export { Snackbar } from './Snackbar' 