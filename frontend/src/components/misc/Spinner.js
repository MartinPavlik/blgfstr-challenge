import React, { PropTypes } from 'react'
import styled from 'styled-components'


/*
  Animation source: http://tobiasahlin.com/spinkit/
*/
const Animation = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${ props => props.color ? props.color : 'white' };
  margin: 100px auto;
  animation: sk-rotateplane 1.2s infinite ease-in-out;

  @-webkit-keyframes sk-rotateplane {
    0% { -webkit-transform: perspective(120px) }
    50% { -webkit-transform: perspective(120px) rotateY(180deg) }
    100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
  }

  @keyframes sk-rotateplane {
    0% {
      transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    } 50% {
      transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    } 100% {
      transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    }
  }
`

const ChildrenContainer = styled.p`
  text-align: center;
  margin-top: -3em;
`

const Spinner = ({children, color, ...props}) => (
  <div { ...props }>
    <Animation color={ color } />
    { children !== undefined &&
      <ChildrenContainer>
        { children }
      </ChildrenContainer>
    }
  </div>
)

Spinner.propTypes = {
  color: PropTypes.string,
  children: PropTypes.any
}

export default Spinner
