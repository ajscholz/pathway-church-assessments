/**
 * @type {import('gatsby').GatsbyConfig}
 */

module.exports = {
  siteMetadata: {
    siteTitle: `Pathway Assessments`,
    siteUrl: `https://pathway-church-assessments.netlify.app`,
    churchName: `Pathway Community Church`,
    churchShortName: `Pathway`,
    churchEmail: `pathwaymarietta@gmail.com`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.js`),
      },
    },
  ],
}
