  
const path = require("path")
const cities = require("./src/schemas/kommuner.json")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const pages = await graphql(`
  {
   allPrismicProject {
      nodes {
        uid
      }
    }
  }
  `)

  const template = path.resolve("src/templates/project.jsx")
  const cityTemplate = path.resolve("src/templates/cityTemplate.jsx")
  pages.data.allPrismicProject.nodes.forEach(edge => {
    createPage({
      path: `/projects/${edge.uid}`,
      component: template,
      context: {
        uid: edge.uid,
      },
    })
  })
  
  cities.forEach(city => {
    createPage({
      path: `/stad/${city.toLowerCase()}`,
      component: cityTemplate,
      context: {
        city: city,
      },
    })
  })
}