import React from 'react'

const ContentWrapper = ({ type, children, view }) => {
  return (
    <main className='w-full md:w-11/12 lg:w-3/4 xl:w-1/2 mx-auto flex justify-center flex-col items-center text-center'>
      <h1 className='text-2xl sm:text-3xl'>
        {type === 'MBTI'
          ? 'Myers Briggs Assessment'
          : 'Spritual Gifts Assessment'}
      </h1>
      {view === 'assessing' && (
        <p className='text-sm sm:text-base mt-3 sm:mt-6 text-slate-600'>
          Please choose the option that is <em>most</em> true of you.
        </p>
      )}
      <div className='mt-12 sm:mt-24 w-full min-w-full'>{children}</div>
    </main>
  )
}

export default ContentWrapper
