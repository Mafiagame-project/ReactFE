import React from 'react'
import { Text, Grid } from '../element/index'
import Header from '../component/Header'

const Tutorial = () => {
  return (
    <>
      <Header />
      <Text>역할 튜토리얼</Text>
      <Text>역할을 선택해주세요</Text>
      <Grid is_flex></Grid>
    </>
  )
}

export default Tutorial
