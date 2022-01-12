import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, MenuOutlined } from '@ant-design/icons';

import '../../../scss/partials/Admin/_MenuSider.scss';

export default function MenuSider(props) {
    const { menuCollapsed } = props;
    const { Sider } = Layout;

    return (
        <Sider className="menu-sider" collapsed={menuCollapsed}>
            <Menu theme="dark" mode='inline' defaultSelectedKeys={["1"]}>
                <Menu.Item Key="1">
                    <Link to={"/admin"}>
                        <HomeOutlined />
                        <span className="nav-text">Home</span>
                    </Link>
                </Menu.Item>
                <Menu.Item Key="2">
                    <Link to={"/admin/HR"}>
                        <MenuOutlined />
                        <span className="nav-text">HR</span>
                    </Link>
                </Menu.Item>
                <Menu.Item Key="2">
                    <Link to={"/admin/Purchase"}>
                        <MenuOutlined />
                        <span className="nav-text">Purchase</span>
                    </Link>
                </Menu.Item>
                <Menu.Item Key="2">
                    <Link to={"/admin/Sale"}>
                        <MenuOutlined />
                        <span className="nav-text">Sale</span>
                    </Link>
                </Menu.Item>
                <Menu.Item Key="2">
                    <Link to={"/admin/Stock"}>
                        <MenuOutlined />
                        <span className="nav-text">Stock</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}