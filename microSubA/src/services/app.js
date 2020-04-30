import request from '@/utils/request';
import { stringify } from 'qs';

export function getApps() {
  return request('/api/v0/apps');
}

// 获取当前应用的菜单数据
export function getCurrentMenuData(params) {
  const query = stringify(params)
  return request(`/api/v0/menuData?${query}`);
}