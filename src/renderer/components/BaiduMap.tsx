import React from 'react'
import { Map, MapApiLoaderHOC } from 'react-bmapgl'
class BaiduMap extends React.Component {
  render() {
    return (
      <Map style={{ height: 450 }} center={new BMapGL.Point(116.404449, 39.914889)} zoom={12} />
    )
  }
}
const m = MapApiLoaderHOC({ ak: '您的密钥' })(BaiduMap)
export default m 

