import React from 'react'
import { Link } from 'gatsby-link'
import { Popover, Transition } from '@headlessui/react'
import FocusTrap from 'focus-trap-react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Layout = ({ children }) => {
  return (
    <FocusTrap className='bg-slate-50 min-h-screen'>
      <div>
        <header>
          <CustomPopover />
        </header>
        <div className='px-6 sm:px-10 md:px-12 mt-12 w-full'>{children}</div>
      </div>
    </FocusTrap>
  )
}

export default Layout

const CustomPopover = () => {
  return (
    <Popover className='relative bg-slate-700 text-slate-50'>
      <div
        className='pointer-events-none absolute inset-0 z-30 shadow'
        aria-hidden='true'
      />
      <div className='relative z-20'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8 sm:py-12 lg:px-8'>
          <div className='md:mr-auto'>
            <h1 className='text-xl md:text-4xl font-bold hover:text-gray-400'>
              <Link to='/'>City North Assessments</Link>
            </h1>
          </div>
          <div className='-my-2 -mr-2 md:hidden'>
            <Popover.Button className='inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-700 hover:bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500'>
              <span className='sr-only'>Open menu</span>
              <Bars3Icon className='h-6 w-6' aria-hidden='true' />
            </Popover.Button>
          </div>
          <div className='hidden md:flex md:items-center md:justify-between'>
            <Popover.Group as='nav' className='flex space-x-10'>
              <Link
                to='/myers-briggs'
                className='text-base font-medium hover:text-gray-400'
              >
                Myers Briggs
              </Link>
              <Link
                to='/spiritual-gifts'
                className='text-base font-medium hover:text-gray-400'
              >
                Spiritual Gifts
              </Link>
            </Popover.Group>
          </div>
        </div>
      </div>

      <Transition
        as={React.Fragment}
        enter='duration-200 ease-out'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='duration-100 ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <Popover.Panel
          focus
          className='absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden'
        >
          <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
            <div className='px-5 pt-5 pb-6 sm:pb-8'>
              <div className='flex items-center justify-end'>
                <div className='-mr-2'>
                  <Popover.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500'>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className='py-6 px-5'>
              <div className='grid grid-cols-1 gap-4 text-right'>
                <Link
                  to='/myers-briggs'
                  className='rounded-md text-base font-medium text-gray-700 hover:text-gray-900'
                >
                  Myers Briggs
                </Link>

                <Link
                  to='/spiritual-gifts'
                  className='rounded-md text-base font-medium text-gray-700 hover:text-gray-900'
                >
                  Spiritual Gifts
                </Link>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
