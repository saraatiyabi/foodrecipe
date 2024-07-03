import React from 'react'
import { Vortex } from 'react-loader-spinner'
import './Loader.css'

export default function Loader() {
  return (
    <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['blue','lightblue','lightgray','#0084ff','darkblue']}
    />
  )
}
