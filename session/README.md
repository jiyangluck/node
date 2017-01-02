# 用户登录和注册详解

#### http协议
1. 请求报文
2. 响应报文
3. 请求和相应的区别
4. url格式
5. cookie

#### cookie
1. 向客户端写cookie
2. 获取客户端的cookie
3. 使用cookie验证登录
4. cookie-parser: npm install cookie-parser
5. 使用cookie-parser设置cookie:res.cookie('name','value',{maxAge:10*1000})cookie时间10秒。
6. 使用cookie实现登录状态保持功能。

#### session
1. cookie是在客户端记录状态，session就是在服务器端记录状态。
2. 会员卡的例子。
