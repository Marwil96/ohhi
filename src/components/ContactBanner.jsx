import React from 'react';
import styled from 'styled-components';
import { colors } from '../mixins/colors';
import { breakpoint } from "../mixins/breakpoint"

const ContactBannerWrapper = styled.section`
  background-color: #ffd8d8;
  color: #131313;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 4.8rem 1.6rem;
  width: calc(100% + 3.2rem);
  margin-left: -1.6rem;
  align-items: center;

  ${breakpoint.tabPort`
    flex-direction: row;
    padding: 4.8rem 10rem;
    width: calc(100% + 20rem);
    margin-left: -10rem;
  `}

  h3 {
    font-size: 2.4rem;
    margin-bottom: 1.2rem;
    font-weight: 600;
    font-weight: 500;
    color: #e63a2e;
    font-family: 'Fraunces';

    ${breakpoint.tabPort`
      font-size: 3.2rem;
    `}
  }

  span {
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 2.4rem;
    line-height: 150%;

    ${breakpoint.tabPort`
      font-size: 2.4rem;
    `}
  }

  a {
    background-color: ${colors.brightRed};
    padding: 1.6rem;
    width: fit-content;
    color: white;
    font-weight: 400;
    align-items: center;
    display: flex;
    cursor: pointer;
    transition: background-color ease 450ms;

    &:hover {
      background-color: black;

      svg {
        margin-left: 2rem;
      }
    }

    svg {
      width: 2rem;
      margin-left: 1rem;
      margin-top: 2px;
      transition: margin-left ease 250ms;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    flex: 0.5;

    &:last-child {
      display: none;
      ${breakpoint.tabPort`
        display: flex;
      `}
    }
  }

  h2 {
    text-align: right;
    font-size: 2.4rem;
    margin-bottom: 0.6rem;
    font-weight: 400;
  }

  .office_time {
    text-align: right;
    font-size: 6.4rem;
    font-weight: 600;
    margin-bottom: 0;
    line-height: initial;
    font-weight: 500;
    color: #e63a2e;
    font-family: 'Fraunces';
  }
`

const ContactBanner = ({city}) => {

  const date = new Date();
  
  return (
    <ContactBannerWrapper>
      <div>
        <h3>Boka in ett kostnadsfritt möte.</h3>
        <span>
          Vi kan inte visa alla projekt vi har gjort, men vi kan visa hur vi
          tänker. Tveka inte på att höra av dig om du har några funderingar
          kring design, utveckling eller framtida projekt. Vi har hjälpt kunder
          ifrån allt i mellan {city !== undefined ? city : 'Göteborg'}, Edinburgh och Melbourne.
        </span>
        <a href="mailto:info@ohhi.se">
          Boka in möte
          <svg
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 22 22"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.5 10.5a.7.7 0 010 1l-5.3 5.3a.7.7 0 11-1.1-1l4.8-4.8L15 6.2a.7.7 0 111-1l5.4 5.3z"
              fill="#fff"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.7 11a.7.7 0 01-.8.8H2a.8.8 0 110-1.6h19a.7.7 0 01.8.8z"
              fill="#fff"
            />
          </svg>
        </a>
      </div>

      <div>
        <h2>Kontors tid</h2>
        <span className="office_time">
          {`${date.getHours()}:${date.getMinutes()}`} CET
        </span>
      </div>
    </ContactBannerWrapper>
  )
}

export default ContactBanner;