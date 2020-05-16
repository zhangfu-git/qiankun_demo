// 定义组默认的菜单数据
let allMenuData = createMenuData(20);
let collectMenuData = [];
let historyMenuData = [];

let expired = Date.now();
let isLogin = false;
const user = {
    "id": 157,
    "uid": "1828902",
    "username": "adf",
    "nickName": "ZHNAGFU",
    "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ1w1ZibSQpQWomdDp2rwAVqp3ZWGfY1IqUJFRZyGP1uv29v1nwfwEfI7rk5xgD05sRK9UxnFNQQnA/132",
    "reLogin": false
  }

function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

function createMenuData(count) {
  const res = [
    {
      id: 1,
      title: `DEMO_A`,
      userFavor: 0,
      metas: [
        {
          key: 'name',
          value: `DEMO_A`
        },
        {
          key: 'icon',
          value: 'xiazai'
        },
        {
          key: 'entry',
          value: `http://localhost:8002/`
        },
        {
          key: 'mountElementId',
          value: 'microSubApp'
        },
        {
          key: 'base',
          value: '/microSubA'
        }
      ]
    },
    {
      id: 2,
      title: `DEMO_B`,
      userFavor: 0,
      metas: [
        {
          key: 'name',
          value: 'DEMO_B'
        },
        {
          key: 'icon',
          value: 'xiazai'
        },
        {
          key: 'entry',
          value: `http://localhost:8001`
        },
        {
          key: 'mountElementId',
          value: 'microSubApp'
        },
        {
          key: 'base',
          value: '/microSubB'
        }
      ]
    }
  ];


  return res;
}

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;

    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }

    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET  /api/login/captcha': getFakeCaptcha,

  // 获取收藏的菜单
  'GET /api/v0/user/favorPostList': (req, res) => {
    const params = req.params;
    const skip = params.skip;
    const limit = params.limit > collectMenuData.length - 1 ? collectMenuData.length -1: params.limit;
    const result = collectMenuData.slice(skip, limit);
    res.status(200).send({
      code: 0,
      data: result,
      total: 0
    })
  },
  // 获取最近返回的菜单
  'GET  /api/v0/user/seenPostList': (req, res) => {
    const params = req.params;
    const skip = params.skip;
    const limit = params.limit > historyMenuData.length - 1 ? historyMenuData.length - 1 : params.limit;
    const result = historyMenuData.slice(skip, limit);
    res.status(200).send({
      code: 0,
      data: result,
      total: 0
    })
  },
  // 获取所有的菜单
  'GET /api/v0/post/list': (req, res) => {
    const params = req.params;
    const query = req.query;
    const filter = query.filter;
    const filterTitle = filter && filter.title;
    let result = allMenuData;
    
    if (filterTitle) {
      result = allMenuData.filter((item) => item.title.indexOf(filterTitle) > -1);
    }

    res.status(200).send({
      code: 0,
      data: result
    })
  },
  // 更改收藏状态
  'PUT /api/v0/post/:id/favor': (req, res) => {
    const params = req.params;
    const id = params.id;
    const body = req.body;
    const status = body.status;

    if (status) {
      const currMenu = allMenuData.find((item) => item.id == id);
      allMenuData.map((item) => {
        if (item.id == id) {
          item.userFavor = 1;
        }
        return item;
      });
      historyMenuData.map((item) => {
        if (item.id == id) {
          item.userFavor = 1;
        }
        return item;
      })
      collectMenuData.push(currMenu);
    } else {
      allMenuData.map((item) => {
        if (item.id == id) {
          item.userFavor = 0;
        }
        return item;
      });
      historyMenuData.map((item) => {
        if (item.id == id) {
          item.userFavor = 0;
        }
        return item;
      })
      const currIndex = collectMenuData.findIndex((item) => item.id == id);
      collectMenuData.splice(currIndex, 1);
    }
    res.status(200).send({
      code: 0,
      data: []
    });
  },
  'PUT /org/api/v0/post/:id/seen': (req, res) => {
    const params = req.params;
    const id = params.id;
    const body = req.body;
    const status = body.status;

    if (status) {
      const currMenu = allMenuData.find((item) => item.id == id);
      historyMenuData.push(currMenu);
    } else {
      const currMenuIndex = collectMenuData.findIndex((item) => item.id == id);
      historyMenuData.splice(currMenuIndex, 1);
    }
    res.status(200).send({
      code: 0,
      data: []
    })
  },
  'PUT /api/v0/post/:id/order_index': (req, res) => {
    const params = req.params;
    const id = params.id;
    const body = req.body;
    const beforeId = body.beforeId;
    
    // 插座的位置
    const sourcePosIndex = collectMenuData.findIndex((item)=> item.id == beforeId);
    const currElPos = collectMenuData.findIndex((item) => item.id == id);
    
    const result = Array.from(collectMenuData);
    const [removed] = result.splice(currElPos, 1);

    // console.log('删除的元素', removed, result)
    result.splice(sourcePosIndex, 0, removed);
    // console.log('更改后的元素', result)
    collectMenuData = result;

    res.status(200).send({
      code: 0,
      data: []
    });
  },
  'GET /api/v0/user/me': (req, res) => {
    // 过了一分钟自动过滤
    if (!isLogin) {
      return res.status(200).send({
        code: 401,
        data: null
      })
    }

    if (Date.now() - expired > 600000) {
      return res.status(401).send({
        code: 401
      });
    }
    
    res.status(200).send({
      code: 0,
      data: user
    });
  },
  'POST /api/v0/auth/login': (req, res) => {
    const body = req.body;
    const { username, password } = body;
    if (username != 'admin' || password != '123') {
      return res.status(401).send({
        code: 401,
        msg: '账号或者密码错误'
      });
    }
    
    expired = Date.now();
    isLogin = true;

    res.status(200).send({
      code: 0,
      data: user
    });
  },
  'POST /api/v0/auth/sms/vcode': {
    code: 0
  },
  'POST /api/v0/auth/loginViaPhone': (req, res) => {
    const body = req.body;
    const { phone, vcode } = body;

    if (vcode != 123456) {
      return res.status(400).send({
        code: 0,
        msg: '验证码不正确'
      })
    }

    expired = Date.now();
    isLogin = true;

    res.status(200).send({
      code: 0,
      data: user
    });
  },
  'GET /api/v0/auth/logout': (req, res) => {
    isLogin = false;
    res.status(200).send({
      code: 0
    })
  }
};