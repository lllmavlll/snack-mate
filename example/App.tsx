import React from 'react'
import { SnackMateProvider, SnackMateContainer, useSnackMate } from '../src'

function DemoComponent() {
  const { success, error, warning, info, showSnack, clearSnacks } = useSnackMate()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">SnackMate Demo</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Notifications</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => success('Operation completed successfully!')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Success
            </button>
            <button
              onClick={() => error('Something went wrong!')}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Error
            </button>
            <button
              onClick={() => warning('Please check your input!')}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
            >
              Warning
            </button>
            <button
              onClick={() => info('Here is some information!')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Info
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Advanced Examples</h2>
          <div className="space-y-4">
            <button
              onClick={() => showSnack('Custom position: top-center', 'info', {
                position: 'top-center',
                duration: 3000
              })}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors w-full"
            >
              Top Center (3s duration)
            </button>
            
            <button
              onClick={() => showSnack('This will stay until you close it', 'warning', {
                duration: 0,
                position: 'bottom-left'
              })}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors w-full"
            >
              Persistent Warning (bottom-left)
            </button>

            <button
              onClick={() => {
                success('First notification')
                setTimeout(() => error('Second notification'), 500)
                setTimeout(() => warning('Third notification'), 1000)
              }}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors w-full"
            >
              Show Multiple Notifications
            </button>

            <button
              onClick={clearSnacks}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full"
            >
              Clear All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <SnackMateProvider
      defaultPosition="bottom-right"
      defaultDuration={5000}
      maxSnacks={5}
    >
      <DemoComponent />
      <SnackMateContainer />
    </SnackMateProvider>
  )
}

export default App 