import React, { useState } from 'react';
import styles from './index.less';
import { Layout, Drawer, Spin } from 'antd';
import { MenuOutlined, SmileTwoTone } from '@ant-design/icons'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DragMenu from './components/DragMenu';
import Icon from '@/components/Icon';
import AllMenu from './components/AllMenu';
import AllMenuBlock from './components/AllMenuBlock';
import { connect } from 'dva';
import { getValueOnMetas, isMobie } from '@/utils/utils';
import { EventContext } from './event-context.js';

const { Header, Content } = Layout;

class NaseLayout extends React.Component {
  state = {
    visible: false,
    childVisible: false,
    menuData: [],
    isLoading: false,
    visibleAllMenuBlock: false,
  }
  onCloseChildreDrawer(e) {
    e.preventDefault();
  }
  // 格式化我的收藏菜单
  getCollectData() {
    const { collectMenu=[] } = this.props;
    const res = [];
    Array.isArray(collectMenu) && collectMenu.forEach((item) => {
      const metas = item.metas;
      const path = getValueOnMetas(metas, 'path');
      const icon = getValueOnMetas(metas, 'icon'); // 已经设定好的icon
      const base = getValueOnMetas(metas, 'base');

      res.push({
        id: item.id,
        name: item.title,
        path: base,
        icon: icon,
        order_index: item.order_index
      });
    });
    return res;
  }
  // 收藏操作
  onCollect(item, isCollect) {
    const { dispatch } = this.props;
    
    dispatch({
      type: 'user/putCollect',
      payload: {
        id: item.id,
        status: isCollect,
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
    });
    console.log('收藏操作', item, isCollect);
  }
  // 拖拽改变收藏的位置
  onChangeCollectPosition(currEl, sourceEl) {
    const { dispatch } = this.props;
    const beforeId = sourceEl.id;
    const id = currEl.id;

    dispatch({
      type: 'user/changeCollectOrderIndex',
      payload: {
        id: id,
        beforeId: beforeId
      },
      callback: () => {
        dispatch({
          type: 'user/fetchColletMenu'
        });
      }
    })
  }
  // 点击跳转链接
  onClickLink(item) {
    // 记录访问历史
    this.recordAccessMenu(item);
    this.setState({
      visibleAllMenuBlock: false,
      visible: false,
    });    
  }
  // 记录历史访问菜单
  recordAccessMenu(item) {
    const { historyMenu=[], dispatch } = this.props;
    const id = item.id;
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
  // 搜索菜单
  onSearch(value) {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/searchMenu',
      payload: {
        value: value
      }
    });
  }
  render() {
    const {
      children,
      headerRightContentRender,
      headerLeftContentRender,
      allMenu,
      historyMenu,
      loading,
    } = this.props;
    const {
      visible,
      childVisible,
      isLoading,
      visibleAllMenuBlock,
    } = this.state;

    const collectMenuData = this.getCollectData();

    return (
      <Layout>
        <Header
          className={styles.header}
          theme = 'light'
          style={{
            backgroundColor: '#fff',
            boxShadow: '2px 0 6px rgba(0, 21, 41, 0.35)',
            zIndex: '11',
            color: '#333'
          }}
        >
          <div
            className={styles.headerleft}
          >
            <div>
              <MenuOutlined 
                // style={{color: '#fff'}}
                onClick={() => this.setState({visible: !visible})}
              />
            </div>
            <div
              className={styles.shortctMenu}
            >
              {
                headerLeftContentRender &&
                headerLeftContentRender()
              }
            </div>
          </div>
          <div>
            {
              headerRightContentRender &&
              headerRightContentRender()
            }
          </div>
        </Header>
        <Drawer
          visible={visible}
          onClose={() => this.setState({visible: false})}
          placement="left"
          destroyOnClose
          closable={false}
          zIndex={100}
          mask={!visibleAllMenuBlock}
          bodyStyle={{
            padding: 0
          }}
          footer={<div>
            <SmileTwoTone 
              style={{marginRight: '10px'}}
            />
            你的快捷菜单
          </div>}
        >
          <AllMenu
            icon="ERP_tihuoxinxi"
            title="所有产品"
            isActive={visibleAllMenuBlock}
            onClick={() => {
                if (isMobie()) {
                  this.setState({
                    visible: false,
                  })
                } else {
                  this.setState({visibleAllMenuBlock: true})
                }
              }
            }
          />
          <DragMenu 
            isLoading={isLoading}
            data={collectMenuData}
            onChangePosition={this.onChangeCollectPosition.bind(this)}
            onRemove={(value) => {
              this.onCollect(value, false);
            }}
            onClickMenuItem={this.onClickLink.bind(this)}
          />
        </Drawer>
        <EventContext.Provider
          value={{
            onCollect: this.onCollect.bind(this),
            onClickLink: this.onClickLink.bind(this)
          }}
        >
          <AllMenuBlock
            historyData={historyMenu}
            allData={allMenu}
            onSearch={this.onSearch.bind(this)}
            visible={visibleAllMenuBlock}
            onClose={() => this.setState({visibleAllMenuBlock: false})}
          />
        </EventContext.Provider>
        <Content
          theme="ligth"
        >
          {
            loading
            ?
            <div
              className={styles.spinContainer}
            >
              <Spin 
                size="large"
                
              />
            </div>
            : null
          }
          {children}
        </Content>
      </Layout>
    )
  }
}

export default connect(({ user }) => ({
  collectMenu: user.collectMenu,
  historyMenu: user.historyMenu,
  allMenu: user.allMenu
}))(NaseLayout);