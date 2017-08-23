import React from 'react'
import styled from 'styled-components'

const TextInput = ({ input, value, type, meta: { touched, error }, ...props}) => (
  <input
    type={ type }
    {...input}
    value={ value }
    autoComplete="off"
    {...props}
  />
)

export default styled(TextInput)`
  background: white;
  border-radius: 5px;
  border: 1px solid ${props => {
    if ( props.meta && props.meta.error ) {
      return '#5bb75c'
    }
    return 'white';
  }};
`
