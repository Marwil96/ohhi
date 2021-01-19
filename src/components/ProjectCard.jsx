import Img from 'gatsby-image';
import TransitionLink from "gatsby-plugin-transition-link"
import React from 'react';
import { animated, useSpring } from "react-spring"
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"
import { colors } from '../mixins/colors';

const ProjectCardWrapper = styled.div`
  /* grid-column: span 12; */
  display: flex;
  flex-direction: column;
  margin-bottom: 0rem;
  width: 80%;
  margin-right: 3.2rem;

  ${breakpoint.tabPort`
    grid-column: span 6;
    margin-right: 0;
    width: initial;
    margin-bottom: 6.4rem;
  `}

  ${breakpoint.laptop`
    grid-column: span 4;
    margin-right: 0;
    width: initial;
  `}
`

const ImageWrapper = styled.div`
  margin-bottom: 1.6rem;
  position: relative;

  ${breakpoint.tabPort`
    margin-bottom: 1.6rem;
    margin-left: none;
  `}
`

const ProjectTitle = styled(animated.h1)`
  font-size: 2.4rem;
  margin-bottom: 1.2rem;
  font-weight: 400;

  ${breakpoint.tabPort`
    font-size: 3.2rem;
    margin-bottom: 1.6rem;
  `}
`

const Label = styled(animated.h5)`
  font-size: 2rem;
  font-weight: 400;
  /* margin-bottom: 1.2rem; */
  text-transform: uppercase;
  /* color: #464646; */
  line-height: 180%;
  max-width: 70%;
  color: ${colors.textWhite};

  ${breakpoint.tabPort`
    font-size: 2rem;
  `}
`

const ProjectCard = ({image, title, category, type, style, index, link, outsideOfWebsite, role}) => {
//  const heroMaskSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1,1)'}, to:{ transform: 'scale(1,0)'}, delay: 800})
  const heroSpring = useSpring({config: {friction: 35}, from: {transform: 'scale(1.3)'}, to:{ transform: 'scale(1)'}, delay: 800 + (300 * index)})
  const slideTitle = useSpring({
    config: { friction: 35 },
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 1200 + (300 * index),
  })

  const slideCategory = useSpring({
    config: { friction: 35 },
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    delay: 1600 + 300 * index,
  })

  
  return (
    <ProjectCardWrapper>
      <TransitionLink
        to={outsideOfWebsite ? false : `/projects/${link}`}
        exit={{ length: 0.5 }}
        entry={{ length: 0.5, delay: 0.5 }}
      >
        <ImageWrapper>
          <animated.div
            className="mask"
            style={{
              height: "100%",
              width: "101%",
              position: "absolute",
              background: "black",
              transformOrigin: "top",
              zIndex: 1,
              ...style,
            }}
          ></animated.div>
          <div style={{ overflow: "hidden" }}>
            <animated.div style={heroSpring}>
              <Img fluid={image} />
            </animated.div>
          </div>
        </ImageWrapper>
        <animated.div
          style={{
            display: "flex",
            justifyContent: "space-between",
            ...slideCategory,
          }}
        >
          <Label>{title}</Label>
          <Label>2020</Label>
        </animated.div>
      </TransitionLink>
    </ProjectCardWrapper>
  )
}

export default ProjectCard;