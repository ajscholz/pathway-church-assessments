import React from 'react'
import { RadioGroup } from '@headlessui/react'

const options = [
  { name: 'Never', inStock: true },
  { name: 'Rarely', inStock: true },
  { name: 'Sometimes', inStock: true },
  { name: 'Often', inStock: true },
  { name: 'Always', inStock: true },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const RadioButtons = ({ currentSelection, focusNext, testing }) => {
  currentSelection.current = testing
    ? Math.floor(Math.random() * 5) + 1 - 1
    : currentSelection.current

  return (
    <div>
      <RadioGroup className='mt-12'>
        <div className='grid grid-cols-1 space-y-2 sm:space-y-0 sm:grid-cols-5 sm:space-x-2'>
          {options.map((option, i) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              onClick={(e) => {
                focusNext(e)
                currentSelection.current = i
              }}
              className={({ active, checked }) =>
                classNames(
                  active ? 'ring-2 ring-offset-2 ring-slate-500' : '',
                  checked || currentSelection.current === i
                    ? 'bg-slate-600 border-transparent text-white hover:bg-slate-700'
                    : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium capitalize sm:flex-1 cursor-pointer'
                )
              }
            >
              <RadioGroup.Label as='span'>{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>

    // <div
    //   className='mt-auto w-100'
    //   style={{
    //     display: 'grid',
    //     gridTemplateColumns: 'repeat(5, 53px)',
    //     justifyContent: 'space-between',
    //     maxWidth: '360px',
    //   }}
    // >
    //   {options.map((option, i) => (
    //     <fieldset
    //       check
    //       className='vertical d-flex justify-content-center mr-0'
    //       inline
    //       key={option}
    //     >
    //       <label check className='vertical mx-0 mt-0'>
    //         <input
    //           defaultChecked={i === currentSelection.current}
    //           defaultValue={option}
    //           id={`sgOptions${i + 1}`}
    //           name={`sg-options`}
    //           type='radio'
    //           onClick={() => {
    //             currentSelection.current = i
    //           }}
    //         />

    //         <span className='form-check-sign vertical d-flex flex-column text-muted'>
    //           <small>{option}</small>
    //         </span>
    //       </label>
    //     </fieldset>
    //   ))}
    // </div>
  )
}

export default React.memo(RadioButtons)
