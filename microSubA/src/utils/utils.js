import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/zh-cn';

dayjs.extend(utc)
dayjs.locale('zh-cn');
dayjs.extend(localizedFormat);

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

/**
 * @param {object} response 标准的请求返回
 * @return {boolean} 是否正确的返回
 */
export function isResOk(response) {
  if (response && response.code === 0) {
    return true;
  }
  return false;
}

/**
 * json字符串解析
 * @param {string} value
 * @return {Object} 
 */
export function jsonParse(value) {
  let res;
  try {
    res = JSON.parse(value);
  } catch (e) {}
  return res;
}

/**
 * json序列表
 * @param {Object} value
 * @return {string}
 */
export function jsonStringify(value) {
  let res = '';
  try {
    res = JSON.stringify(value);
  } catch (e) {}
  return res;
}

/**
 * 检测是否为JSON字符串
 * @param {*} str 
 * @return {boolean}
 */
export function isJSONString(str) {
  if (typeof str !== 'string') return false;

  let strLen = str.length;
  let firstStr = str.charAt(0);
  let latestStr = str.charAt(strLen - 1);

  if (['{', '['].indexOf(firstStr) > -1 && [']', '}'].indexOf(latestStr) > -1) {
    return true;
  }
  return false;
}

/**
 * 根据metas和key获取对应的value
 * @param {object} metas
 * @param {string} key
 * @return {*}
 */
export function getValueOnMetas(metas, key) {
  if (!metas) return;
  let res = '';
  for (let i = 0, len = metas.length; i < len; i++) {
    if (!metas[i]) break;
    if (metas[i].key === key) {
      let currValue = metas[i].value;
      if (isJSONString(currValue)) {
        res = jsonParse(currValue);
      } else {
        res = currValue;
      }
      break;
    }
  }
  return res;
}

/**
 * 是否为函数
 * @param {function} fn
 * @return {boolean}
 */
export function isFunction(fn) {
  return toString.call(fn) === '[object Function]';
}

// 检测是否为手机端
export function isMobie() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
  var flag = false;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}

/**
 * 格式化时间
 * @param {*} date 
 * @param {*} format 
 */
export function formatDate(date, format = 'YYYY年M月D日 HH:mm') {
  let _dayjsObject = false;

  if (dayjs.isDayjs(date)) {
    // 直接是一个dayjs对象
    _dayjsObject = date;
  } else if (dayjs(date).isValid()) {
    // 一个有效的时间
    _dayjsObject = dayjs(date)
  } else {
    // 非dayjs对象，并且是一个无效时间, 返回一个空
    return '';
  }

  if (_dayjsObject.isUTC()) {
    return _dayjsObject.utcOffset(+8).format(format);
  } else {
    return _dayjsObject.utc().utcOffset(+8).format(format);
  }
}