import request from '@/utils/request';

// 账号密码登录
export async function fakeAccountLogin(params) {
  return request('/api/v0/auth/login', {
    method: 'POST',
    data: params,
  });
}

// 获取登录验证码
export async function getFakeCaptcha(phone, orgId) {
  return request('/api/v0/auth/vcode', {
    method: 'POST',
    data: {
      phone: phone,
      orgId: orgId
    }
  });
}

// 手机号+验证码登录
export async function fakeViaPhoneLogin(params) {
  return request('/api/v0/auth/loginViaPhone', {
    method: 'POST',
    data: params
  });
}

// 登出
export async function logout() {
  return request('/api/v0/auth/logout');
}