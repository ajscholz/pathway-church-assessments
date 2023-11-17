import React from 'react'

const PresentationFooter = ({ children }) => {
  return (
    <footer className='border border-t-2 border-l-0 border-r-0 border-b-0 mt-12 p-4 flex justify-end text-center'>
      {children}
    </footer>
  )
}

export default PresentationFooter
