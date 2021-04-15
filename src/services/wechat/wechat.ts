import { request } from 'umi';

// 拉取微信用户信息
export async function get_wechat_user(params: Wechat.GetWechatUserInfo) {
  return request<LoginResponse.GetWechatUser>('/operate/wechat/get/user', { method: "GET", params });
}
// 微信用户确认
export async function wechat_user_confirm(params: {scan_type: string, state: string}) {
  return request<LoginResponse.BaseResponse>('/operate/wechat/user/confirm', { method: "GET", params });
}
