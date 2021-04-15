
declare namespace Wechat {
  type GetWechatUserInfo = {
    code: string, 
    state: string
  }
}

declare namespace LoginResponse {
  interface BaseResponse {
    code: number;
    message: string;
    data: any;
  }

  interface GetWechatUser extends BaseResponse {
    data: {
      headimgurl: string
      nickname: string
      scan_type: string
      host: string
    }
  }
}
