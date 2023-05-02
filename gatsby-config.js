require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Milwaukee Garden District Neighborhood Association",
    description: "Official Contentful Gatsby Starter",
  },
  plugins: [
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-contentful",
      options: {
        // spaceId: process.env.CONTENTFUL_SPACE_ID,
        spaceId:'H2I3hduOYjZQHk4QXGS4DoFdiVW4g1CtcXxwcZnJYo0',
        // accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        accessToken:'f0rnkukgphm9',
        host: process.env.CONTENTFUL_HOST
      },
    },
  ],
};
