import request from '@/utils/request';
import { stringify } from 'qs';

export function getApps() {
  const query = stringify({
    filter: JSON.stringify({
      categories: ['应用'],
      cateIsAlias: "true",
      status: ['close']
    }),
    metas: JSON.stringify(['name', 'base', 'icon', 'entry', 'mountElementId', 'entry_dev'])
  });
  return request(`/api/v0/post/list?${query}`);
}