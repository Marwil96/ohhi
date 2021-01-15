import React, { useEffect } from 'react';
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"
import NavBar from './NavBar';
import { animated } from "react-spring"
import SEO from './SEO';

const OuterWrapper = styled.section`
  width: 100%;
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  top: 0;
  left: 0;
  right: 0;
  /* border: 10px solid black; */
  /* overscroll-behavior: contain; */
  transition: background ease 500ms;
`

const InnerWrapper = styled(animated.section)`
  /* width: 100%; */
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1.6rem;
  padding: 5rem 1.6rem 0rem 1.6rem;
  transition: opacity 500ms ease;

  ${breakpoint.tabPort`
      padding: 10rem 10rem 0rem 10rem;
      grid-column-gap: 3.2rem;
  `}
`


const PageWrapper = ({ children, location, style, outerWrapperStyle, transitionActive, fixedHeight }) => {
  // const [props, set, stop] = useSpring(() => ({config: { duration: 250 }, opacity: transitionActive ? 0 : 1 }))
  return (
    <OuterWrapper style={{background:  transitionActive === 'entering' ||  transitionActive === 'exiting' ? location.pathname !== undefined ? "black" : "white" : location.pathname !== undefined ? "white" : "black", ...outerWrapperStyle}}>
      {/* <Noise /> */}
      <SEO
        title="William Martinsson - Digital Designer - Frontend Developer"
        description="Hey, I'm William Martinsson. I'm a creator of websites, apps, and digital products. Sometimes I develop them other times I design them but usually, I do both. Currently freelancing from my home in the middle of Sweden."
      />
      <NavBar />
      <InnerWrapper style={{ 
        opacity:  transitionActive === 'entering' ||  transitionActive === 'exiting' ? 0 : 1,
        ...style 
        }}>
          {children}
      </InnerWrapper>
    </OuterWrapper>
  )
}

export default PageWrapper;