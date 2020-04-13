import { Menu, Icon } from 'antd';

const { SubMenu, Item } = Menu;

export const generateMenuMap = menu => {
  return menu.map(item => {
    if (item.children) {
      return (
        <SubMenu
          key={item.path}
          title={
            <div>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.title}</span>
            </div>
          }
        >
          {generateMenuMap(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Item key={item.path}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.title}</span>
        </Item>
      );
    }
  });
};

// 对象清除值为空的键
export const handleObject = obj => {
  const newObj = {};
  for (const key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

export const changeFavoriteList = (talentList, data) => {
  const newList = [...talentList.list];
  const index = newList.findIndex(item => item._id === data._id);
  newList[index]['favorite'] = !data.favorite;
  return newList;
};
