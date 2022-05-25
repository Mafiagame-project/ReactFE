import React from 'react'
import styled from 'styled-components'
import badge from '../assets/image/page/설문배너.png'

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
          style={{
            width: '175px',
            borderRadius: '17px',
            boxShadow: 'rgb(100 100 111 / 20%) 0px 7px 29px 0px',
          }}
        />
      </Banner>
    </>
  )
}

const Banner = styled.div``
export default SurveyBadge
