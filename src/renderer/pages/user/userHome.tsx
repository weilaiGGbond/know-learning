import React from 'react'
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import NailBar from '@renderer/components/layout/nailBar';
const { Header, Footer, Sider, Content } = Layout;
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
const UserHome = (): JSX.Element => {
    const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
        key,
        label: `nav ${key}`,
    }));

    const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <div>
            <NailBar />
            <Layout className='userHomeMain'>

                <Content style={{ padding: '0 48px' }}>

                    <Layout
                        style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
                    >
                        <Sider style={{ background: colorBgContainer }} width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                                items={items2}
                            />
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </div>
    )
}
export default UserHome
