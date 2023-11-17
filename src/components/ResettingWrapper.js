import React from 'react'
import Button from './Button'

const ResettingWrapper = ({ dispatch, btnRef }) => {
  return (
    <>
      <div className='px-5 mx-3 mt-0'>
        <h1 className='my-auto text-xl font-bold text-center'>
          Are you sure you want to reset the assessment?
        </h1>
      </div>
      <div className='p-4 mt-4 flex justify-center'>
        <Button className='mr-4' onClick={() => dispatch({ type: 'cancel' })}>
          Cancel
        </Button>
        <Button
          type='danger'
          ref={btnRef && btnRef}
          onClick={() => {
            dispatch({ type: 'reset' })
          }}
        >
          Reset
        </Button>
      </div>
    </>
  )
}

export default ResettingWrapper
