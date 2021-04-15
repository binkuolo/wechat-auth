import { useState, useEffect } from 'react'
import { DesktopOutlined } from '@ant-design/icons';
import { Button, message, Avatar } from 'antd'
import { Helmet, history } from 'umi'
import styles from './login.less';
import { get_wechat_user, wechat_user_confirm } from '@/services/wechat/wechat'

export default function Page() {
  const [state, setstate]: [string, any] = useState("")
  const [headimgurl, setheadimgurl] = useState("")
  const [nickname, setnickname] = useState("")
  const [title, settitle] = useState("")
  const [scantype, setscantype] = useState("")
  const [host, sethost] = useState("")
  const [disabled, setdisabled] = useState(false)

  // 拉取微信用户信息
  const getWechatUser = async (c: string, d: string) => {
    const loading = message.loading("正在获取用户信息", 0)
    const res = await get_wechat_user({ code: c, state: d })
    if (res.code === 200) {
      loading()
      sethost(res.data.host)
      if (res.data?.scan_type === "login") {
        settitle("登陆")
      }
      if (res.data?.scan_type === "user_bind") {
        settitle("绑定")
      }
      if (res.data?.scan_type === "forgone_password") {
        settitle("找回")
      }
      setscantype(res.data?.scan_type)
      setheadimgurl(res.data?.headimgurl)
      setnickname(res.data?.nickname)
      setdisabled(true)
    } else {
      setdisabled(false)
      loading()
      message.warn(res.message)
      setTimeout(() => {
        // @ts-ignore
        document.addEventListener("WeixinJSBridgeReady", () => { WeixinJSBridge.call("closeWindow"); }, false);
        // ios手机
        // @ts-ignore
        WeixinJSBridge.call("closeWindow");
      }, 2000);
    }
  }
  useEffect(() => {
    const a: any = history.location.query?.code
    const b: any = history.location.query?.state
    if (!a || !b) {
      setdisabled(false)
      // @ts-ignore
      document.addEventListener("WeixinJSBridgeReady", () => { WeixinJSBridge.call("closeWindow"); }, false);
      // ios手机
      // @ts-ignore
      WeixinJSBridge.call("closeWindow");
    }
    setstate(b)
    getWechatUser(a, b)
    return () => {

    }
  }, [])
  // 登陆确认
  const doLogin = async () => {
    const res = await wechat_user_confirm({ scan_type: scantype, state })
    if (res.code === 200) {
      message.success(res.message, () => {
        // 微信浏览器关闭
        // 安卓手机

        // @ts-ignore
        document.addEventListener("WeixinJSBridgeReady", () => { WeixinJSBridge.call("closeWindow"); }, false);
        // ios手机
        // @ts-ignore
        WeixinJSBridge.call("closeWindow");
      })
    } else {
      message.info(res.message)
    }
  }
  return (
    <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>正在微信{title}</title>
      </Helmet>

      <div className={styles.warp}>
        <div className={styles.headimg}>
          <Avatar style={{ width: 128, height: 128 }} src={headimgurl}></Avatar>
        </div>
        <div className={styles.nickname}>
          {nickname}
        </div>
        <div className={styles.host}>正在尝试电脑浏览器登陆</div>
        <div className={styles.host}>请确认是否本人操作</div>
        <div className={styles.host}><DesktopOutlined className={styles.icon} />{host}</div>
        <div className={styles.btn}>
          <Button type="primary" disabled={!disabled} size="large" style={{ height: 50, width: 250 }} shape="round" block onClick={doLogin}> 确认{title} </Button>
        </div>
      </div>
    </div>
  )
}
