// https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

export default async function formHandler(req, res) {
  // req.body has the form values
  const { name, email, churchName, churchEmail, to, type, results, testing } =
    req.body

  // Set some variables for use later

  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Intl.DateTimeFormat('en-US', options).format(new Date())

  /*
  
    ------------- Google OAuth2 authorization -------------

  */
  const OAuth2 = google.auth.OAuth2
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID, // ClientID
    process.env.GMAIL_CLIENT_SECRET // Client Secret
  )
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  })
  const accessToken = oauth2Client.getAccessToken() // Original article had deprecated access token method
  /*
  
    ------------- End Google OAuth2 authorization -------------

  */

  /*
  
  
    Here is where you would validate the form values and
    do any other actions with it you need (e.g. save it somewhere or
    trigger an action for the user).


  */

  /*
  
    Create transporter variable used by nodemailer based on testing environment

  */
  const transporter = testing
    ? nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'a949c930869b32',
          pass: '00f4db531864a8',
        },
      })
    : nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'andrew@citynorth.church',
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      })

  /*

      

  */
  const processSgAssessment = (items) =>
    `
    <ol>${items
      .map((item) => `<li>${item.gift}: ${item.perc}</li>`)
      .toString()
      .replace(/,/g, '')}
    </ol>
    `
  // <h3>Pastor Ryan's Spiritual Gifts Talks</h3>
  // ${items
  //   .map(
  //     item =>
  //       `<div>
  //         <a href=${item.link} target="_blank" rel="noopener noreferrer">${item.gift}</a>
  //       </div>`
  //   )
  //   .toString()
  //   .replace(/,/g, "")}

  /*

      

  */
  const processMbtiAssessment = (items) => {
    const type = items
      .map((item) => item.win)
      .toString()
      .replace(/,/g, '')
    // get core results based on dispResult string
    let core
    if (type.charAt(1) === 'N') {
      core = 'N'.concat(type.charAt(2) === 'T' ? 'T' : 'F')
    } else {
      core = 'S'.concat(type.charAt(3) === 'J' ? 'J' : 'P')
    }
    // const corePage =
    //   core === "NF"
    //     ? "https://pathwaymarietta.com/resources/mbti/nf-idealists"
    //     : core === "NT"
    //     ? "https://pathwaymarietta.com/resources/mbti/nt-rationals"
    //     : core === "SJ"
    //     ? "https://pathwaymarietta.com/resources/mbti/sj-guardians"
    //     : "https://pathwaymarietta.com/resources/mbti/sp-artisans"

    return `${type}
    <ul>
      ${items
        .map((item) => `<li>${item.win} - ${item.scores[item.winIndex]}%</li>`)
        .toString()
        .replace(/,/g, '')}
    </ul>
  `
  }

  /*

      

  */
  const formattedResults = `
    <h3>${
      type === 'Spiritual Gifts' ? 'Top Spiritual Gifts' : 'Myers-Briggs Type: '
    }
    </h3>
      ${
        type === 'Spiritual Gifts'
          ? processSgAssessment(results)
          : processMbtiAssessment(results)
      }
    
  `

  /*

      Set up the html used in the message

  */
  const html =
    to === 'org assessments'
      ? `
    <html>
      <style>
        span {
          font-weight: 700;
        }
      </style>
      <h1>
        You've received a new ${type} assessment
      </h1>
      <p>
        ${date}
      </p>
      <br>
      <hr>
      <br>
      <p>
        <span>Name: </span>
        ${name}
      </p>
      <p>
        <span>Email: </span>
        <a href="mailto: ${email}">${email}</a>
      </p>
      <br>
        ${formattedResults}
      <br>
      <hr>
    </html>`
      : `
    <html>
      <style>
        span {
          font-weight: 700;
        }
      </style>
      <h1>
        Your ${type} Assessment Results
      </h1>
      <p>
        ${date}
      </p>
      <br>
      <hr>
        ${formattedResults}
      <br>
      <hr>
      <p>Please contact <a href="mailto: ${churchEmail}">${churchName}</a> with any questions about your results.</p>
      </html>`

  /*

      Set up the message body sent in the email

  */
  const message =
    to === 'org assessments'
      ? {
          from: {
            name: 'Andrew Scholz',
            address: 'andrew@citynorth.church',
          },
          replyTo: `${name} <${email}>`,
          to: `${churchName} <${churchEmail}>`,
          bcc: `Andrew Scholz <andrew@citynorth.church>`,
          subject: `New ${type} Assessment Submission`,
          generateTextFromHTML: true,
          html: html,
        }
      : {
          from: {
            name: churchName,
            address: churchEmail,
          },
          replyTo: `${churchName} <${churchEmail}>`,
          to: `${name} <${email}>`,
          subject: `Your ${type} Assessment Results From ${churchName}`,
          generateTextFromHTML: true,
          html: html,
        }

  /*

      try/catch block to send the email

  */
  try {
    const response = await transporter.sendMail(message)
    if (response.accepted.length === 0) {
      console.log('Form submission failed')
      return res
        .status(500)
        .json(
          'Sorry, there was an error submitting your message. Please try again'
        )
    }
    return res.status(200).json('Message submitted successfully')
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .json(
        'Sorry, there was an error submitting your message. Please try again'
      )
  }
}
