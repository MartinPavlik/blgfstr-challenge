import React, { PropTypes } from 'react'
import styled from 'styled-components'


const Container = styled.div`
  width: 90%;
  margin: 2em auto;
  border-radius: 20px;
  padding: 1em;
  @media (min-width: 720px) {
    width: 80%;
  }

  @media (min-width: 1024px) {
    width: 780px;
  }
`

const CenteredLayout = ({children}) => (
  <Container>
    { children }
  </Container>
)

export default CenteredLayout