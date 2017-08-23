import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledH1 = styled.h1`
	border-bottom: 1px solid rgba(255,255,255,0.3);
	padding: 0.5em 0;
`

const StyledA = styled(Link)`
  text-decoration: none;
  color: white;
`

const LogoLink = ({children, to, ...props}) => (
	<StyledH1 { ...props }>
		<StyledA to={ to }>
      { children }
    </StyledA>
	</StyledH1>
)

export default LogoLink
