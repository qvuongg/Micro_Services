import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, LineChartOutlined, BarChartOutlined } from '@ant-design/icons';
import './sidebar.css'
const { Sider } = Layout;

const Sidebar = () => (
  <Sider>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
      <Menu.Item key="1" icon={<DashboardOutlined />}>Dashboard</Menu.Item>
      {/* <Menu.Item key="2" icon={<LineChartOutlined />}>Crypto</Menu.Item>
      <Menu.Item key="3" icon={<BarChartOutlined />}>Trading</Menu.Item> */}
      {/* Add more menu items as needed */}
    </Menu>
  </Sider>
);

export default Sidebar;
