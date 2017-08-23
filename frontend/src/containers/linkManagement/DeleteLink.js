import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { deleteLink, reset } from '../../modules/deleteLink'
import { Link, Redirect } from 'react-router-dom'
import InfoBox from '../../components/typography/InfoBox'
import Spinner from '../../components/misc/Spinner'
import Button from '../../components/typography/Button'
import Block from '../../components/structure/Block'
import { goBack } from 'react-router-redux'

class DeleteLink extends Component {

  componentDidMount() {
    const { reset } = this.props
    reset()
  }

  render() {
    const { url, managementHash, deleteLink, loading, loaded, error, goBack } = this.props

    if ( loading ) {
      return <Spinner>
        Link is being deleted...
      </Spinner>
    }

    if ( error ) {
      return <InfoBox fail>
        <h2>We are sorry</h2>
        <p>
          Something went wrong and this link can't be deleted :-(
        </p>
      </InfoBox>
    }

    return <div>
      <h2>Do you really want to delete this link?</h2>
      <InfoBox small>
        { url }
      </InfoBox>
      <Block>
        <Button onClick={ e => goBack() }>
          No, I do not
        </Button>
        {' '}
        <Button onClick={ e => deleteLink(managementHash) } fail>
          Yes, delete it
        </Button>
      </Block>
    </div>
  }
}

DeleteLink.propTypes = {
  url: PropTypes.string.isRequired,
  managementHash: PropTypes.string.isRequired,
  deleteLink: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.any,
  goBack: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  deleteLink,
  goBack,
  reset
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.deleteLink
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteLink)

