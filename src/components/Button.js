import React from 'react'
import classNames from 'classnames'

const Button = React.forwardRef((props, ref) => {
  const { type, children, className, ...rest } = props
  const defaultClassNames =
    'rounded-lg px-5 py-2 drop-shadow-xl border box-border focus:ring-4 disabled:opacity-40'
  let btnClassnames

  const setClassnames = (classes) => {
    btnClassnames = classNames(classes, defaultClassNames, className)
  }

  switch (type) {
    case 'go':
      setClassnames('bg-emerald-600 border-emerald-600 text-emerald-50')
      break
    case 'danger':
      setClassnames('bg-red-600 border-red-600 text-red-50')
      break
    case 'warning':
      setClassnames('bg-yellow-600 border-yellow-600 text-yellow-50')
      break
    case 'dark':
      setClassnames('bg-primary-700 border-primary-700 text-primary-50')
      break
    case 'clear':
      setClassnames('border border-primary-900 text-primary-900 ')
      break
    default:
      setClassnames('bg-primary-300 border-primary-300 text-primary-900')
      break
  }
  return (
    <button className={btnClassnames} {...rest} ref={ref}>
      {children}
    </button>
  )
})

Button.defaultProps = {
  type: 'default',
}

export default Button
