import {
  registerMicroApps,
} from 'qiankun';
import { history } from 'umi';


setTimeout(() => {
  registerMicroApps(
    [
      {
       name: 'microSubA',
       entry: '//localhost:8002',
       container: '#microSubApp',
       activeRule: '/microSubA',
       props: {
         parentHistory: history
       }
      },
      {
        name: 'microSubB',
        entry: '//localhost:8001',
        container: '#microSubApp',
        activeRule: '/microSubB',
        props: {
          parentHistory: history
        }
      }
    ],
  )
})