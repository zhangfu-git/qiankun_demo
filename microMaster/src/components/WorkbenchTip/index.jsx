import { Avatar, Row, Col } from 'antd';
import { connect } from 'dva';
import dayjs from 'dayjs';
import styles from './index.less';

const WorkbenchTip = (props) => {
  const { currentUser={} } = props;
  const { avatarUrl, nickName } = currentUser;
  console.log('问候语: ', currentUser);
  const hour = dayjs().get('hour');
  let descHour = '';

  if (hour >= 7 && hour < 9) {
    descHour = '早晨';
  } else if (hour >= 9 && hour < 11) {
    descHour = '上午';
  } else if (hour >=11 && hour < 13) {
    descHour = '中午';
  } else if (hour >= 13 && hour < 15) {
    descHour = '下午';
  } else if (hour >= 15 && hour < 17) {
    descHour = '傍晚';
  } else if (hour >= 17 && hour < 19) {
    descHour = '黄昏';
  } else if (hour >= 19 && hour < 21) {
    descHour = '晚上';
  } else if (hour >= 21 && hour < 23) {
    descHour = '深夜';
  } else if (hour >= 23 && hour <= 24) {
    descHour = '子夜';
  }


  return (
    <Row
      gutter={20}
      align="middle"
      className={styles.workbenchTip}
    >
      <Col>
        <Avatar 
          size={60}
          src={avatarUrl}
        />
      </Col>
      <Col>
        <div>
          <div
            className={styles.descHour}
          >
            {descHour}
          </div>
          <span
            className={styles.nickName}
          >
          {nickName} 你好, 欢迎来到工作台!
          </span>
        </div>
      </Col>
    </Row>
  )
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(WorkbenchTip);