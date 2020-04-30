import { createFromIconfontCN } from '@ant-design/icons';

const NaseIcon = createFromIconfontCN({
  scriptUrl: require('@/assets/iconfont.js'), // 在 iconfont.cn 上生成
});

export default function Icon(props) {
  return <NaseIcon {...props} type={`icon-${props.type}`}/>;
}