import React from 'react'
import Button from './Button'

const AssessmentWrapper = ({
  question,

  dispatch,
  activeQ,
  length,
  resetBtn,
  nextBtn,
  handleNext,
  children,
}) => {
  return (
    <>
      <div>
        <div>
          <p className='text-lg sm:text-xl text-slate-700'>
            {question.question}
          </p>
        </div>
        <div className='mt-6 flex flex-col items-center'>{children}</div>
      </div>
      <footer className='border border-t-2 border-l-0 border-r-0 border-b-0 mt-12 p-4 flex items-center justify-content-between text-center'>
        <p className='text-xs sm:text-sm mr-auto text-slate-500'>
          {activeQ} of {length}
        </p>
        <Button
          type='danger'
          className='mr-4'
          ref={resetBtn}
          onClick={() => dispatch({ type: 'confirm reset' })}
        >
          Reset
        </Button>
        <Button
          type='go'
          ref={nextBtn}
          onClick={() => handleNext()}
          // disabled={selected === null}
        >
          {activeQ === length ? 'Get Results' : 'Next'}
        </Button>
      </footer>
    </>
  )
}

export default AssessmentWrapper
