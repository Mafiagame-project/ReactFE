import React from 'react'
import styled from 'styled-components'
import badge from '../assets/banner.png'

const SurveyBadge = () => {
  return (
    <>
      <Banner
        onClick={() => {
          window.open('https://forms.gle/eKMdCZFPJWKKcdVW6')
        }}
      >
        <img
          src={badge}
          alt="badge"
          style={{ width: '127px', borderRadius: '10px' }}
        />
      </Banner>
    </>
  )
}

const Banner = styled.div`
  margin: 0 auto;
  box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
`
export default SurveyBadge
