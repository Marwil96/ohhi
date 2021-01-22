import React, { useEffect } from "react"
import styled from "styled-components"
import Flickity from "react-flickity-component"
import { breakpoint } from "../mixins/breakpoint"
import PageWrapper from "../components/PageWrapper"
import ProjectSlider from "../components/ProjectSlider"
import "../scss/main.scss"
import { animated, useSpring, useSprings } from "react-spring"
import ProjectCard from "../components/ProjectCard"
import { colors } from "../mixins/colors"
import ContactBanner from "../components/ContactBanner"
import { graphql } from "gatsby"
import SEO from "../components/SEO"

const IntroContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  margin-bottom: 6.4rem;

  ${breakpoint.tabPort`
    margin-bottom: 14rem;
  `}

  h1 {
    font-size: 2.4rem;
    font-weight: 400;
    color: #e63a2e;
    margin-bottom: 1.6rem;
  }

  h2 {
    font-size: 2.4rem;
    font-weight: 400;
    text-align: left;
    line-height: 180%;
    color: #f8f8f8;

    ${breakpoint.tabPort`
      font-size: 3.5vw;
    `}

    strong {
      font-weight: 500;
      color: #e63a2e;
      font-family: 'Fraunces';
    }
  }
`

const ProjectsContainer = styled.div`
  position: relative;
  padding-bottom: 10rem;

  ${breakpoint.tabPort`
  `}

  .desktop {
    display: none;

    ${breakpoint.tabPort`
      grid-template-columns: repeat(12, 1fr);
      grid-column-gap: 1.6rem;
      display: grid;
    `}
  }

  .mobile {
    overflow: hidden;
    margin-top: 2rem;

    .slider {
      &:focus {
        outline: none;
      }
    }

    button {
      display: none;
    }
    ol {
      display: none;
    }

    ${breakpoint.tabPort`
      display: none;
      margin-top: 0rem;
    `}
  }

  span {
    font-size: 2rem;
    color: ${colors.textWhite};
    transform: rotate(-90deg);
    font-weight: 400;
    margin-bottom: 2rem;
    font-weight: 500;
    color: #e63a2e;
    font-family: 'Fraunces';

    ${breakpoint.tabPort`
      position: absolute;
      font-size: 2.4rem;
      transform: rotate(-90deg);
      left: -131px;
      top: 82px;
      margin-bottom: 0 rem;
    `}
  }
`

const CityTemplate = ({ transitionStatus, location, entry, exit, data, pageContext }) => {
  console.log('doto', data)
  const projects = data.allPrismicProject.edges;

  const slideText = useSpring({
    config: { friction: 35 },
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 500,
  })
  const slideProjectText = useSpring({
    config: { friction: 35 },
    from: { opacity: 0, transform: "translateY(100px) rotate(-90deg)" },
    to: { opacity: 1, transform: "translateY(0px) rotate(-90deg)" },
    delay: 2000,
  })
  const slideInCards = useSprings(
    projects.length,
    projects.map((item, index) => ({
      config: { friction: 45 },
      from: { transform: "scale(1,1)" },
      to: { transform: "scale(1,0)" },
      delay: 800 + 300 * index,
    }))
  )

  return (
    <PageWrapper
      outerWrapperStyle={{ background: "#000" }}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000",
      }}
      location={location}
      fixedHeight
      transitionActive={transitionStatus}
    >
      <SEO
        title={`Webbyrån OHHI i ${pageContext.city} – Din design och utvecklings partner.`}
        description={`Webbyrå OHHI – Vi hjälper stora som små företag att lyckas på webben genom digital kommunikation, teknik och design. Oavsett om det är en e-shop, hemsida, app eller något helt annat.`}
      />
      <IntroContainer style={(slideText, { gridColumn: "span 12" })}>
        <h1>OHHI Webbyrå {pageContext.city}</h1>
        <h2>
          Vi hjälper <strong>stora</strong> som <strong>små</strong> företag att
          lyckas på webben genom digital kommunikation, teknik och design.
          Oavsett om det är en e-shop, hemsida, app eller något helt annat.
        </h2>
      </IntroContainer>
      <ProjectsContainer>
        <animated.span style={{ ...slideProjectText }}>
          Utvalda Projekt
        </animated.span>
        <div className="desktop">
          {slideInCards.map((style, index) => (
            <ProjectCard
              outsideOfWebsite={false}
              index={index}
              style={style}
              link={projects[index].node.uid}
              title={projects[index].node.data.project_name.text}
              image={
                projects[index].node.data.thumbnail_image.localFile
                  .childImageSharp.fluid
              }
              category={projects[index].node.data.category.text}
            />
          ))}
        </div>
        {typeof window !== "undefined" && window.innerWidth < 901 ? (
          <div className="mobile">
            <Flickity
              className={"slider"} // default ''
              elementType={"section"} // default 'div'
              // takes flickity options {}
              disableImagesLoaded={false} // default false
              static={true} // default false
              options={{ initialIndex: 0, cellAlign: "left" }}
              cellAlign={"left"}
            >
              {slideInCards.map((style, index) => (
                <ProjectCard
                  outsideOfWebsite={false}
                  key={index}
                  index={index}
                  style={style}
                  link={projects[index].node.uid}
                  title={projects[index].node.data.project_name.text}
                  image={
                    projects[index].node.data.thumbnail_image.localFile
                      .childImageSharp.fluid
                  }
                  category={projects[index].node.data.category.text}
                />
              ))}
            </Flickity>
          </div>
        ) : (
          ""
        )}
      </ProjectsContainer>
      <ContactBanner city={pageContext.city} />
    </PageWrapper>
  )
}

export const query = graphql`
  {
    allPrismicProject(
      filter: { tags: { eq: "ohhi" }, lang: { eq: "sv-se" } }
      sort: { fields: data___order }
    ) {
      edges {
        node {
          id
          uid
          data {
            category {
              text
            }
            hero_image {
              url
            }
            thumbnail_image {
              localFile {
                childImageSharp {
                  fluid {
                    tracedSVG
                    srcWebp
                    srcSetWebp
                    srcSet
                    src
                    sizes
                    presentationWidth
                    presentationHeight
                    originalName
                    originalImg
                    base64
                    aspectRatio
                  }
                }
              }
              url
            }
            project_name {
              text
            }
            title {
              text
            }
          }
        }
      }
    }
  }
`

export default CityTemplate
