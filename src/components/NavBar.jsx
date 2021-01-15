// import { Link } from 'gatsby';
import React, { useState } from 'react';
import TransitionLink from "gatsby-plugin-transition-link"
import styled from 'styled-components';
import { breakpoint } from "../mixins/breakpoint"
import MobileMenu from './MobileMenu';
import { colors } from "../mixins/colors";

const NavBarWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2.4rem 1.6rem 2.4rem 1.6rem;
  position: sticky;
  z-index: 10000;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;

  &:before {
    content: "";
    border-bottom: 3px solid ${colors.brightRed};
    width: calc(100% - 3.2rem);
    position: absolute;
    bottom: 0;

    ${breakpoint.tabPort`
      width: calc(100% - 20rem);
    `}
  }

  svg {
    width: 9.2rem;
  }

  a {
    display: inline-block;
    color: ${colors.brightRed};
  }

  .seo_text {
    display: none;
    flex: 0.3;
    justify-content: flex-start;

    ${breakpoint.tabPort`
      display: flex;
    `}
  }

  ${breakpoint.tabPort`
    padding: 4.6rem 10rem 3.2rem 10rem;
  `}
`

const NavBarTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 400;

  ${breakpoint.tabPort`
    font-size: 2.4rem;
  `}
`
const NavBarLink = styled.span`
  font-weight: 300;
  margin-left: 3.2rem;
  font-size: 2.4rem;
`

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.33;
  align-items: flex-end;
  text-align: right;

  a {
    text-align: right;
     font-size: 1.6rem;
     
    &:first-child {
      margin-bottom: 1.2rem;
    }
  }

  ${breakpoint.tabPort`
    a {
      font-size: 1.8rem
    }
  `}
`

const LogoContainer = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: flex-start;

  ${breakpoint.tabPort`
     justify-content: center;
  `}
`


const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <NavBarWrapper>
      <div className="seo_text">
        <TransitionLink
          to="/"
          exit={{
            length: 0.5,
          }}
          entry={{
            length: 0.5,
            delay: 0.5,
          }}
        >
          <NavBarTitle>Design Studio</NavBarTitle>
        </TransitionLink>
      </div>
      <LogoContainer>
        <TransitionLink
          to="/"
          exit={{
            length: 0.5,
          }}
          entry={{
            length: 0.5,
            delay: 0.5,
          }}
        >
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 92 35"
          >
            <path
              d="M12.7 35c8 0 12.8-6.6 12.8-17.5S20.7 0 12.7 0C4.8 0 0 6.6 0 17.5S4.8 35 12.7 35zm0-7.3c-3.2 0-5-3.2-5-10.2 0-7 1.8-10.2 5-10.2s5.1 3.2 5.1 10.2c0 7-1.9 10.2-5 10.2zM30.1.8v33.5h7.3V21H45v13.3h7.2V.8h-7.2v12.7h-7.7V.8H30zM57.7.8v33.5H65V21h7.7v13.3h7.2V.8h-7.2v12.7H65V.8h-7.3zM91 23.5h-5L85 .8h6.8L91 23.5zM85 31c0-1.4.3-2.4 1-2.9.7-.6 1.5-.9 2.5-.9s1.8.3 2.5.9c.7.5 1 1.5 1 3 0 1.3-.3 2.2-1 2.8-.7.6-1.5 1-2.5 1s-1.8-.4-2.5-1-1-1.5-1-2.9z"
              fill="#E63A2E"
            />
          </svg>
        </TransitionLink>
      </LogoContainer>

      <ContactWrapper>
        <a href="mailto:info@ohhi.se">info@ohhi.se</a>
        <a>+46768023804</a>
      </ContactWrapper>
    </NavBarWrapper>
  )
}

export default NavBar;