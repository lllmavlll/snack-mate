export type SnackType = 'success' | 'error' | 'info' | 'warning'

export type SnackPosition = 
  | 'top-left' 
  | 'top-right' 
  | 'top-center' 
  | 'bottom-left' 
  | 'bottom-right' 
  | 'bottom-center'

export interface Snack {
  id: string
  message: string
  type: SnackType
  duration?: number
  position?: SnackPosition
  onClose?: () => void
}

export interface SnackMateContextType {
  snacks: Snack[]
  addSnack: (snack: Omit<Snack, 'id'>) => void
  removeSnack: (id: string) => void
  clearSnacks: () => void
}

export interface SnackMateProviderProps {
  children: React.ReactNode
  defaultPosition?: SnackPosition
  defaultDuration?: number
  maxSnacks?: number
} 