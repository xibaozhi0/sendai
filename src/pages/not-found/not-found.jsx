import React, {Component} from 'react'
import {Button, Row, Col} from 'antd'
import {connect} from 'react-redux'

import {setHeadTitle} from '../../redux/actions'
import './not-found.less'

/*
front-end 404 page
 */
class NotFound extends Component {

  goHome = () => {
    this.props.setHeadTitle('ホーム')
    this.props.history.replace('/home')
  }

  render() {
    return (

      <Row className='not-found'>
        <Col span={12} className='left'></Col>
        <Col span={12} className='right'>
          <h1>404</h1>
          <h2>sorry, the page you are looking for is not existing</h2>
          <div>
            <Button type='primary' onClick={this.goHome}>
            ホームページに戻る
            </Button>
          </div>
        </Col>
      </Row>
    )
  }
}

export default connect(
  null,
  {setHeadTitle}
)(NotFound)