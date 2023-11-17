import React from 'react'

const SpiritualGiftsResults = ({ display }) => (
  <div className='flex flex-col items-center justify-center h-full w-full'>
    <div className='flex flex-col items-center justify-center w-full text-center'>
      {display.length > 5 ? (
        <>
          <p className='text-2xl text-slate-900'>
            Your scores show five or more primary gifts
          </p>
          <p className='mt-3 text-slate-700'>
            We recommend retaking the assessment again, and being more selective
            to narrow your results.
          </p>
        </>
      ) : (
        <p className='text-2xl text-slate-900'>Your top gifts:</p>
      )}
      <ul className='mt-6 space-y-5 ml-0 list-disc text-left text-slate-700'>
        {display.map((gift, i) =>
          i < 5 ? (
            <li key={gift.gift} className=''>
              <span
              // href={`${gift.link}`}
              // target='_blank'
              // rel='noopener noreferrer'
              >
                {gift.gift}
              </span>
              : {gift.perc}
            </li>
          ) : null
        )}
      </ul>
    </div>
  </div>
)

export default SpiritualGiftsResults
