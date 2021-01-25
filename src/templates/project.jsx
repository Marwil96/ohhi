import React, { useEffect, useState } from "react"
import { graphql } from 'gatsby';
import TransitionLink from "gatsby-plugin-transition-link"
// import { FullWidthImage, SplitImage } from "../components/ProjectImage"
import PageWrapper from "../components/PageWrapper"
import styled from 'styled-components';
import "../scss/main.scss"
import { breakpoint } from "../mixins/breakpoint"
import ProjectHeader from "../components/ProjectHeader";
import Img from "gatsby-image";
import { Bubble } from "../components/Bubble";
import RichText from "../components/RichText";
import { useSpring, animated } from "react-spring"
import SEO from "../components/SEO";
import ContactBanner from "../components/ContactBanner";

const ImageWrapper = styled.div`
  margin-bottom: 4.8rem;
  position: relative;
  width: 100vw;
  margin-left: -1.6rem;

  ${breakpoint.tabPort`
    margin-bottom: 6.4rem;
    width: 100%;
    margin-left: none;
  `}
`

const ContentWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1.6rem;
  padding-bottom: 10rem;
  
  ${breakpoint.tabPort`
    grid-column-gap: 3.2rem;
  `}
`

const Introduction = styled(animated.h3)`
  font-size: 2.4rem;
  font-weight: 400;
  line-height: 4rem;
  margin-bottom: 4.8rem;

  grid-column: span 12;

  ${breakpoint.tabPort`
    grid-column-start: 3;
    grid-column-end: 11;
    font-size: 3.2rem;
    line-height: 5.4rem;
    margin-bottom: 6.4rem;
  `}
`

const NextProject = styled.section`
  background-color: #000;
  padding: 4.8rem 1.6rem;
  width: calc(100% + 3.2rem);
  margin-left: -1.6rem;
  display: flex;
  flex-direction: column;
  /* margin-bottom: 6.4rem; */

  ${breakpoint.tabPort`
    flex-direction: row;
    padding: 4.8rem 10rem;
    width: calc(100% + 20rem);
    margin-left: -10rem;
    display: flex;
    flex-direction: column;
  `}

  div {
    z-index: 0;
  }

  span {
    font-size: 1.8rem;
    font-weight: 300;
    margin-bottom: 0.6rem;
    color: white;
    z-index: 10;
    font-weight: 500;
  }

  a {
    color: white;
    font-size: 3.2rem;
    font-weight: 400;
    z-index: 10;
    position: relative;
    width: fit-content;
    font-family: "Fraunces";

    &:before {
      border-bottom: 3px solid #fff;
      content: "";
      display: block;
      position: absolute;
      bottom: 1px;
      width: 0;
      transition: width 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    &:hover {
      cursor: pointer;
      &:before {
        width: 100%;
      }
    }
  }

  ${breakpoint.tabPort`
    padding: 14rem 10rem;

    div {
    }

    span {
      font-size: 2.4rem;
    }

    a {
      font-size: 6.4rem;
    }
  `}
`

const HeroMask = styled(animated.div)`

`

const Project = ({data, transitionStatus, location}) => {
  const content = data.prismicProject.data;
  const [nextProject, setNextProject] = useState({slug: '', name:''})

  useEffect(() => {
    if(content.project_name.text === 'Knodd') setNextProject({slug: "agenly-se", name:'Agenly'})
    else if(content.project_name.text === 'Agenly') setNextProject({ slug: "karygen-health-se", name: "Karygen Health" })
    else if(content.project_name.text === 'Karygen Health') setNextProject({ slug: "knodd-se", name: "Knodd" })
    else {setNextProject({ slug: "knodd-se", name: "Knodd" })}
  }, [])

   const heroMaskSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1,1)'}, to:{ transform: 'scale(1,0)'}, delay: 1600})
   const heroSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1.3)'}, to:{ transform: 'scale(1)'}, delay: 1600})
   const slideBubble = useSpring({config: {friction: 10, tension: 400}, from: {transform: 'scale(0)'}, to:{ transform: 'scale(1)'}, delay: 2200})
   const slideIntro = useSpring({config: {friction: 35}, from: {opacity: 0, transform: 'translateY(100px)'}, to:{opacity: 1, transform: 'translateY(0px)'}, delay: 2200})



  return (
    <PageWrapper
      style={{ display: "flex", flexDirection: "column" }}
      outerWrapperStyle={{ height: "auto" }}
      transitionActive={transitionStatus}
      location={location}
    >
      <SEO
        title={`${content.project_name.text} - ${content.title.text}`}
        description={content.project_introduction.text}
      />
      <ProjectHeader
        name={content.project_name.text}
        metaData={content.summary}
      />
      <ImageWrapper>
        <Bubble
          style={{
            position: "absolute",
            ...slideBubble,
          }}
          onClick={() =>
            window.open(`${content.link_to_website.url}`, "_blank")
          }
        >
          Besök Hemsidan
        </Bubble>
        <HeroMask
          className="mask"
          style={{
            height: "100%",
            width: "100%",
            position: "absolute",
            background: "white",
            transformOrigin: "top",
            zIndex: 1,
            ...heroMaskSpring,
          }}
        ></HeroMask>
        <div style={{ overflow: "hidden" }}>
          <animated.div style={heroSpring}>
            <Img fluid={content.hero_image.localFile.childImageSharp.fluid} />
          </animated.div>
        </div>
      </ImageWrapper>

      {/* CONTENT START HERE  */}
      <ContentWrapper>
        <Introduction style={slideIntro}>
          {content.project_introduction.text}
        </Introduction>

        {content.body.map((section, index) => {
          if (section.slice_type === "rich_text") {
            return <RichText key={index} content={section.primary.text.html} />
          } else if (section.slice_type === "full_width_image") {
            return (
              <ImageWrapper
                style={{ gridColumn: "span 12", marginTop: "6.4rem" }}
              >
                <Img
                  fluid={section.primary.image.localFile.childImageSharp.fluid}
                  key={index}
                />
              </ImageWrapper>
            )
          } else {
            return true
          }
        })}
      </ContentWrapper>
      <NextProject>
        <span>Nästa projekt</span>
        <TransitionLink
          to={`/projects/${nextProject.slug}`}
          exit={{ length: 0.5 }}
          entry={{ length: 0.5, delay: 0.5 }}
        >
          {nextProject.name}
        </TransitionLink>
      </NextProject>
      <ContactBanner />
    </PageWrapper>
  )
}

export const query = graphql`
  query PostBySlug($uid: String!) {
    prismicProject(uid: { eq: $uid }) {
      tags
      data {
        title {
          text
        }
        summary {
          summary_title {
            text
          }
          summary_value {
            text
          }
        }
        project_name {
          text
        }
        category {
          text
        }
        hero_image {
          url
          localFile {
            childImageSharp {
              fluid(maxWidth: 3080, quality: 100) {
                aspectRatio
                base64
                originalImg
                originalName
                presentationHeight
                presentationWidth
                sizes
                src
                srcSet
                srcSetWebp
                srcWebp
                tracedSVG
              }
            }
          }
        }
        link_to_website {
          url
        }
        project_introduction {
          text
        }
        body {
          ... on PrismicProjectBodyFullWidthImage {
            id
            slice_type
            internal {
              type
            }
            primary {
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3080, quality: 100) {
                      aspectRatio
                      base64
                      originalImg
                      originalName
                      presentationHeight
                      presentationWidth
                      sizes
                      src
                      srcSet
                      srcSetWebp
                      srcWebp
                      tracedSVG
                    }
                  }
                }
              }
            }
          }
          ... on PrismicProjectBodySplitImages {
            id
            slice_type
            internal {
              type
            }
            primary {
              left_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3080, quality: 100) {
                      aspectRatio
                      base64
                      originalImg
                      originalName
                      presentationHeight
                      presentationWidth
                      sizes
                      src
                      srcSet
                      srcSetWebp
                      srcWebp
                      tracedSVG
                    }
                  }
                }
              }
              right_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 3080, quality: 100) {
                      aspectRatio
                      base64
                      originalImg
                      originalName
                      presentationHeight
                      presentationWidth
                      sizes
                      src
                      srcSet
                      srcSetWebp
                      srcWebp
                      tracedSVG
                    }
                  }
                }
              }
            }
          }
          ... on PrismicProjectBodyRichText {
            id
            primary {
              text {
                html
              }
            }
            slice_type
          }
          ... on PrismicProjectBodyQuote {
            id
            primary {
              author {
                text
              }
              quote {
                text
              }
            }
            slice_type
          }
          ... on PrismicProjectBodyQuote1 {
            primary {
              quote {
                text
              }
              author {
                text
              }
            }
            slice_type
          }
        }
      }
    }
  }
`


export default Project
