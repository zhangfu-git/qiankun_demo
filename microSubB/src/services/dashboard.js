import request from '@/utils/request';
import { stringify } from 'qs';

// 获取日志列表
export async function fetchLogList(query={}) {
  query = stringify(query);
  return request(`/api/v0/log/list?${query}`);
}

// 获取统计数量列表
export async function fetchCountList(query={}) {
  query = stringify(query);
  return request(`/api/v0/count/list?${query}`);
}