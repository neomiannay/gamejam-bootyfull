import { OrthographicCamera } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

const Camera = () => {

  const camera = useRef()

  useEffect(() => {
    console.log(camera.current)
  }, [])


  return (
    <OrthographicCamera
      ref={camera}
      makeDefault
      position={[0, 0, 5]}
    />
  )
}

export default Camera