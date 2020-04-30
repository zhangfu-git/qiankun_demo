import request from '@/utils/request';
import { stringify } from 'qs';
import defaultSettings from '../../config/defaultSettings';

const { orgId } = defaultSettings;

export async function query() {
  return request('/api/users');
}

// 获取userme进行身份验证
export async function queryCurrent() {
  // return request('/api/currentUser');
  return request('/api/v0/user/me?refresh=true');
}

export async function queryNotices() {
  return request('/api/notices');
}

// 获取我的收藏菜单
export async function queryColletMenu() {
  const query = stringify({
    categories: ['应用'],
    cateIsAlias: 'true', 
    status: ['close'],
    skip: 0,
    limit: 1000,
    metas: JSON.stringify(['name', 'base', 'icon', 'entry', 'mountElementId', 'entry_dev'])
  });
  return request(`/api/v0/user/favorPostList?${query}`)
}

// 获取我最近的访问菜单历史
export async function queryHistoryMenu() {
  const query = stringify({
    categories: ['应用'],
    cateIsAlias: 'true', 
    skip: 0,
    limit: 6,
    status: ['close'],
    metas: JSON.stringify(['name', 'base', 'icon', 'entry', 'mountElementId', 'entry_dev'])
  });
  return request(`/api/v0/user/seenPostList?${query}`)
}

// 获取所有的菜单
export async function queryAllMenu() {
  const query = stringify({
    filter: JSON.stringify({
      categories: ['应用'],
      cateIsAlias: 'true',
      status: ['close'],
    }),
    skip: 0,
    limit: 1000,
    metas: JSON.stringify(['name', 'base', 'icon', 'entry', 'mountElementId', 'entry_dev'])
  })
  return request(`/api/v0/post/list?${query}`)
}

/**
 * 收藏菜单（喜欢）
 * @param {number}  id     post的id
 * @param {boolean} status 状态(true or false)
 */
export async function collect(id, status) {
  return request(`/api/v0/post/${id}/favor`, {
    method: 'PUT',
    data: {
      status: status
    }
  })
}

/**
 * 记录最近使用历史(想看)
 * @param {number}  id     post的id
 * @param {boolean} status 状态(true or false) 
 */
export async function putSeen(id, status) {
  return request(`/api/v0/post/${id}/seen`, {
    method: 'PUT',
    data: {
      status: status
    }
  })
}

/**
 * 根据标题搜索菜单
 * @param {string} value 要搜索的字段
 */
export async function searchMenu(value) {
  const rmTrim = typeof value === 'string' && value.trim();
  const query = stringify({
    filter: JSON.stringify({
      categories: ['应用'],
      cateIsAlias: 'true',
      status: ['close'],
      title: rmTrim
    }),
    skip: 0,
    limit: 10,
    metas: JSON.stringify(['name', 'base', 'icon', 'entry', 'mountElementId', 'entry_dev'])
  })
  return request(`/api/v0/post/list?${query}`)
}

/**
 * 修改post的排序号, 进行排序
 * @param {*} id              post的id
 * @param {number} beforeId   排到谁之前的id
 */
export async function changeOrderIndex(id, beforeId) {
  return request(`/api/v0/post/${id}/order_index`, {
    method: 'PUT',
    data: {
      beforeId: beforeId
    }
  });
}