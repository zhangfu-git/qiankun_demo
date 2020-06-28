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
    {
      beforeLoad: (app) => {
        // 加载微应用前，加载进度条
     
        console.log("before load", app.name);
        return Promise.resolve();
      },
      // qiankun 生命周期钩子 - 微应用挂载后
      afterMount: (app) => {
        // 加载微应用前，进度条加载完成
     
        console.log("after mount", app.name);
        return Promise.resolve();
      },
    }
  )
})