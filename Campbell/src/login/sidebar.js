import { Menu } from 'antd';
import { AppstoreOutlined, VerticalAlignBottomOutlined , FileDoneOutlined, BarChartOutlined, SolutionOutlined,CarryOutOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;


class Sidebar extends React.Component {
  handleClick = e => {
    console.log('click ', e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        {/* <SubMenu key="sub1" icon={<BarChartOutlined />} title="Dashboard">
        </SubMenu> */}
        {/*<Menu.Item key="1" icon={<BarChartOutlined />}><Link to="/home">Dashboard</Link></Menu.Item>*/}
        {/*<SubMenu key="sub2" icon={<VerticalAlignBottomOutlined />} title="Import">*/}
          <Menu.Item key="2" icon={<VerticalAlignBottomOutlined />}><Link to="/enter">Enter</Link></Menu.Item>
          {/*<Menu.Item key="3">import by file</Menu.Item>*/}
        {/*</SubMenu>*/}
        {/*<SubMenu key="sub3" icon={<AppstoreOutlined />} title="Order">*/}
          <Menu.Item key="4" icon={<AppstoreOutlined />}><Link to="/orders">Order</Link></Menu.Item>
          {/* <Menu.Item key="6">Option 6</Menu.Item> */}
        {/*</SubMenu>*/}
        <SubMenu key="sub4" icon={<FileDoneOutlined />} title="Load">
          {/*<Menu.Item key="5" ><Link to="/import/price">Load Prices</Link></Menu.Item>*/}
          <Menu.Item key="6"><Link to="/import/customer">Customers/Ship To's</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/import/material">Materials Information</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/import/route">Customer Delivery Routes</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<CarryOutOutlined />}><Link to="/invoice">Invoice</Link></Menu.Item>
        {localStorage.getItem("access")==="admin"?<Menu.Item key="10" icon={<SolutionOutlined />}><Link to="/users">User Maintenance</Link></Menu.Item>:null}
      </Menu>
    );
  }
}

export default Sidebar;