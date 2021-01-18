import React from 'react';
import PageWrapper from '../components/PageWrapper';

const ErrorPage = ({ transitionStatus, location }) => {
  return (
    <PageWrapper transitionActive={transitionStatus} location={location}>
      <span>404 Sida inte hittad.</span>
    </PageWrapper>
  )
}

export default ErrorPage;