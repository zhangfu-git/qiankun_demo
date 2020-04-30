export default {
  'GET /api/v0/apps': {
    code: 0,
    data: [{
      name: 'microSub', // hack
      entry: 'http://localhost:8001/microSub',
      base: '/microSub',
      mountElementId: 'microSubApp'
    },
    {
      name: 'form_making_dome',
      entry: 'http://192.168.1.153:8000/form_making_dome',
      base: '/form_making_dome',
      mountElementId: 'microSubApp'
    }
  ]
  },
  // 获取菜单
  'GET /api/v0/menuData': (req, res) => {
    res.status(200).send({
      code: 0,
      data: [
        {
          "name": "列表",
          "path": "/list",
          "icon": "xiazai"
        }
      ]
    });
  }
}