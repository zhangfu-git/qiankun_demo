export default {
  'GET /api/v0/apps': {
    code: 0,
    data: [{
      name: 'app1', // hack
      entry: 'http://localhost:8001/app1',
      base: '/app1',
      mountElementId: 'microSubApp'
    },
    {
      name: 'app2',
      entry: 'http://localhost:8002/app2',
      base: '/app2',
      mountElementId: 'microSubApp'
    }
  ]
  }
}