import React from 'react';
import styles from './index.less';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from 'umi';
import { Spin, Tooltip, Empty } from 'antd';
import classNames from 'classNames';
import { CloseOutlined, DragOutlined } from '@ant-design/icons';
import Icon from '@/components/Icon';
import { isFunction } from '@/utils/utils';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "#eee" : "",
  // styles we need to apply on draggables
  ...draggableStyle
});

export default class DragMenu extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {
      items: props.data || []
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        items: [...nextProps.data]
      })
    }
  }
  onDragEnd(result) {
    const { data } = this.props;

    if (!result.destination) return;

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    
    this.setState({
      items: items,
    });

    // 目的地没有改变直接终止（拖出列表外部的情况）
    // 目标位置
    const destination = result.destination;
    // 原来的位置
    const source = result.source;
    // 当前拖拽元素的id
    const draggableId = result.draggableId;
    // 找出当前拖拽的元素
    const currDragEl = data.find((item) => item.id == draggableId);
    // 当前拖拽的位置
    let destinationPos = destination.index;
    // 目标位置的原对象
    let destinationSourcePosEl = data[destinationPos];

    console.log('当前拖拽的元素', currDragEl);
    console.log('当前拖拽位置的原对象', destinationSourcePosEl);

    isFunction(this.props.onChangePosition) && this.props.onChangePosition(currDragEl, destinationSourcePosEl);
  }
  // 删除菜单
  removedMenu(item, e) {
    e.preventDefault();
    e.stopPropagation();
    
    isFunction(this.props.onRemove) && this.props.onRemove(item);
  }
  // 点击了菜单
  onClickMenuItem(item) {
    typeof this.props.onClickMenuItem === 'function' && this.props.onClickMenuItem(item);
  }
  render() {
    const { items } = this.state;
    const { isLoading, data=[] } = this.props;
    return (
      <>
        {
          !data.length
          ?
          <Empty
            className={styles.mrgT30}
            description="你还未添加快捷功能, 快去所有功能列表添加吧！" 
          />
          :
          <DragDropContext
            onDragEnd={this.onDragEnd.bind(this)}
          >
            <Droppable
              droppableId="droppable"
            >
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {Array.isArray(items) && items.map((item, index) => (
                    <Draggable 
                      key={item.name} 
                      draggableId={`${item.id}`} 
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Link
                          to={item.path}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          // 这里必须添加以下style
                          style={{
                            ...provided.draggableProps.style
                          }}
                          className={classNames({
                            [styles.draggableContentActive]: snapshot.isDragging,
                            [styles.draggableContent]: true
                          })}
                          onClick={this.onClickMenuItem.bind(this, item)}
                        >
                          <div
                          >
                            {
                              item.icon &&
                              <Icon
                                style={{fontSize: '20px', marginRight: '10px'}}
                                type={item.icon}
                              />
                            }
                            <span style={{cursor: 'pointer'}}>{item.name}</span>
                          </div>
                          <div
                            className={styles.iconBox}
                          >
                            <Tooltip
                              title="取消收藏"
                              placement="bottom"
                              className={styles.removedBtn}
                              onClick={this.removedMenu.bind(this, item)}
                            >
                              <CloseOutlined />
                            </Tooltip>
                            <Tooltip
                              placement="bottom"
                              title="可拖拽"
                            >
                              <DragOutlined />
                            </Tooltip>
                          </div>
                        </Link>
                      )}
                    </Draggable>
                  ))}
                  {
                    isLoading
                    ?
                    <div
                      className={styles.loading}
                    >
                      <Spin />
                    </div>
                    : null
                  }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

        }
      </>
    )
  }
}