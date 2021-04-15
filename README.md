# wechat-auth

#### 介绍
微信授权单公众号多站点解决方案

#### 软件架构
软件架构说明


#### 安装教程
1.  clone 项目
2.  yarn 或者 npm install
3.  yarn start 获取 npm run start

#### 使用说明

1.  项目配置参考umi
2.  打包项目生产的dist文件夹目录上传到nginx站点目录
#### Nginx配置
```
server {
  listen 80;
  listen 443;
  server_name ***.com;
  index index.html index.php;
  root /home/www/wechat/dist;
  # 以下3行匹配不同到前缀请求将发到不同的api服务器、配置多个完成多站点授权
  location /api前缀 {
    proxy_pass https://***.com/实际api前缀;
  }
  location / {
     try_files $uri $uri/ /index.html;
  }
  # 不启用ssl可以注释以下4行 和 上面listen 433
  ssl on;
  ssl_certificate crt证书实际路径;
  ssl_certificate_key 证书钥匙实际路径;
  ssl_session_timeout  5m;
}
```
#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request
