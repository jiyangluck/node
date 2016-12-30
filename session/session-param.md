http://www.voidcn.com/blog/liangklfang/article/p-5749242.html

作用：用指定的参数创建一个session中间件，sesison数据不是保存在cookie中，仅仅sessionID保存到cookie中，session的数据仅仅保存在服务器端 
警告：默认的服务器端的session存储，MemoryStore不是为了生产环境创建的，大多数情况下会内存泄露，主要用于测试和开发环境 
接受的参数： 
    cookie:也就是session ID的cookie，默认是{ path: '/', httpOnly: true, secure: false, maxAge: null }. 
    genid:产生一个新的sessionID的函数，一个返回值是string类型的函数会被作为sessionID.这个函数第一个参数是req,所以如果你想要req中的参数产生sessionID还是很不错的 
         默认函数是使用 uid-safe这个库产生id值(产生一个算法上安全的UID，可以用于cookie也可以用于URL。和rand-token和uid2相比，后者由于使用了%导致UID产生偏态，同时可能对UID产生不必要的截断。我们的uid-safe使用的是base64算法，其函数uid(byteLength, callback)中第一个参数是比特长度而不是字符串长度) 
       app.use(session({
          genid: function(req) {
            return genuuid() // use UUIDs for session IDs 
          },
          secret: 'keyboard cat'
        })
  name:在response中sessionID这个cookie的名称。也可以通过这个name读取，默认是connect.sid。如果一台机器上有多个app运行在同样的hostname+port 
        那么你需要对这个sessin的cookie进行切割，所以最好的方法还是通过name设置不同的值 
  resave:强制session保存到session store中。即使在请求中这个session没有被修改。但是这个并不一定是必须的，如果客户端有 
         两个并行的请求到你的客户端，一个请求对session的修改可能被另外一个请求覆盖掉，即使第二个请求并没有修改sesion。 
         默认是true,但是默认值已经过时，因此以后default可能会被修改。因此好好研究你的需求选择一个最适用的。大多数情况下你可能需要false 
        最好的知道你的store是否需要设置resave的方法是通过查看你的store是否实现了touch方法(删除那些空闲的session。同时这个方法也会通知session store指定的session          是活动态的)，如果实现了那么你可以用resave:false,如果没有实现touch方法，同时你的store对保存的session设置了一个过期的时间，那么建议你用resave:true 
  rolling:强制在每一个response中都发送session标识符的cookie(如css文件的set-cookie响应头)。如果把expiration设置为一个过去的时间那么 
          那么过期时间设置为默认的值。roling默认是false。如果把这个值设置为true但是saveUnitialized设置 
          为false,那么cookie不会被包含在响应中( 没有初始化的session) 
  saveUninitialized:强制没有“初始化”的session保存到storage中，没有初始化的session指的是：刚被创建没有被修改 
          如果是要实现登陆的session那么最好设置为false(reducing server storage usage, or complying with laws that require permission before setting a cookie) 
          而且设置为false还有一个好处，当客户端没有session的情况下并行发送多个请求时。默认是true,但是不建议使用默认值。 
  secret:用于对sessionID的cookie进行签名，可以是一个string(一个secret)或者数组(多个secret)。如果指定了一个数组那么只会用 
          第一个元素对sessionID的cookie进行签名，其他的用于验证请求中的签名。 
  store:保存session的地方，默认是一个MemoryStore实例 
  unset:对没有设置的req.session进行控制，通过delete或者设置为null。默认是keep,destory表示当回应结束后会销毁session，keep表示session会被保存 
         但是在请求中对session的修改会被忽略，也不会保存

在版本1.5.0后，cookie-parser这个中间件已经不是express-session工作必须的了。这个模块可以直接对req/res中的cookie进行读写，使用cookie-parser可能导致一些问题，特别是当secret在两个模块之间存在不一致的时候。
请把secure设置为true，这是明智的。但是这需要网站的支持，因为secure需要HTTPS的协议。如果设置了secure，但是你使用HTTP访问，那么cookie不会被设置，如果node.js运行在代理上，同时使用了secure：true那么在express中
需要设置”信任代理“。
var app = express()
app.set('trust proxy', 1) // trust first proxy 
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
如果在生产环境下需要使用安全的cookit,同时在测试环境也要能够使用。那么可以使用express中的NODE_ENV参数 
var app = express()
var sess = {
  secret: 'keyboard cat',
  cookie: {}
}
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy 
  sess.cookie.secure = true // serve secure cookies 
}
app.use(session(sess))
cookie的secure属性可以设置为auto,那么会按照请求的方式来判断，如果是安全的就是secure。但是如果网站同时支持HTTP和HTTPS，这时候通过HTTPS设置的cookie 
对于HTTP是不可见的。这在express的”trust proxy“（简化开发和生产环境）正确设置的情况下特别有用。默认下：cookie.maxAge为null 
这意味着，浏览器关闭了这个cookie也就过期了。 
req.session:
// Use the session middleware 
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
// Access the session as req.session 
app.get('/', function(req, res, next) {
  var sess = req.session//用这个属性获取session中保存的数据，而且返回的JSON数据
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
Session.regenerate()： 
产生一个session，调用这个方法那么一个新的SID和Session实例就会被创建，同时放置在req.session中 
session.destory(): 
   销毁session，同时在req.session中被移除，但是在下一次请求的时候又会被创建 
       req.session.destroy(function(err) {
      // cannot access session here 
    })
session.reload(): 
    重新装载session中的数据 
        req.session.reload(function(err) {
      // session updated 
    })
session.save(): 
   把session中的数据重新保存到store中，用内存的内充去替换掉store中的内容。这个方法在HTTP的响应后自动被调用 
   如果session中的数据被改变了（这个行为可以通过中间件的很多的配置来改变），正因为如此这个方法一般不用显示调用。 
   但是在长连接的websocket中这个方法一般需要手动调用  
     req.session.save(function(err) {
    // session saved 
  })
session.touch(): 
   更新maxAge属性，一般不需要手动调用，因为session的中间件已经替你调用了 
req.session.id： 
   唯一的，而且不会被改变 
req.session.cookie： 
  每一个session都有一个cookie对象，因此在每一次请求的时候你都可以改变session的cookie。如我们可以通过req.session.cookie.expires
   设置为false，这时候浏览器关闭cookie就不存在了 
Cookie.maxAge： 
   req.session.cookie.maxAge返回这个cookie剩余的毫秒数，当然我们也可以通过设置expires来完成 
  var hour = 3600000
    req.session.cookie.expires = new Date(Date.now() + hour)
    req.session.cookie.maxAge = hour//和上面的expires等价
    当maxAge设置为60000，也就是一分钟，这时候如果已经过去了30s，那么maxAge就会返回30000（不过要等到当前请求结束）。如果这时候我们调用 
    req.session.touch()，那么req.session.maxAge就成了初始值了 
req.sessionID： 
  只读的属性 
每一个session store必须是一个EventEmitter对象，同时要实现特定的方法。required方法表示：在这个store上一定会调用的方法
Recommended方法表示如果有这个方法那么在这个store上就会调用。Optional方法表示不会调用，但是为了给用户一个统一的store!
store.destroy(sid, callback)
  必须的方法。通过sessionID来销毁session，如果session已经被销毁，那么回调函数被调用，同时传入一个error对象
store.get(sid, callback)
必须的方法。通过sessionID从store中获取session。回调函数是callback(err,session)。如果session存在那么第二个参数就是session
否则第二个参数就是null/undefined。如果error.code==="ENOENT"那么回调为callback(null,null)
store.set(sid, session, callback)
必须的方法。如果被成功设置了那么回调为callback(error)
store.touch(sid, session, callback)
推荐的方法。通过一个指定的sid和session对象去”接触“这个session.如果接触到了那么回调为callback(error)。session store用这个方法去
删除那些空闲的session。同时这个方法也会通知session store指定的session是活动态的。
store.length(callback)
 可选的方法。获取store中所有的session的个数，回调函数为callback(error,length)
store.clear(callback)
 可选的方法，从store中吧所有的session都删除，回调函数为callback(err)
store.all(callback)
 可选的方法。以一个数组的方法获取store中的sessions。callback(error,sessions)

session({
    secret: settings.cookieSecret,
    //blog=s%3AisA3_M-Vso0L_gHvUnPb8Kw9DohpCCBJ.OV7p42pL91uM3jueaJATpZdlIj%2BilgxWoD8HmBSLUSo
    //其中secret如果是一个string，那么就是用这个string对sessionID对应的cookie进行签名，如果是一个数组那么只有第一个用于签名，其他用于浏览器请求后的验证
    key: settings.db,
    //设置的cookie的名字，从上面可以看到这里指定的是blog，所以浏览器的请求中可以看到这里的sessionID已经不是sessionID了，而是这里的blog
    name:"qinliang",//name的优先级比key要高，如果同时设置了那么就是按照name来制定的
    //没有name时候response中为：set-cookie:blog=s%3A6OJEWycwVMmTGXcZqawrW0HNLOTJkYKm.0Slax72TMfW%2B4Tiit3Ox7NAj5S6rPWvMUr6sY02l0DE; Path=/; Expires=Thu, 28 Apr 2016 10:47:13 GMT; HttpOnly
    //当有name的时候resopnse中：set-cookie:qinliang=s%3ABDOjujVhV0DH9Atax_gl4DgZ4-1RGvjQ.OeUddoRalzB4iSmUHcE8oMziad4Ig7jUT1REzGcYcdg; Path=/; Expires=Thu, 28 Apr 2016 10:48:26 GMT; HttpOnly
    resave:true,//没有实现touch方法，同时也设置了session的过期时间为30天
    rolling:true,//如果设置了rolling为true，同时saveUninitialized为true，那么每一个请求都会发送没有初始化的session！
    saveUninitialized:false,//设置为true,存储空间浪费，不允许权限管理
    cookie: 
    {
        maxAge: 1000 * 60 * 60 * 24 * 30
     },
    //cookie里面全部的设置都是对于sessionID的属性的设置，默认的属性为{ path: '/', httpOnly: true, secure: false, maxAge: null }.
    //所以最后我们保存到数据库里面的信息就是：{"cookie":{"originalMaxAge":2592000000,"expires":"2016-04-27T02:30:51.713Z","httpOnly":true,"path":"/"},"flash":{}}
    store: new MongoStore({
      db: settings.db,
      host: settings.host,
      port: settings.port
    })
})