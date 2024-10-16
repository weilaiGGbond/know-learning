import { CloseOutlined, ExpandOutlined, MinusOutlined } from '@ant-design/icons'
import { Layout, Modal } from 'antd'
import '@renderer/assets/styles/layout/nailbar.scss'
const { Sider, Content } = Layout
import Icon from '@renderer/assets/icon.png'
const { confirm } = Modal
const NailBar = (props): JSX.Element => {
  const maxSizeMethods = () => {
    window.api.maximizeWindow()
  }

  const minimizeMethods = () => {
    window.api.minimizeWindow()
  }

  const closeMethods = () => {
    window.api.closeLoginWindow();
  }

  // let slotElement = [];

  // let { children } = props;
  // children = React.Children.toArray(children);
  // children.map((item: any) => {
  //     slotElement.push(item);
  // })
  // const sizeWindow = () => {

  // }
  return (
    <div className="nailbarMain">
      <Layout>
        <Content>
          <div className="leftIcon">
            <div className="leftIcon__img">
              <img src={Icon} alt="" />
            </div>
            <div className="leftIcon__text">
              <span>知学</span>
            </div>
          </div>
        </Content>
        <Sider className="rightWindow">
          <div className="rightWindow__list">
            <CloseOutlined className="rightWindow__list-icon" onClick={closeMethods} />
          </div>
        </Sider>
      </Layout>
    </div>
  )
}

export default NailBar
