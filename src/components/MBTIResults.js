import React from 'react'
// import { useSprings, animated, config } from 'react-spring'

const MBTIResults = ({ results }) => {
  const dispResult = results
    .map((result) => result.win)
    .toString()
    .replace(/,/g, '')

  // React Spring animation
  // const delay = i => i * 600 + 200
  // const fadeIn = useSprings(
  //   results.length,
  //   results.map((result, i) => ({
  //     from: { opacity: 0 },
  //     to: { opacity: 1 },
  //     config: config.molasses,
  //     delay: delay(i),
  //   }))
  // )

  // React Spring animation
  // const bars = useSprings(
  //   results.length,
  //   results.map((result, i) => ({
  //     from: {
  //       width: "0%",
  //       right: result.winIndex === 0 ? "unset" : 0,
  //       opacity: 0,
  //     },
  //     to: { width: `${result.scores[result.winIndex]}%`, opacity: 1 },
  //     config: config.molasses,
  //     delay: delay(i),
  //   }))
  // )

  return (
    <div className='w-full text-center'>
      <p className='text-xl text-gray-500 font-bold mb-0'>
        You are most likely an
      </p>
      <p className='mt-2 mb-4 text-3xl'>{dispResult}</p>
      <div className='w-full mt-12'>
        {results.map((pair, index) => {
          return (
            <div
              key={pair.type}
              className='relative flex justify-between items-center h-8 mt-5 font-bold'
            >
              {pair.types.map((letter, i) => (
                // Pair letters
                <div
                  key={letter}
                  className={`mb-0 mt-0 text-xl ${i === 0 ? 'mr-2' : 'ml-2'} ${
                    pair.winIndex !== i ? 'text-slate-500' : 'text-slate-900'
                  }`}
                >
                  {letter}
                </div>
                // React Spring animation
                // <animated.div
                //   key={letter}
                //   className={`h5 mb-0 mt-0 ${i === 0 ? "mr-2" : "ml-2"}${
                //     pair.winIndex !== i ? " text-very-muted" : ""
                //   }`}
                //   style={{ zIndex: 50, ...fadeIn[index] }}
                // >
                //   {letter}
                // </animated.div>
              ))}
              <div className='absolute top-0 bottom-0 left-6 right-6'>
                <div
                  className={`absolute top-0 bottom-0 bg-slate-700 flex ${
                    pair.winIndex === 0
                      ? `left-0 justify-end`
                      : `right-0 justify-start`
                  } items-center rounded-sm`}
                  style={{ width: `${pair.scores[pair.winIndex]}%` }}
                >
                  <span className='mx-2 text-slate-50 text-sm'>
                    {`${pair.scores[pair.winIndex]}%`}
                  </span>
                </div>

                {/* React Spring Animation
                <animated.div
                  className={`position-absolute h-100 bg-primary d-flex ${
                    pair.winIndex === 0
                      ? `justify-content-end`
                      : `justify-content-start`
                  } align-items-center rounded`}
                  style={bars[index]}
                >
                  <span className="mx-2">
                    {`${pair.scores[pair.winIndex]}%`}
                  </span>
                </animated.div> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MBTIResults
