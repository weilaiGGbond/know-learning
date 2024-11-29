import { ReloadOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'
interface mapProp {
  edit?: boolean
  postCheck?: (value: {
    centerPoint: BMapGL.Point | undefined
    radius: number | undefined
    userPosition: { longitude: number; latitude: number }
  }) => void
  getCheck?: (value: { longitude: number; latitude: number }) => void
}
class BaiduMapUtils {
  static initMap(container: HTMLElement, center: BMapGL.Point, zoom: number): BMapGL.Map {
    const map = new BMapGL.Map(container)
    map.centerAndZoom(center, zoom)
    map.enableScrollWheelZoom()
    return map
  }

  static addMarker(map: BMapGL.Map, point: BMapGL.Point, iconUrl: string): BMapGL.Marker {
    const icon = new BMapGL.Icon(iconUrl, new BMapGL.Size(20, 20))
    console.log(icon, 'icon', iconUrl)

    const marker = new BMapGL.Marker(point, { icon })
    map.addOverlay(marker)
    return marker
  }

  static addCircle(map: BMapGL.Map, point: BMapGL.Point, radius: number): BMapGL.Circle {
    const circle = new BMapGL.Circle(point, radius, {
      strokeColor: 'blue',
      strokeWeight: 2,
      strokeOpacity: 0.5,
      enableEditing: true
    })
    map.addOverlay(circle)
    return circle
  }
}

const BaiduMap = ({ edit, getCheck, postCheck }: mapProp) => {
  const mapRef = useRef<BMapGL.Map | null>(null)
  const circleRef = useRef<BMapGL.Circle | null>(null)
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const [address, setAddress] = useState('位置加载中...')
  const [position, setPosition] = useState<{ longitude: number; latitude: number }>({
    longitude: 0,
    latitude: 0
  })
  const [centerPoint, setCenterPoint] = useState<BMapGL.Point | undefined>(undefined)
  const [radius, setRadius] = useState<number | undefined>(undefined)
  useEffect(() => {
    if (!mapContainerRef.current) {
      console.error('BMapGL 未加载或容器未准备好')
      return
    }
    mapRef.current = BaiduMapUtils.initMap(
      mapContainerRef.current,
      new BMapGL.Point(116.404, 39.915),
      18
    )
    getUserLocation()
    return () => {
      mapRef.current?.clearOverlays() // 清除所有覆盖物
      mapRef.current = null
    }
  }, [])
  // 获取用户定位
  const getUserLocation = useCallback(() => {
    const geolocation = new BMapGL.Geolocation()
    geolocation.getCurrentPosition((res: any) => {
      if (geolocation.getStatus() === BMAP_STATUS_SUCCESS) {
        const address = `当前位置：${res.address.province} ${res.address.city} ${res.address.district} ${res.address.street}`
        setAddress(address)
        setPosition({ longitude: res.longitude, latitude: res.latitude })
        const point = new BMapGL.Point(res.longitude, res.latitude)
        mapRef.current?.clearOverlays()
        BaiduMapUtils.addMarker(mapRef.current!, point, '/assets/img/position.png')
        if (edit) {
          circleRef.current = BaiduMapUtils.addCircle(mapRef.current!, point, 250)
          circleRef.current.addEventListener('lineupdate', () => {
            const radius = circleRef.current?.getRadius()
            const centerPoint = circleRef.current?.getCenter()
            setRadius(radius)
            setCenterPoint(centerPoint)
          })
        }
        mapRef.current?.panTo(point)
      } else {
        console.error('定位失败')
      }
    })
  }, [edit])

  const retryPosition = useCallback(() => {
    getUserLocation()
  }, [getUserLocation])
  useEffect(() => {
    if (getCheck) {
      getCheck(position)
    }
    if (postCheck) {
      postCheck({
        centerPoint,
        radius,
        userPosition: position
      })
    }
  }, [position, centerPoint, radius])

  return (
    <>
      <div className="w-full h-full relative">
        <Button
          icon={<ReloadOutlined />}
          className="absolute z-20 bg-transparent border-none right-1 top-1"
          onClick={retryPosition}
        >
          刷新定位
        </Button>
        <p className="z-20 w-auto min-w-22 px-2 py-2 ml-2 absolute text-[14px] top-4  shadow text-[#666] bg-white rounded border-cyan-300">
          {address}
        </p>
        <div className="w-full h-full">
          <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
        </div>
      </div>
    </>
  )
}

export default BaiduMap
