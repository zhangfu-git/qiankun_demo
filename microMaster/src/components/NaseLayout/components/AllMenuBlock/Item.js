import React from 'react';
import styles from './index.less';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Link } from 'umi';
import { getValueOnMetas } from '@/utils/utils';
import { EventContext } from '../../event-context.js';
import { Tooltip } from 'antd';

export default class Item extends React.Component {
  render() {
    const { data } = this.props;
    const isFavor = data.userFavor === 1;
    const metas = data.metas;
    const path = getValueOnMetas(metas, 'path');
    const base = getValueOnMetas(metas, 'base');

    return (
      <EventContext.Consumer>
        {
          ({ onClickLink, onCollect }) => (
            <Link
              className={styles.item}
              to={base}
              onClick={onClickLink.bind(null, data)}
            >
              <div
                className={styles.left}
              >
                {data.title}
              </div>
              <div
                className={styles.right}
              >
                {
                  isFavor
                  ?
                  <Tooltip
                    title="从快捷功能移除"
                  >
                    <HeartFilled
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onCollect.call(null, data, false);
                      }}
                      style={{
                        color: '#40a9ff'
                      }}
                    />
                  </Tooltip>
                  :
                  <Tooltip
                    title="添加到快捷功能"
                  >
                    <HeartOutlined
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onCollect.call(null, data, true);
                      }}
                    />
                  </Tooltip>
                }
              </div>
            </Link>
          )
        }
      </EventContext.Consumer>
    )
  }
}