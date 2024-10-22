import { OrthographicCamera } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'

const Camera = () => {

    const camera = useRef()

    useEffect(()=>{
        console.log(camera.current)
    },[])


  return (
    <OrthographicCamera
        ref={camera}
        args={[-5,5,5,-5,0.1,50]}
        makeDefault
        position-y={1}
    />
  )
}

export default Camera