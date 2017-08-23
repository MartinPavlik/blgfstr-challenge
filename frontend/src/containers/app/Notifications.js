import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { hideNotification } from '../../modules/notifications'

import InfoBox from '../../components/typography/InfoBox'
import Button from '../../components/typography/Button'
import Block from '../../components/structure/Block'

export const Notifications = ({notifications, hideNotification}) => (
  <div>
    {
      notifications.map(({id, title, type, content}) => (
        <Block key={ id }>
          <InfoBox success={type == 'success'} fail={type == 'fail'}>
            <h2>{ title }</h2>
            { content ? <hr /> : null}
            { content ? content : null}
            <Button
              small
              success={type == 'success'}
              fail={type == 'fail'}
              onClick={ () => hideNotification(id) }
            >
              Hide this notification
            </Button>
          </InfoBox>
        </Block>
      ))
    }
  </div>
)

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  hideNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  hideNotification
}

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
