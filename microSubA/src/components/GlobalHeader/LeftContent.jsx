import styles from './index.less';
import defaultSettings from '../../../config/defaultSettings'; 
import { Link } from 'umi';

const LeftContent = (props) => {
  return (
    <Link
      to="/center"
    >
      <div className={styles.leftContent}>
        <img alt="logo" className={styles.leftContentLogo} src={defaultSettings.APP_LOGO} />
        <span
          className={styles.leftContentTitle}
        >
          {defaultSettings.SYSTEM_NAME}
        </span>
      </div>
    </Link>
  )
}

export default LeftContent;