# SnackMate 🍪

A minimal, accessible React snackbar/toast notification system built with TypeScript, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Beautiful Animations** - Smooth enter/exit animations with Framer Motion
- ♿ **Accessible** - Full keyboard navigation and ARIA support
- 🎯 **TypeScript** - Fully typed with excellent developer experience
- 🎨 **Tailwind CSS** - Modern styling with utility classes
- 🔧 **Customizable** - Multiple positions, types, and durations
- 🚀 **Lightweight** - Zero runtime dependencies beyond React
- 📱 **Responsive** - Works great on all screen sizes

## Installation

```bash
npm install snack-mate
```

## Quick Start

### 1. Wrap your app with the provider

```tsx
import { SnackMateProvider, SnackMateContainer } from 'snack-mate'

function App() {
  return (
    <SnackMateProvider>
      <YourApp />
      <SnackMateContainer />
    </SnackMateProvider>
  )
}
```

### 2. Use the hook to show notifications

```tsx
import { useSnackMate } from 'snack-mate'

function MyComponent() {
  const { success, error, warning, info } = useSnackMate()

  const handleSuccess = () => {
    success('Operation completed successfully!')
  }

  const handleError = () => {
    error('Something went wrong!')
  }

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  )
}
```

## API Reference

### SnackMateProvider

The context provider that manages snackbar state.

```tsx
<SnackMateProvider
  defaultPosition="bottom-right"
  defaultDuration={5000}
  maxSnacks={5}
>
  {children}
</SnackMateProvider>
```

**Props:**
- `defaultPosition` - Default position for snackbars (default: `'bottom-right'`)
- `defaultDuration` - Default auto-dismiss duration in ms (default: `5000`)
- `maxSnacks` - Maximum number of snackbars to show at once (default: `5`)

### useSnackMate Hook

Returns methods to trigger different types of notifications.

```tsx
const {
  showSnack,
  success,
  error,
  warning,
  info,
  removeSnack,
  clearSnacks
} = useSnackMate()
```

**Methods:**
- `showSnack(message, type, options)` - Show a custom snackbar
- `success(message, options)` - Show a success notification
- `error(message, options)` - Show an error notification
- `warning(message, options)` - Show a warning notification
- `info(message, options)` - Show an info notification
- `removeSnack(id)` - Remove a specific snackbar
- `clearSnacks()` - Remove all snackbars

### Snack Types

- `'success'` - Green notification with checkmark icon
- `'error'` - Red notification with X icon
- `'warning'` - Yellow notification with warning icon
- `'info'` - Blue notification with info icon

### Positions

- `'top-left'` - Top left corner
- `'top-right'` - Top right corner
- `'top-center'` - Top center
- `'bottom-left'` - Bottom left corner
- `'bottom-right'` - Bottom right corner (default)
- `'bottom-center'` - Bottom center

## Advanced Usage

### Custom Snackbar with Options

```tsx
const { showSnack } = useSnackMate()

showSnack('Custom message', 'info', {
  duration: 3000,
  position: 'top-center',
  onClose: () => console.log('Snackbar closed')
})
```

### Manual Control

```tsx
const { showSnack, removeSnack, clearSnacks } = useSnackMate()

// Show a persistent snackbar (no auto-dismiss)
showSnack('This will stay until manually closed', 'info', {
  duration: 0
})

// Remove all snackbars
clearSnacks()
```

### Keyboard Accessibility

- Press `Escape` to dismiss the focused snackbar
- All snackbars are focusable and have proper ARIA attributes

## Styling

SnackMate uses Tailwind CSS for styling. The component includes:

- Responsive design
- Dark mode support (via Tailwind's dark mode)
- Smooth animations
- Proper spacing and typography
- Accessible color contrast

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Development mode with watch
npm run dev

# Type checking
npm run type-check
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
