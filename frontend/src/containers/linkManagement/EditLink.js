import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { editLink, changeValue, reset } from '../../modules/editLink'
import { Link } from 'react-router-dom'
import InfoBox from '../../components/typography/InfoBox'
import Spinner from '../../components/misc/Spinner'
import { goBack } from 'react-router-redux'
import Button from '../../components/typography/Button'

import LinkForm from '../../components/forms/LinkForm'

class EditLink extends Component {

  componentDidMount() {
    const { reset, changeValue, url } = this.props
    reset()
    // Set default values
    changeValue('url', url)
  }

  render() {
    const {
      url,
      managementHash,
      editLink,
      goBack,
      changeValue,
      editLinkForm
    } = this.props

    return <div>
      <LinkForm
        onSubmit={ url => editLink(managementHash, url) }
        onValueChange={ changeValue }
        { ...editLinkForm }
        texts={{
          submit: 'Update URL',
          submitting: 'Processing...',
          urlInputPlaceholder: 'Paste URL you want to make shorter.'
        }}
      />
      <Button onClick={ e => goBack() } small>
        Cancel
      </Button>
    </div>
  }
}

EditLink.propTypes = {
  url: PropTypes.string.isRequired,
  managementHash: PropTypes.string.isRequired,
  editLink: PropTypes.func.isRequired,
  editLinkForm: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.any,
    inputs: PropTypes.shape({
      url: PropTypes.object.isRequired
    }).isRequired
  }).isRequired,
  goBack: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  editLink,
  goBack,
  reset,
  changeValue,
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  editLinkForm: state.editLinkForm
})

export default connect(mapStateToProps, mapDispatchToProps)(EditLink)

