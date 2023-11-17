import React, { useReducer, useEffect, useRef } from 'react'
import { mbtiQuestions } from '../utils/data/assessments'
// import CloseButton from "./Buttons/CloseButton"
import MBTIResults from './MBTIResults'
import SubmitResults from './SubmitResults'
import { randomizeArray } from '../utils/functions'
// import { Link } from 'gatsby'
import Button from './Button'
import AssessmentWrapper from './AssessmentWrapper'
import PresentationWrapper from './PresentationWrapper'
import PresentationFooter from './PresentationFooter'
import ResettingWrapper from './ResettingWrapper'
import ContentWrapper from './ContentWrapper'

// variables to help me easily switch some modes on or off
const testing = false
const submitActive = true

let questions = testing
  ? [
      {
        question: 'E/I',
        options: ['Extrovert', 'Introvert'],
        type: 'E/I',
      },
      {
        question: 'E/I',
        options: ['Extrovert', 'Introvert'],
        type: 'E/I',
      },
      {
        question: 'E/I',
        options: ['Extrovert', 'Introvert'],
        type: 'E/I',
      },

      {
        question: 'S/N',
        options: ['Sensor', 'Intuitive'],
        type: 'S/N',
      },
      {
        question: 'S/N',
        options: ['Sensor', 'Intuitive'],
        type: 'S/N',
      },
      {
        question: 'S/N',
        options: ['Sensor', 'Intuitive'],
        type: 'S/N',
      },
      {
        question: 'T/F',
        options: ['Thinker', 'Feeler'],
        type: 'T/F',
      },
      {
        question: 'T/F',
        options: ['Thinker', 'Feeler'],
        type: 'T/F',
      },
      {
        question: 'T/F',
        options: ['Thinker', 'Feeler'],
        type: 'T/F',
      },
      {
        question: 'J/P',
        options: ['Judger', 'Prober'],
        type: 'J/P',
      },
      {
        question: 'J/P',
        options: ['Judger', 'Prober'],
        type: 'J/P',
      },
      {
        question: 'J/P',
        options: ['Judger', 'Prober'],
        type: 'J/P',
      },
    ]
  : []

const resetQuestions = () => {
  // randomize order of the questions
  questions = randomizeArray([...mbtiQuestions])

  // randomize the order of the options inside the questions
  questions.forEach((question) => {
    const opt1 = question.options[0]
    const opt2 = question.options[1]
    const which = Math.round(Math.random())
    if (which === 1) question.options = [opt2, opt1]
  })
}

// run the function above once to initialize the quetsions
resetQuestions()

const pairs = testing
  ? [
      {
        type: 'E/I',
        scores: [40, 60],
        types: ['E', 'I'],
        win: 'I',
        winIndex: 1,
      },
      {
        type: 'S/N',
        scores: [27, 73],
        types: ['S', 'N'],
        win: 'N',
        winIndex: 1,
      },
      {
        type: 'T/F',
        scores: [32, 68],
        types: ['T', 'F'],
        win: 'F',
        winIndex: 1,
      },
      {
        type: 'J/P',
        scores: [8, 92],
        types: ['J', 'P'],
        win: 'P',
        winIndex: 1,
      },
    ]
  : [
      { type: 'E/I', scores: [0, 0] },
      { type: 'S/N', scores: [0, 0] },
      { type: 'T/F', scores: [0, 0] },
      { type: 'J/P', scores: [0, 0] },
    ]
const initialState = testing
  ? {
      view: 'presenting',
      activeQ: mbtiQuestions.length,
      selected: null,
    }
  : {
      view: 'assessing',
      activeQ: 1,
      selected: null,
    }

const reducer = (state, action) => {
  const { type, payload } = action
  const { activeQ } = state
  switch (type) {
    case 'confirm reset':
      return { ...state, view: 'resetting' }
    case 'cancel':
      return { ...state, view: 'assessing' }
    case 'reset':
      resetQuestions()
      return initialState
    case 'answer':
      return { ...state, selected: payload }
    case 'submit':
      return { ...state, view: 'submitting' }
    case 'present':
      return { ...state, view: 'presenting' }
    case 'next':
      return {
        ...state,
        view: activeQ === questions.length ? 'submitting' : 'assessing',
        activeQ: activeQ === questions.length ? activeQ : activeQ + 1,
        selected: null,
      }

    default:
      return state
  }
}

const Mbti = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // destructure state to make it easier to access
  const { view, activeQ, selected } = state

  // this is used to tally the question results & to minimize re-renders by not holding
  const tally = useRef()

  // if we render and we're on the first question...
  // 1. initialize quesitons
  // 2. reset the tally counter
  // ** Can't use spread operator here as it only creates a shallow copy
  if (testing) {
    tally.current = JSON.parse(JSON.stringify(pairs))
  } else if (activeQ === 1) {
    tally.current = JSON.parse(JSON.stringify(pairs))
  }

  const nextBtn = useRef(null)
  const resetBtn = useRef(null)
  const opt1Btn = useRef(null)
  const opt2Btn = useRef(null)
  const confirmResetBtn = useRef(null)
  const takeAgainBtn = useRef(null)
  const sendResultsBtn = useRef(null)

  // enables & disables buttons as necessary, and focuses on the appropriate button depending on state
  useEffect(() => {
    if (view === 'resetting') {
      confirmResetBtn.current.focus()
    } else if (view === 'presenting') {
      // takeAgainBtn.current.focus()
      if (submitActive) sendResultsBtn.current.focus()
    } else if (view === 'submitting') {
      // nextBtn.current.focus()
    } else {
      // if view === assessing

      // if it's the first question they can't reset the assessment
      if (activeQ === 1) resetBtn.current.disabled = true

      // if there isn't an option selected they can't select next AND focus goes to the first option
      if (selected === null) {
        nextBtn.current.disabled = true
        opt1Btn.current.focus()
      }

      // if something IS selected
      if (selected !== null) {
        nextBtn.current.disabled = false
        nextBtn.current.focus()
      }
    }
  }, [selected, activeQ, view])

  // get current question for easy access
  const question = questions[activeQ - 1]

  const tallyQuestion = () => {
    // determine which pair should be scored
    const whichTally = tally.current.findIndex(
      (item) => question.type === item.type
    )

    // const curScore = tally.current[whichTally][selected]

    // // get the current score of the item that needs to be tallied
    const curScore = tally.current[whichTally].scores[selected]
    // increase that score by 1
    tally.current[whichTally].scores[selected] = curScore + 1
  }

  const getFinalScores = () => {
    const results = [...tally.current]

    // map results to get percentages of pairs rather than counting numbers
    results.forEach((result) => {
      const total = result.scores[0] + result.scores[1]
      result.scores = result.scores.map((score) =>
        Math.round((score / total) * 100)
      )

      result.types = result.type.split('/')
      result.win = result.scores[0] > 50 ? result.types[0] : result.types[1]
      result.winIndex = result.scores[0] > 50 ? 0 : 1
    })

    tally.current = results
  }

  const handleNext = () => {
    tallyQuestion()
    if (activeQ === questions.length) {
      getFinalScores()
      dispatch({ type: 'present' })
    } else {
      dispatch({ type: 'next' })
    }
  }

  const Content = () => {
    switch (view) {
      //
      case 'resetting':
        return <ResettingWrapper dispatch={dispatch} btnRef={confirmResetBtn} />

      //
      case 'submitting':
        return (
          <>
            {/* <p className='text-xl text-gray-500 font-bold mb-0'>
              Submitting Results
            </p> */}
            <SubmitResults
              dispatch={dispatch}
              type='Myers-Briggs'
              results={tally.current}
              testing={testing}
            />
          </>
        )

      //
      case 'presenting':
        const results = tally.current
        // const dispResult = results
        //   .map((result) => result.win)
        //   .toString()
        //   .replace(/,/g, '')

        // get core results based on dispResult string
        // let core
        // if (dispResult.charAt(1) === 'N') {
        //   core = 'N'.concat(dispResult.charAt(2) === 'T' ? 'T' : 'F')
        // } else {
        //   core = 'S'.concat(dispResult.charAt(3) === 'J' ? 'J' : 'P')
        // }

        // const corePage =
        //   core === 'NF'
        //     ? '/resources/mbti/nf-idealists'
        //     : core === 'NT'
        //     ? '/resources/mbti/nt-rationals'
        //     : core === 'SJ'
        //     ? '/resources/mbti/sj-guardians'
        //     : '/resources/mbti/sp-artisans'

        return (
          <>
            <PresentationWrapper>
              <MBTIResults results={results} />
            </PresentationWrapper>
            <PresentationFooter>
              <Button
                type='danger'
                // className='mr-4'
                ref={takeAgainBtn}
                onClick={() => {
                  dispatch({ type: 'reset' })
                }}
              >
                Take Again
              </Button>
              {submitActive && (
                <Button
                  type='go'
                  className='ml-4'
                  ref={sendResultsBtn}
                  onClick={() => {
                    dispatch({ type: 'submit' })
                  }}
                >
                  Send Results
                </Button>
              )}
            </PresentationFooter>
          </>
        )

      //
      case 'assessing':
      default:
        return (
          <AssessmentWrapper
            question={question}
            dispatch={dispatch}
            activeQ={activeQ}
            length={questions.length}
            resetBtn={resetBtn}
            nextBtn={nextBtn}
            handleNext={handleNext}
          >
            {question.options.map((option, index) => (
              <Button
                key={option.text}
                ref={index === 0 ? opt1Btn : opt2Btn}
                type={selected === option.value ? 'dark' : 'clear'}
                className='first:mb-6 first-letter:uppercase'
                onClick={() => {
                  dispatch({ type: 'answer', payload: option.value })
                }}
              >
                {option.text}
              </Button>
            ))}
          </AssessmentWrapper>
        )
    }
  }

  return (
    <ContentWrapper type='MBTI' view={view}>
      <Content />
      {/* <Results tally={tally} /> */}
    </ContentWrapper>
  )
}

export default Mbti

// const Results = ({ tally }) => {
//   return (
//     <>
//       <div className='m-auto flex w-24 justify-between mt-8'>
//         <div>{`E: ${tally.current[0].scores[0]}`}</div>
//         <div>{`I: ${tally.current[0].scores[1]}`}</div>
//       </div>
//       <div className='m-auto flex w-24 justify-between'>
//         <div>{`S: ${tally.current[1].scores[0]}`}</div>

//         <div> {`N: ${tally.current[1].scores[1]}`}</div>
//       </div>
//       <div className='m-auto flex w-24 justify-between'>
//         <div>{`T: ${tally.current[2].scores[0]}`}</div>
//         <div> {`F: ${tally.current[2].scores[1]}`}</div>
//       </div>
//       <div className='m-auto flex w-24 justify-between'>
//         <div>{`J: ${tally.current[3].scores[0]}`}</div>
//         <div> {`P: ${tally.current[3].scores[1]}`}</div>
//       </div>
//     </>
//   )
// }
