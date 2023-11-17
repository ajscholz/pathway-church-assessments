import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby-link'

const IndexPage = ({ data }) => {
  const { churchName, churchShortName } = data.site.siteMetadata
  return (
    <main className='w-2/3 text-left mx-auto'>
      <h1 className='text-2xl '>{`Welcome to ${churchName}'s Assessment Website`}</h1>
      <p className='mt-6'>
        Here you will find two assessments. One for the{' '}
        <Link to='/myers-briggs'>Myers Briggs personality profile</Link> and one
        for a <Link to='/spiritual-gifts'>spiritual gifts profile</Link>. These
        assessments are designed to help you discover some of your wiring and
        gifting, which is useful in so many ways. One of the main ways it's
        useful at {churchShortName} is to help you find a team that would be
        life-giving for you to serve on.
      </p>
      <p className='mt-6'>
        Each assessment should take somewhere around 10-15 minutes and will give
        you comprehensive results.
      </p>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

export const query = graphql`
  query {
    site {
      siteMetadata {
        churchName
        churchShortName
      }
    }
  }
`
