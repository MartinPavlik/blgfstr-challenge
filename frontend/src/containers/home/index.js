import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import LinkForm from '../../components/forms/LinkForm'
import { createLink, changeValue, reset } from '../../modules/createLink'


class Home extends Component {

  componentDidMount() {
    const { reset } = this.props
    reset()
  }

  render() {
    const { createLink, changeValue, createLinkForm } = this.props
    return (
      <LinkForm
        onSubmit={ createLink }
        onValueChange={ changeValue }
        { ...createLinkForm }
        texts={{
          submit: 'Submit',
          submitting: 'Processing...',
          urlInputPlaceholder: 'Paste URL you want to make shorter.'
        }}
      />
    )
  }
}

Home.propTypes = {
  createLink: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  createLinkForm: PropTypes.object.isRequired
}

const mapDispatchToProps = {
  createLink,
  changeValue,
  reset
}

const mapStateToProps = (state, ownProps) => ({
  createLinkForm: state.createLinkForm
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
