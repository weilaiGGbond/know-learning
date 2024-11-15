import React from 'react'
import { EnvironmentOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
const { confirm } = Modal
let BMapGL = window.BMapGL

class BaiduMap extends React.Component {
  map: BMapGL.Map | null = null
  icon: BMapGL.Icon | undefined
  circle: BMapGL.Circle | undefined
  state = {
    longitude: null as number | null,
    latitude: null as number | null,
    address: '',
    open: false,
    loading: false
  }

  componentDidMount() {
    if (!BMapGL) {
      console.error('BMapGL 未加载')
      return
    }
    this.initMap()
    this.getUserLocation()
  }

  initMap() {
    this.map = new BMapGL.Map('bmap')
    this.map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15)
    this.map.enableScrollWheelZoom()

    this.icon = new BMapGL.Icon('/assets/img/position.png', new BMapGL.Size(20, 20))
  }

  getUserLocation() {
    const geolocation = new BMapGL.Geolocation()
    geolocation.getCurrentPosition((res: any) => {
      if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
        this.setState({
          longitude: res.longitude,
          latitude: res.latitude,
          address: `${res.address.province} ${res.address.city} ${res.address.district} ${res.address.street}`
        })
        this.displayUserLocation(res)
      } else {
        console.error('定位失败')
      }
    })
  }

  displayUserLocation(res: { longitude: number; latitude: number }) {
    if (!this.map) return

    const userPoint = new BMapGL.Point(res.longitude, res.latitude)
    const userMarker = new BMapGL.Marker(userPoint, { icon: this.icon })

    const opts = {
      width: 200,
      height: 100,
      title: '当前位置'
    }
    const infoWindow = new BMapGL.InfoWindow(this.state.address, opts)

    userMarker.addEventListener('click', () => {
      if (this.map) {
        this.map.openInfoWindow(infoWindow, userPoint)
      }
    })

    this.circle = new BMapGL.Circle(userPoint, 50, {
      strokeColor: 'blue',
      strokeWeight: 2,
      strokeOpacity: 0.5
    })
    this.circle.enableEditing()

    this.map.addOverlay(this.circle)
    this.map.addOverlay(userMarker)
    this.map.panTo(userPoint)
  }

  showLoading = () => {
    this.setState({ open: true, loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 2000)
  }

  postCheck = () => {
    // 获取当前中心位置
    const centerPoint = this.circle?.getCenter()
    const radius = this.circle?.getRadius()
    // 判断和我的位置为同一位置
    if (centerPoint?.lat !== this.state.latitude || centerPoint?.lng !== this.state.longitude) {
      confirm({
        title: '提示',
        content: '您的位置和签到位置中心点位置不一致，是否继续发布签到？',
        onOk() {
          // 获取当前半径
          console.log(radius)
          // 发布签到

        },
        onCancel() {
          // 取消签到
        }
      })
    }
  }
  handleModalClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { open, loading } = this.state

    return (
      <>
        <Button type="primary" onClick={this.showLoading} icon={<EnvironmentOutlined />}>
          位置签到
        </Button>
        <Modal
          title={<p>获取当前位置</p>}
          footer={
            <>
              <Button type="primary" onClick={this.showLoading}>
                重新获取
              </Button>
              <Button type="primary" onClick={this.showLoading}>
                签到
              </Button>
              <Button type="primary" onClick={this.postCheck}>
                发布签到
              </Button>
            </>
          }
          open={open}
          onCancel={this.handleModalClose}
          confirmLoading={loading}
        >
          <div className="w-full h-[300px] overflow-hidden">
            <div id="bmap" style={{ width: '100%', height: '100%' }}></div>
          </div>
        </Modal>
      </>
    )
  }
}

export default BaiduMap
