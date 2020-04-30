import React from 'react';
import { connect } from 'dva';
class Settings extends React.Component {
  logout() {
    console.log('点击登录出')
    this.props.dispatch({
      type: 'login/logout'
    });
  }
  render() {
    return (
      <div>
        系统设置
        <button
          onClick={this.logout.bind(this)}
        >
          测试登出
        </button>
      </div>
    )
  }
}

export default connect(({ login }) => ({
  
}))(Settings);