import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import {
  buttonSiderStyle,
  contentStyle,
  headerStyle,
} from "./BaseLayoutStyles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getUserSiderOptions } from "../routes/Routes";
import { useSessionStorage } from "../../core/useSessionStorage";
import User from "../../data/user/user";
import Strings from "../../utils/Strings";

const { Header, Sider, Content } = Layout;

const BaseLayout: React.FC = () => {
  //provisional code
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState("");
  const [getSessionUser] = useSessionStorage<User>(Strings.empty);

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location]);

  const handleOnClick = (data: any) => {
    navigate(data.key);
  };
  //----------

  const [isCollapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="flex w-full h-screen relative">
      <Sider
        width="13%"
        className={`${isCollapsed ? "hidden" : ""} sm:block`}
        trigger={null}
        collapsible
        collapsed={isCollapsed}
      >
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleOnClick}
          selectedKeys={[selectedPath]}
          items={getUserSiderOptions(getSessionUser() as User)}
        />
      </Sider>
      <Layout>
        <Header style={headerStyle(colorBgContainer)}>
          <Button
            type="text"
            icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!isCollapsed)}
            style={buttonSiderStyle}
          />
        </Header>
        <Content
          className="p-3 mt-6 ml-4 mr-4"
          style={contentStyle(colorBgContainer, borderRadiusLG)}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
