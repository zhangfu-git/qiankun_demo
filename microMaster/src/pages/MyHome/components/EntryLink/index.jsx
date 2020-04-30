import React, { useState } from 'react';
import { Link } from 'umi';
import { Row, Col, Tooltip } from 'antd';
import { getValueOnMetas, isMobie } from '@/utils/utils';
import Icon from '@/components/Icon';
import styles from './index.less';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { connect } from 'dva';

const Entry = (props) => {
  const { isCanCollect=false, dispatch, historyMenu=[] } = props;
  const metas = props.metas;
  const name = getValueOnMetas(metas, 'name');
  const base = getValueOnMetas(metas, 'base');
  const icon = getValueOnMetas(metas, 'icon');
  const entry = getValueOnMetas(metas, 'entry');

  const title = props.title;
  const isFavor = props.userFavor === 1;
  const [isHover, setIsHover] = useState(false);
  const id = props.id;

  const onCollect = (status) => {
    dispatch({
      type: 'user/putCollect',
      payload: {
        id: id,
        status: status,
      },
      callback: () => {
        dispatch({
          type: 'user/fetchAllMenu'
        });
        dispatch({
          type: 'user/fetchColletMenu'
        });
        dispatch({
          type: 'user/fetchHistoryMenu'
        });
      }
    })
  }

  const recordAccessMenu = () => {
    let isExist = Array.isArray(historyMenu) && historyMenu.findIndex((item) => item.id === id) > -1;
    if (!isExist) {
      dispatch({
        type: 'user/putSeen',
        payload: {
          id: id,
          status: true,
        },
        callback: () => {
          dispatch({
            type: 'user/fetchHistoryMenu'
          })
        }
      });
    }
  }  

  return (
    <Col
      xs={{span: 12}}
      md={{span: 12}}
      lg={{span: 8}}
      xl={{span: 6}}
    >
      <Link
        className={styles.entry}
        to={base}
        onClick={recordAccessMenu}
        onMouseEnter={setIsHover.bind(this, true)}
        onMouseLeave={setIsHover.bind(this, false)}
      >
        <Row
          align="middle"
          justify="space-between"
          style={{width: '100%'}}
        >
          <Col>
            {
              icon && <Icon 
                type={icon}
                style={{fontSize: '20px', marginRight: '5px'}}
              />
            }
            {title}
          </Col>
          {
            ((isHover && isCanCollect)  || isMobie()) &&
            <Col>
              {
                isFavor
                ?
                <Tooltip
                  title="取消收藏"
                >
                  <HeartFilled
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onCollect(false);
                    }}
                    style={{
                      color: '#40a9ff'
                    }}
                  />
                </Tooltip>
                :
                <Tooltip
                  title="添加快捷功能"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCollect(true);
                  }}
                >
                  <HeartOutlined />
                </Tooltip>
              }
            </Col>
          }
        </Row>
      </Link>
    </Col>
  )
}

export default connect(({ user }) => ({
  historyMenu: user.historyMenu,
}))(Entry);