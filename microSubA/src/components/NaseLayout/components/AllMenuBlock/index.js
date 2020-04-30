import React from 'react';
import { Drawer, Input, Row, Col } from 'antd';
import HistoryUse from './HistoryUse';
import List from './List';
import styles from './index.less';
import throttle from 'lodash/throttle';

const { Search } = Input;

export default class AllMenuBlock extends React.PureComponent {
  onClose() {
    this.props.onClose && this.props.onClose();
  }
  emitOnSearch = throttle((value) => {
    this.props.onSearch && this.props.onSearch(value);
  }, 300)
  onSearch(e) {
    this.emitOnSearch(e);
  }
  onInputSearch(e) {
    const target = e.currentTarget;
    const value = target.value;
    this.emitOnSearch(value);
  }
  render() {
    const { visible = false, historyData, allData } = this.props;

    const _styles = visible ? {
      left: '256px'
    }: {};
    return (
      <Drawer
        visible={visible}
        placement="left"
        style={_styles}
        width={600}
        zIndex={99}
        title="应用菜单"
        destroyOnClose
        onClose={this.onClose.bind(this)}
      >
        <Search
          onInput={this.onInputSearch.bind(this)}
          onSearch={this.onSearch.bind(this)}
        />
        <div
          className={styles.mrgT20}
        >
        </div>
        <HistoryUse
          data={historyData}
        />
        <div className={styles.mrgT20}></div>
        <List
          data={allData}
        />
      </Drawer>
    )
  }
}
