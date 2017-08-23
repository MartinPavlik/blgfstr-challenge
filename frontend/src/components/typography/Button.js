import React, { PropTypes } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  padding: 0.7em;
  border-radius: 5px;
  font-size: ${props => {
    if (props.large) {
      return '1.2em'
    }
    if (props.small) {
      return '0.8em'
    }
    return '1em'
  }};
  background-color: ${props => {
    if (props.success) {
      return '#5bb75c'
    }
    if (props.fail) {
      return '#f15353'
    }
    return '#444'
  }};
  color: white;
  font-weight: bold;
  border: 0;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
`

Button.propTypes = {
  success: PropTypes.any,
  fail: PropTypes.any,
  large: PropTypes.any,
  small: PropTypes.any
}

export default Button
