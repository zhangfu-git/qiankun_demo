import styles from './index.less';
import { Row, Col } from 'antd';
import Icon from '@/components/Icon';

export default function Panel(props) {
  const { title, count, unit, icon, keyStyle={}, valueStyle={} } = props;
  return (
    <Row
      align="center"
      justify="space-between"
    >
      <Col
        className={styles.panelKey}
        style={{...keyStyle}}
      >
        {
          icon
          ?
          <span
            className={styles.iconBox}
          >
            <Icon 
              type={icon} 
              style={{fontSize: '30px'}}
            />
          </span>
          : null
        }
        {title}
      </Col>
      <Col
        className={styles.panelValue}
        style={{...valueStyle}}
      >
        {count}
        {unit ? unit: ''}
      </Col>
    </Row>
  )
}