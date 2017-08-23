import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { deleteLink } from '../../modules/deleteLink'
import InfoBox from '../../components/typography/InfoBox'
import Spinner from '../../components/misc/Spinner'
import { Table, Tbody, Tr, Td } from '../../components/misc/Table'
import Hr from '../../components/misc/Hr'
import { Switch, Route, Link } from 'react-router-dom'
import Button from '../../components/typography/Button'
import Block from '../../components/structure/Block'

const ButtonLink = Button.withComponent(Link)

class Dashboard extends Component {
  render() {

    const {
      hash,
      url,
      match
    } = this.props

    const { params: { managementHash } } = match

    const redirectUrl = 'http://localhost:8888/' + hash
    const managementUrl = 'http://localhost:8889/link/' + managementHash

    return (
      <div>
        <InfoBox>
          <h3>Your link <em><a href={ url } target="_blank">{ url }</a></em> has been shortened to:</h3>
          <h2>
            <a href={ redirectUrl } target="_blank">
              { redirectUrl }
            </a>
          </h2>
          <hr />
          <p>
            Please, save following link
            {' '}
            <strong>
              <a href={ managementUrl }>
                { managementUrl }
              </a>
            </strong>
            {' '}
            in case that you would like to <strong>edit or delete</strong> this link in the future.
          </p>
        </InfoBox>
        <Block>
          <Table>
            <Tbody>
              <Tr>
                <Td>
                  Original URL:
                </Td>
                <Td>
                  <a href={ url }>
                    { url }
                  </a>
                </Td>
              </Tr>
              <Tr>
                <Td>
                  Link management url:
                </Td>
                <Td>
                  <a href={ managementUrl }>
                    { managementUrl }
                  </a>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Block>
        <Block>
          <ButtonLink to={match.url + '/edit'} success>
            Change link URL
          </ButtonLink>
          {' '}
          <ButtonLink to={match.url + '/delete'} fail>
            Delete link
          </ButtonLink>
        </Block>
      </div>
    )
  }
}

Dashboard.propTypes = {
  url: PropTypes.string.isRequired,
  managementHash: PropTypes.string.isRequired,
  deleteLink: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.any
}

const mapDispatchToProps = {
  deleteLink
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.deleteLink
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

