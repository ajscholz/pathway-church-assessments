import React from 'react'
import {
  CheckCircleIcon,
  ArrowPathIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'

const Alert = ({ status, children }) => {
  return (
    <div>
      <div
        className={`transition-colors duration-500 rounded-md p-4 ${
          status === true
            ? 'bg-green-100'
            : status === false
            ? 'bg-red-100'
            : 'bg-slate-100'
        }`}
      >
        <div className='flex justify-center'>
          <div className='relative flex-shrink-0'>
            <div className='h-5 w-5' />
            <Transition
              as={ArrowPathIcon}
              show={status === null}
              leave='transition-opacity duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
              className='absolute inset-0 animate-spin h-5 w-5 text-slate-400'
              aria-hidden='true'
            />
            <Transition
              as={CheckCircleIcon}
              show={status === true}
              enter='transition-opacity duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              className={`absolute inset-0 h-5 w-5 text-green-400`}
              aria-hidden='true'
            />
            <Transition
              as={XCircleIcon}
              show={status === false}
              enter='transition-opacity duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              className={`absolute inset-0 h-5 w-5 text-red-400`}
              aria-hidden='true'
            />
          </div>
          <div className='ml-3'>
            <div
              className={`transition-colors duration-500 text-sm font-medium ${
                status === true
                  ? 'text-green-800'
                  : status === false
                  ? 'text-red-800'
                  : 'text-slate-800'
              }`}
            >
              {status === true
                ? children[0]
                : status === false
                ? children[1]
                : children[2]}
            </div>
          </div>
          {/* <div className='ml-auto pl-3'>
             <div className='-mx-1.5 -my-1.5'>
              <button
                type='button'
                className={`inline-flex rounded-md p-1.5 ${
                  status === true
                    ? 'bg-green-100'
                    : status === false
                    ? 'bg-red-100'
                    : 'bg-slate-100'
                } ${
                  status === true
                    ? 'text-green-500'
                    : status === false
                    ? 'text-red-500'
                    : 'text-slate-500'
                } ${
                  status === true
                    ? 'hover:bg-green-200'
                    : status === false
                    ? 'hover:bg-red-200'
                    : 'hover:bg-slate-200'
                } focus:outline-none focus:ring-2 ${
                  status === true
                    ? 'focus:ring-green-600'
                    : status === false
                    ? 'focus:ring-red-600'
                    : 'focus:ring-slate-600'
                } focus:ring-offset-2 ${
                  status === true
                    ? 'focus:ring-offset-green-100'
                    : status === false
                    ? 'focus:ring-offset-red-100'
                    : 'focus:ring-offset-slate-100'
                }`}
              >
                <span className='sr-only'>Dismiss</span>
                <XMarkIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div> 
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Alert
