import React, { PropTypes } from 'react'
import styled from 'styled-components'

const getBorderStyle = (props) => {
  let size = '10px'
  if (props.small) size = '2px'

  let color = 'rgba(255,255,255,0.3)'
  if (props.success) color = '#5bb75c'
  if (props.fail) color = '#f15353'

  return `${size} solid ${color}`
}

const Container = styled.div`
  padding: 1em;
  background-color: ${ props => {
    if (props.success) {
      return '#46a047'
    }
    if (props.fail) {
      return '#bf454c'
    }
    if (props.small) {
      return 'transparent'
    }
    return 'rgba(255,255,255,0.3)'
  }};
  border: ${ getBorderStyle };
  border-radius: 5px;
  color: white;

  h4, h3, h2 {
    margin: 0.75em 0;
  }

  hr {
    border: 1px solid ${ props => {
      if (props.success) {
        return '#5bb75c'
      }
      if (props.fail) {
        return '#f15353'
      }
      return 'rgba(255,255,255,0.3)'
    }};
  }
`

const Notification = ({children, ...props}) => (
  <Container { ...props }>
    { children }
  </Container>
)

Notification.propTypes = {
  success: PropTypes.any,
  fail: PropTypes.any,
  children: PropTypes.any
}

export default Notification
