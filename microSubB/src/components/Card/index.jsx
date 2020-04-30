import { Card, Empty } from 'antd';
import styles from './index.less';
import classnames from 'classnames';

export default function CardWrapper(props) {
  const hasBottomGutter = props.hasBottomGutter !== false;
  const showEmptyContent = props.showEmptyContent;
  const emptryDescription = props.emptryDescription;

  let otherProps = {};
  Object.keys(props).forEach((i) => {
    if (i !== 'hasBottomGutter' && i !== 'showEmptyContent' && i !== 'emptryDescription') {
      otherProps[i] = props[i];
    }
  });
  return (
    <Card
      className={classnames({
        [styles.bottomGutter20]: hasBottomGutter
      })}
      {...otherProps}
    >
      {showEmptyContent && <Empty description={emptryDescription} />}
      {props.children}
    </Card>
  );
}