import React, { useReducer, useEffect, useRef } from 'react'
import { spiritualGiftsQuestions } from '../utils/data/assessments'
import RadioButtons from './RadioButtons'
import Button from './Button'
import SpiritualGiftsResults from './SpiritualGiftsResults'
import SubmitResults from './SubmitResults'
import { randomizeArray } from '../utils/functions'
import AssessmentWrapper from './AssessmentWrapper'
import PresentationWrapper from './PresentationWrapper'
import PresentationFooter from './PresentationFooter'
import ResettingWrapper from './ResettingWrapper'
import ContentWrapper from './ContentWrapper'

// variables to help me easily switch some modes on or off
const testing = false
const randomAnswers = false
const dispResults = false
const submitActive = true

let questions

// randomize the questions
const resetQuestions = () => {
  questions = randomizeArray([...spiritualGiftsQuestions])
}

// run the function above once to initialize the quetsions
resetQuestions()

let gifts = testing
  ? [
      {
        name: 'Administration',
        score: 4,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-administration',
      },
      {
        name: 'Apostleship',
        score: 3,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-apostleship',
      },
      {
        name: 'Craftsmanship',
        score: 14,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-craftsmanship',
      },
      {
        name: 'Discernment',
        score: 9,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-discerning-spirits',
      },
      {
        name: 'Evangelism',
        score: 5,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-evangelism',
      },
      {
        name: 'Exhortation',
        score: 5,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-exhortation',
      },
      {
        name: 'Faith',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-faith',
      },
      {
        name: 'Giving',
        score: 3,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-giving',
      },
      {
        name: 'Healing',
        score: 10,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-healing',
      },
      {
        name: 'Helps',
        score: 12,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-helps',
      },
      {
        name: 'Hospitality',
        score: 14,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-hospitality',
      },
      {
        name: 'Intercession',
        score: 5,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-intercession',
      },
      {
        name: 'Knowledge',
        score: 3,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-knowledge',
      },
      {
        name: 'Leadership',
        score: 2,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-leadership',
      },
      {
        name: 'Mercy',
        score: 5,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-mercy',
      },
      {
        name: 'Miracles',
        score: 6,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-miracles',
      },
      {
        name: 'Missionary',
        score: 1,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-missionary',
      },
      {
        name: 'Music/Worship',
        score: 14,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-music',
      },
      {
        name: 'Pastor/Shepherd',
        score: 15,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-pastor-shepherd',
      },
      {
        name: 'Prophecy',
        score: 5,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-prophecy',
      },
      {
        name: 'Service',
        score: 5,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-service',
      },
      {
        name: 'Teaching',
        score: 7,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-teaching',
      },
      {
        name: 'Tongues',
        score: 7,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-tongues-and-its-interpretation',
      },
      {
        name: 'Wisdom',
        score: 5,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-wisdom',
      },
    ]
  : [
      {
        name: 'Administration',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-administration',
      },
      {
        name: 'Apostleship',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-apostleship',
      },
      {
        name: 'Craftsmanship',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-craftsmanship',
      },
      {
        name: 'Discernment',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-discerning-spirits',
      },
      {
        name: 'Evangelism',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-evangelism',
      },
      {
        name: 'Exhortation',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-exhortation',
      },
      {
        name: 'Faith',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-faith',
      },
      {
        name: 'Giving',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-giving',
      },
      {
        name: 'Healing',
        score: 10,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-healing',
      },
      {
        name: 'Helps',
        score: 10,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-helps',
      },
      {
        name: 'Hospitality',
        score: 10,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-hospitality',
      },
      {
        name: 'Intercession',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-intercession',
      },
      {
        name: 'Knowledge',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-knowledge',
      },
      {
        name: 'Leadership',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-leadership',
      },
      {
        name: 'Mercy',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-mercy',
      },
      {
        name: 'Miracles',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-miracles',
      },
      {
        name: 'Missionary',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-missionary',
      },
      {
        name: 'Music/Worship',
        score: 10,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-music',
      },
      {
        name: 'Pastor/Shepherd',
        score: 10,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-pastor-shepherd',
      },
      {
        name: 'Prophecy',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-prophecy',
      },
      {
        name: 'Service',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-service',
      },
      {
        name: 'Teaching',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-teaching',
      },
      {
        name: 'Tongues',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-tongues-and-its-interpretation',
      },
      {
        name: 'Wisdom',
        score: 0,
        link: 'https://pathwaymarietta.com/resources/spiritual-gifts/the-gift-of-wisdom',
      },
    ]

const initialState = testing
  ? {
      view: 'assessing',
      activeQ: spiritualGiftsQuestions.length,
    }
  : {
      view: 'assessing',
      activeQ: 1,
    }

const initialize = () => {
  return gifts.map((gift) => ({ ...gift, score: 0 }))
}

const reducer = (state, action) => {
  const { activeQ } = state
  const { type } = action

  switch (type) {
    case 'confirm reset':
      return { ...state, view: 'resetting' }
    case 'cancel':
      return { ...state, view: 'assessing' }
    case 'reset':
      initialize()
      resetQuestions()
      return initialState
    case 'present':
      return { ...state, view: 'presenting' }
    case 'submit':
      return {
        ...state,
        view: 'submitting',
      }
    case 'next':
      return {
        view:
          activeQ === spiritualGiftsQuestions.length
            ? 'submitting'
            : 'assessing',
        activeQ:
          activeQ === spiritualGiftsQuestions.length ? activeQ : activeQ + 1,
      }
    default:
      return state
  }
}

const SpiritualGifts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // destructure state to make it easier to access
  const { view, activeQ } = state

  // this is used to tally the question results & to minimize re-renders by not holding values in state
  const tally = useRef([...gifts])
  const tallyCopy = useRef()
  const currentSelection = useRef(null)
  const nextBtn = useRef(null)
  const confirmResetBtn = useRef(null)
  const resetBtn = useRef(null)
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

      nextBtn.current.focus()
    }
  }, [activeQ, view])

  // set current selection on each render (as opposed to the first only in the useRef hook)
  currentSelection.current = 2

  // if we render and we're on the first question reset the tally counter
  if (activeQ === 1) {
    tally.current = initialize()
  }

  if (testing && view === 'assessing') {
    tally.current = [...gifts]
  }

  // get current question for easy access
  const question = questions[activeQ - 1]

  const focusNext = (e) => {
    console.log('e', e)
    // e.preventDefault()
    setTimeout(() => {
      nextBtn.current.focus()
    }, 50)
  }

  const tallyQuestion = () => {
    const giftIndex = gifts.findIndex((gift) => gift.name === question.type)

    const score = tally.current[giftIndex].score
    tally.current[giftIndex].score = score + currentSelection.current
  }

  const getResults = () => {
    tallyCopy.current = [...tally.current]
    const giftScores = [...tally.current]

    // create a new array that is the length of the possible scores (15 in this case).
    // this array will be filled with an array holding each question that scored that number.
    // I can then sort these, which is just better UX, but it will also allow me to more easily get the display results.
    let scoreArray = new Array(16).fill([])

    // iterate through the gifts and push the gifts into the array based on its score
    giftScores.forEach((gift) => {
      scoreArray[gift.score] = scoreArray[gift.score].concat([gift])
    })

    // sort each score group by name, simply for UX
    scoreArray.forEach((score) =>
      score.sort((a, b) => {
        if (a.name > b.name) return 1
        return -1
      })
    )

    // reverse the array so the highest scores are first
    scoreArray = scoreArray.reverse()

    // set some variables to be use by the do...while loop
    let finalScoreArray = []
    let loopIndex = 0
    let haveGifts = false

    // loop gets the "correct" number of gifts by adding items to the finalScoreArray until it has 3-5
    do {
      // add the current set of scores to the array
      finalScoreArray = finalScoreArray.concat([...scoreArray[loopIndex]])

      // get the length of the array now
      const len = finalScoreArray.length

      // check how many "top scores" there are
      if (len < 3) {
        // if not enough increment and run again
        loopIndex++
      } else if (len > 5) {
        // if too many
        haveGifts = true
      } else {
        // in the sweet spot between 3 and 5
        const nextLen = scoreArray[loopIndex + 1].length
        // find out if I get one more grouping that will be too many
        if (len + nextLen > 5) {
          // if it will be too many we'll jump out
          haveGifts = true
        } else {
          // if I can add and stay between 3 and 5 increment and run the loop again
          loopIndex++
        }
      }
    } while (haveGifts === false)

    tally.current = finalScoreArray.map((item) => ({
      gift: item.name,
      perc: `${Math.ceil((item.score / 15) * 100)}%`,
      link: item.link,
    }))
  }

  // helper function to handle next vs submit logic
  const handleNext = () => {
    tallyQuestion()
    if (activeQ === questions.length) {
      getResults()
      dispatch({
        type: 'present',
        payload: tally.current,
      })
    } else dispatch({ type: 'next' })
  }

  const Content = () => {
    switch (view) {
      case 'resetting':
        return <ResettingWrapper dispatch={dispatch} btnRef={confirmResetBtn} />
      case 'submitting':
        return (
          <SubmitResults
            dispatch={dispatch}
            type='Spiritual Gifts'
            results={tally.current}
            sgScores={tallyCopy.current}
            testing={testing}
          />
        )
      case 'presenting':
        return (
          <>
            <PresentationWrapper>
              <SpiritualGiftsResults display={tally.current} />
              {/* <p className='text-slate-500 mb-2 italic'>
                ** Click any of the gifts to view resources **
              </p> */}
            </PresentationWrapper>
            <PresentationFooter>
              <Button
                type='danger'
                // ref={takeAgainBtn}
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
                    dispatch({ type: 'submit', payload: tally.current })
                  }}
                >
                  Send Results
                </Button>
              )}
            </PresentationFooter>
          </>
        )
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
            <RadioButtons
              currentSelection={currentSelection}
              focusNext={focusNext}
              testing={randomAnswers}
            />
          </AssessmentWrapper>
        )
    }
  }

  return (
    <ContentWrapper type='SG' view={view}>
      <Content />
      {dispResults && view === 'assessing' && <Results tally={tally} />}
    </ContentWrapper>
  )
}

export default SpiritualGifts

const Results = ({ tally }) => {
  return (
    <>
      <div className='m-auto flex flex-col w-full space-y-4 mt-8'>
        {tally.current.map((gift, i) => (
          <div key={gift.name}>{`${gift.name}: ${tally.current[i].score}`}</div>
        ))}
      </div>
    </>
  )
}
