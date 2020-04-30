import React from 'react';
import styles from './index.less';
import Icon from '@/components/Icon';
import { RightOutlined } from '@ant-design/icons';
import classNames from 'classNames';
import { Link } from 'umi';
import { isMobie } from '@/utils/utils';

export default function AllMenu(props) {
  const { title, icon, onClick=()=>{}, isActive } = props;
  return (
    <>
      {
        isMobie()
        ?
        null
        :
        <div
          className={classNames({
            [styles.allMenu]: true,
            [styles.active]: isActive
          })}
          onClick={onClick}
        >
          <span
            className={styles.icon}
          >
            {
              icon
              ?
              <Icon 
                type={icon} 
                style={{fontSize: '20px'}}
              />
              : null
            }
          </span>
          <span
            className={styles.title}
          >
            {title}
          </span>
          <RightOutlined 
            className={styles.arrowRight}
          />
        </div>

      }
    </>
  )
}