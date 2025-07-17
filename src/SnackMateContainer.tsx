import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Snackbar } from './Snackbar'
import { useSnackMateContext } from './context'

export const SnackMateContainer: React.FC = () => {
  const { snacks, removeSnack } = useSnackMateContext()

  return (
    <AnimatePresence>
      {snacks.map((snack) => (
        <Snackbar
          key={snack.id}
          snack={snack}
          onClose={removeSnack}
        />
      ))}
    </AnimatePresence>
  )
} 