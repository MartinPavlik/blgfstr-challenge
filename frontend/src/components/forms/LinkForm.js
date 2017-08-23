import React, { PropTypes } from 'react'
import styled from 'styled-components'

import Button from '../typography/Button'
import TextInput from './TextInput'
import InfoBox from '../typography/InfoBox'


const Form = styled.form`
  width: 100%;
`

const Container = styled.div`
  display: flex;
  margin: 1em 0;
`

const StyledTextInput = TextInput.extend`
  padding: 0.7em;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  width: 80%;
  font-size: 1.2em;
  border: 0;
`

const SubmitButton = Button.extend`
  padding: 0.7em;
  width: 20%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

const SubmittingButton = SubmitButton.extend`
  cursor: wait;
`

class LinkForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault()
    const { onSubmit, inputs: { url: { value } } } = this.props
    return onSubmit(value)
  }

  handleValueChange(name, value) {
    const { onValueChange } = this.props
    return onValueChange(name, value)
  }

  render() {

    const { loading, error, inputs, loaded, texts } = this.props

    return (
      <Form onSubmit={ this.handleSubmit.bind(this) }>

        {
          error != null &&
          <InfoBox fail>
            {
              error
            }
          </InfoBox>
        }

        <Container>
          <StyledTextInput
            name="url"
            placeholder={ texts.urlInputPlaceholder }
            onChange={ (e) => this.handleValueChange('url', e.target.value)}
            value={ inputs.url.value }
            meta={{
              touched: inputs.url.touched,
              error: inputs.url.error
            }}
          />

          {
            loading == false ?
            (
              <SubmitButton type="submit" success large>
                { texts.submit }
              </SubmitButton>
            ) : (
              <SubmittingButton type="button" large>
                { texts.submitting }
              </SubmittingButton>
            )
          }
        </Container>

      </Form>
    )
  }
}

LinkForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  inputs: PropTypes.object.isRequired,
  error: PropTypes.any, // can be null
  texts: PropTypes.shape({
    submit: PropTypes.string.isRequired,
    submitting: PropTypes.string.isRequired,
    urlInputPlaceholder: PropTypes.string.isRequired
  }).isRequired
}


export default LinkForm
