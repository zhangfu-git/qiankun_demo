import React from 'react';
import ReactDOM from 'react-dom';
import defaultSettings from '../config/defaultSettings';

const mountElementId = defaultSettings.mountElementId;

// 用来接收一些父容器传递进来的参数
window.microMaster = {
  logout: () => {

  },
  parentHistory: () => {

  }
}

export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('appB bootstrap', props);
    if (props && typeof props.logout === 'function') {
      window.microMaster.logout = props.logout;
    }
    if (props && toString.call(props.parentHistory) === '[object Object]') {
      window.microMaster.parentHistory = props.parentHistory;
    }
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log('appB mount', props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    console.log('appB unmount', props);
    ReactDOM.unmountComponentAtNode(document.getElementById(mountElementId))
  },
};