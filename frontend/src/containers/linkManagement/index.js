import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'

import InfoBox from '../../components/typography/InfoBox'
import Spinner from '../../components/misc/Spinner'
import { Table, Tbody, Tr, Td } from '../../components/misc/Table'
import Hr from '../../components/misc/Hr'

import { fetchLink } from '../../modules/linkManagement'

import DeleteLink from './DeleteLink'
import EditLink from './EditLink'
import Dashboard from './Dashboard'

class LinkManagement extends Component {

  componentDidMount() {
    const { fetchLink, match: { params: { managementHash } } } = this.props
    fetchLink(managementHash)
  }

  renderEdit() {
    return <h1>edit</h1>
  }

  render() {
    const {
      link,
      match
    } = this.props

    const {
      loading,
      loaded,
      hash,
      error,
      url
    } = link

    const { params: { managementHash } } = match

    if ( loading ) {
      return <Spinner>
        Loading information about link...
      </Spinner>
    }

    if ( error ) {
      return <InfoBox fail>
        <h2>We are sorry</h2>
        <hr />
        <p>
          It seems that this link is not in our database :-(
        </p>
      </InfoBox>
    }

    return <Switch>
      <Route
        path={match.url + '/delete'}
        component={
          () => <DeleteLink url={ url } managementHash={ managementHash } />
        }
      />
      <Route
        path={match.url + '/edit'}
        component={
          () => <EditLink url={ url } managementHash={ managementHash } />
        }
      />
      <Route
        path="*"
        component={
          () => <Dashboard url={ url } {...link} match={ match } />
        }
      />
    </Switch>
  }
}

LinkManagement.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      managementHash: PropTypes.string
    })
  }).isRequired,
  fetchLink: PropTypes.func.isRequired,
  link: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.any,
    url: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired
  }).isRequired
}

const mapDispatchToProps = {
  fetchLink
}

const mapStateToProps = (state, ownProps) => ({
  match: ownProps.match,
  link: state.linkManagement
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkManagement)
