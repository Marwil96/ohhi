import React, { useEffect } from 'react';
import styled from "styled-components"
import { breakpoint } from "../mixins/breakpoint"
import NavBar from './NavBar';
import { animated } from "react-spring"
import SEO from './SEO';
import Chat from "@nightborn/signum"
import "@nightborn/signum/dist/index.css"


   const SendMail = ({message, email}) => {
    //  setLoading(true)
     const data = { "text": `From: ${email} ${message}`, "access_token": "4yunhgn4t8q1lquqn82yxju7" }
     fetch("https://postmail.invotes.com/send", {
       method: "post",
       headers: {
         Authorization: `4yunhgn4t8q1lquqn82yxju7`,
         "access_token": "4yunhgn4t8q1lquqn82yxju7",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
         "Content-Type": "application/x-www-form-urlencoded",
       },
       body: JSON.stringify(data),
     })
       .then(response => response.json())
       .then(response => {
         console.log(response)
       })
       .catch(error => {
         console.log(error)
       })
   }

const defaultProps = {
  option: {
    title: "Hallå! 👋",
    subTitle: "Vi är din design och utvecklings partner. Vi tar digitala produkter från ide till lansering och framåt. Vare sig det är en e-shop, hemsida, app eller något helt annat.",
    message: "Vad behöver du hjälp med?",
    name: "Hello there",
  },
  config: {
    openByDefault: false,
    avatarIcon: require("../assets/chat_avatar.png"),
    mainColor: "linear-gradient(90deg, #181D41 0%, #181D41 100%)",
    secondaryColor: "linear-gradient(90deg, #181D41 0%, #181D41 100%)",
    sendButtonColor: "#0074CE",
    finalButtonColor: "linear-gradient(90deg, #181D41 0%, #181D41 100%)",
    emailPlaceholder: "Fyll i din mail",
    messagePlaceholder: "Ge oss lite mer information.",
    finalTitle: "Tack!",
    finalSubTitle: "Vi kommer höra av oss så snart som möjligt.",
    finalButtonText: "Continue",
    handleFinalButtonClicked: () => {},
    handleSendClicked: information => SendMail(information),
  },
}

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
      <SEO
        title="Webbyrå OHHI i Skövde – Din partner för lyckade webbprojekt."
        description="Webbyrå Skövde – Vi hjälper dig att ta digitala produkter från ide till lansering och framåt. Vare sig det är en e-shop, hemsida, app eller något helt annat"
      />
      <Chat {...defaultProps} />
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