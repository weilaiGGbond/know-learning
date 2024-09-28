import { CloseOutlined, ExpandOutlined, MinusOutlined } from '@ant-design/icons'
import { Layout, Modal } from 'antd'
import '@renderer/styles/layout/nailbar.scss'
const { Header, Footer, Sider, Content } = Layout;
import Icon from '@renderer/assets/icon.png';
import '@renderer/styles/layout/nailbar.scss'
import React from 'react';
const { confirm } = Modal;
const NailBar = (props): JSX.Element => {
    const maxSizeMethods = () => {
        window.api.maximizeWindow();
    };

    const minimizeMethods = () => {
        window.api.minimizeWindow();
    };

    const closeMethods = () => {
        confirm({
            title: '退出程序',
            content: '确定要退出程序吗',
            onOk() {
                window.api.closeWindow();
            },
            onCancel() {
             
            },
          });
    };
    let slotElement = [];

    let { children } = props;
    children = React.Children.toArray(children);
    children.map((item: any) => {
        slotElement.push(item);
    })
    const sizeWindow = () => {

    }
    return (
        <div className='nailbarMain'>
            <Layout>
                <Content>
                    <div className='leftIcon'>
                        <div className='leftIcon__img'>
                            <img src={Icon} alt="" />
                        </div>
                        <div className='leftIcon__text'>
                            <span>
                                知学
                            </span>
                        </div>
                    </div>
                </Content>
                <Sider className='rightWindow'>
                    <div className='rightWindow__list'>
                        <div onClick={sizeWindow}>
                            {slotElement}
                        </div>

                        <MinusOutlined className='rightWindow__list-icon' onClick={minimizeMethods} />
                        <ExpandOutlined className='rightWindow__list-icon' onClick={maxSizeMethods} />
                        <CloseOutlined className='rightWindow__list-icon' onClick={closeMethods}
                        />
                    </div>
                </Sider>
            </Layout>
        </div>
    )
}

export default NailBar