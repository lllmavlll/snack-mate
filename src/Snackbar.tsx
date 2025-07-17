import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Snack, SnackType, SnackPosition } from './types'

interface SnackbarProps {
  snack: Snack
  onClose: (id: string) => void
}

const getTypeStyles = (type: SnackType) => {
  switch (type) {
    case 'success':
      return 'bg-green-500 text-white border-green-600'
    case 'error':
      return 'bg-red-500 text-white border-red-600'
    case 'warning':
      return 'bg-yellow-500 text-white border-yellow-600'
    case 'info':
      return 'bg-blue-500 text-white border-blue-600'
    default:
      return 'bg-gray-500 text-white border-gray-600'
  }
}

const getPositionStyles = (position: SnackPosition) => {
  switch (position) {
    case 'top-left':
      return 'top-4 left-4'
    case 'top-right':
      return 'top-4 right-4'
    case 'top-center':
      return 'top-4 left-1/2 transform -translate-x-1/2'
    case 'bottom-left':
      return 'bottom-4 left-4'
    case 'bottom-right':
      return 'bottom-4 right-4'
    case 'bottom-center':
      return 'bottom-4 left-1/2 transform -translate-x-1/2'
    default:
      return 'bottom-4 right-4'
  }
}

const getIcon = (type: SnackType) => {
  switch (type) {
    case 'success':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    case 'error':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      )
    case 'warning':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    case 'info':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      )
    default:
      return null
  }
}

export const Snackbar: React.FC<SnackbarProps> = ({ snack, onClose }) => {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (snack.duration && snack.duration > 0) {
      timeoutRef.current = setTimeout(() => {
        onClose(snack.id)
      }, snack.duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [snack.duration, snack.id, onClose])

  const handleClose = () => {
    onClose(snack.id)
    snack.onClose?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed z-50 max-w-sm w-full ${getPositionStyles(snack.position || 'bottom-right')}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={`rounded-lg shadow-lg border p-4 ${getTypeStyles(snack.type)}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            {getIcon(snack.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{snack.message}</p>
          </div>
          <div className="flex-shrink-0 ml-3">
            <button
              onClick={handleClose}
              className="inline-flex text-white hover:text-gray-200 focus:outline-none focus:text-gray-200 transition-colors duration-200"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 