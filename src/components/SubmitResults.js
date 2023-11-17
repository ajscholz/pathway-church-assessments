import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Alert from './Alert'

const SubmitResults = ({ dispatch, type, results, testing }) => {
  const [state, setState] = useState({
    part: testing ? false : true,
    emailMe: true,
    name: testing ? `Andrew Scholz` : ``,
    email: testing ? `andrew@citynorth.church` : ``,
  })

  const { part, emailMe, name, email } = state
  const [submitting, setSubmitting] = useState(false)
  const [serverResponse, setServerResponse] = useState({
    cn: null,
    person: null,
  })

  // only using a ref because basing the display off state on the server response was buggy
  const serverRef = useRef({ cn: null, person: null })

  const submitForm = async (data) => {
    return await window.fetch(`../api/submitAssessment`, {
      method: `POST`,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  const submitResults = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (part === true) {
      const partResponse = await submitForm({
        name: name,
        email: email,
        to: 'cn assessments',
        type: type,
        results: results,
        testing: testing,
      })
      if (emailMe !== true) {
      }
      serverRef.current.cn = partResponse.status === 200
      setServerResponse({
        ...serverResponse,
        cn: partResponse.status === 200,
      })
    }

    if (emailMe === true) {
      const personResponse = await submitForm({
        name: name,
        email: email,
        to: 'person',
        type: type,
        results: results,
        testing: testing,
      })
      serverRef.current.person = personResponse.status === 200
      setServerResponse({
        ...serverResponse,
        person: personResponse.status === 200,
      })
    }
  }

  return (
    <>
      <div className='pb-5 content-center flex-grow-1 text-left'>
        {submitting ? (
          <>
            <h2 className='text-center text-2xl text-gray-500 font-bold mb-0'>
              Submitting Results...
            </h2>
            <div className='mt-8 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 mx-auto space-y-4'>
              {part && (
                <Alert status={serverRef.current.cn}>
                  <p>Sent to City North</p>
                  <p>Error sending to City North</p>
                  <p>Sending to City North</p>
                </Alert>
              )}

              {emailMe && (
                <Alert status={serverRef.current.person}>
                  <p>Sent to your email</p>
                  <p>Error sending to your email</p>
                  <p>Sending to your email</p>
                </Alert>
              )}
            </div>
            <footer className='border border-t-2 border-l-0 border-r-0 border-b-0 mt-12 p-4 flex justify-end text-center'>
              <Button
                onClick={() => {
                  dispatch({ type: 'present' })
                }}
              >
                Return to Results
              </Button>
            </footer>
          </>
        ) : (
          <>
            <div className='align-self-start w-100'>
              <form className='space-y-10 divide-y divide-gray-200'>
                <div className='space-y-10 divide-y divide-gray-200 sm:space-y-10'>
                  {/* 
                
                part of CN?

                */}
                  <div className='space-y-3'>
                    <div className='text-left'>
                      <h3 className='text-lg font-medium leading-6 text-gray-900'>
                        Are you part of City North?
                      </h3>
                      <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                        If so we'll send your results to our team as well.
                      </p>
                    </div>

                    {/* Options */}
                    <div className='space-y-6 divide-y divide-gray-200 sm:space-y-5'>
                      <div>
                        <div role='group' aria-labelledby='label-notifications'>
                          <div className='sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4'>
                            <div className='sm:col-span-2'>
                              <div className='max-w-lg'>
                                <div className='mt-4 space-y-4'>
                                  <div className='flex items-center'>
                                    <input
                                      id='push-everything'
                                      name='push-notifications'
                                      type='radio'
                                      defaultChecked={part && true}
                                      onClick={() =>
                                        setState({ ...state, part: true })
                                      }
                                      className='h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-500'
                                    />
                                    <label
                                      htmlFor='push-everything'
                                      className='ml-3 block text-sm font-medium text-gray-700'
                                    >
                                      Yes
                                    </label>
                                  </div>
                                  <div className='flex items-center'>
                                    <input
                                      id='push-email'
                                      name='push-notifications'
                                      type='radio'
                                      defaultChecked={!part && true}
                                      onClick={() =>
                                        setState({ ...state, part: false })
                                      }
                                      className='h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-500'
                                    />
                                    <label
                                      htmlFor='push-email'
                                      className='ml-3 block text-sm font-medium text-gray-700'
                                    >
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 
              
              send results to you?
              
              */}
                  <div className='space-y-3 pt-8 sm:pt-10'>
                    <div className='text-left'>
                      <h3 className='text-lg font-medium leading-6 text-gray-900'>
                        Would you like your results sent to your email?
                      </h3>
                      <p className='mt-1 max-w-2xl text-sm text-gray-500'>
                        If so we'll send them right away so you can reference
                        them later.
                      </p>
                    </div>

                    {/* options */}
                    <div className='space-y-6 divide-y divide-gray-200 sm:space-y-5'>
                      <div>
                        <div role='group' aria-labelledby='label-send-results'>
                          <div className='sm:grid sm:grid-cols-3 sm:items-baseline sm:gap-4'>
                            <div className='sm:col-span-2'>
                              <div className='max-w-lg'>
                                <div className='mt-4 space-y-4'>
                                  <div className='flex items-center'>
                                    <input
                                      id='send-yes'
                                      name='send-results'
                                      type='radio'
                                      defaultChecked={true}
                                      onClick={() =>
                                        setState({ ...state, emailMe: true })
                                      }
                                      className='h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-500'
                                    />
                                    <label
                                      htmlFor='send-yes'
                                      className='ml-3 block text-sm font-medium text-gray-700'
                                    >
                                      Yes
                                    </label>
                                  </div>
                                  <div className='flex items-center'>
                                    <input
                                      id='send-no'
                                      name='send-results'
                                      type='radio'
                                      onClick={() =>
                                        setState({ ...state, emailMe: false })
                                      }
                                      className='h-4 w-4 border-gray-300 text-slate-600 focus:ring-slate-500'
                                    />
                                    <label
                                      htmlFor='send-no'
                                      className='ml-3 block text-sm font-medium text-gray-700'
                                    >
                                      No
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 
              
              Name
              
              */}
                  <div className='space-y-6 sm:space-y-5 pt-8 sm:pt-10'>
                    <div className='space-y-6 sm:space-y-5'>
                      <div className='sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:items-start sm:gap-4'>
                        <label
                          htmlFor='name'
                          className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                        >
                          Name
                        </label>
                        <div className='mt-1 sm:col-span-2 sm:mt-0'>
                          <input
                            type='text'
                            name='name'
                            id='name'
                            autoComplete='given-name'
                            value={name}
                            onChange={(e) => {
                              setState({ ...state, name: e.target.value })
                            }}
                            className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:max-w-xs sm:text-sm'
                          />
                        </div>
                      </div>

                      {/* 
                  
                  Email
                  
                  */}
                      <div className='sm:grid sm:grid-cols-3 lg:grid-cols-4 sm:items-start sm:gap-4 sm:pt-0'>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                        >
                          Email address
                        </label>
                        <div className='mt-1 sm:col-span-2 sm:mt-0'>
                          <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            onChange={(e) => {
                              setState({ ...state, email: e.target.value })
                            }}
                            value={email}
                            className='block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 
            
            Submit
            
            */}
                <div className='pt-3 mt-8'>
                  <div className='flex justify-end'>
                    <Button
                      htmltype='submit'
                      type='go'
                      onClick={(e) => submitResults(e)}
                      disabled={
                        (part === true && (name === '' || email === '')) ||
                        (emailMe === true && (name === '' || email === ''))
                      }
                      // className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-slate-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2'
                    >
                      Send Results
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}

SubmitResults.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['Spiritual Gifts', 'Myers-Briggs']).isRequired,
}

export default SubmitResults
