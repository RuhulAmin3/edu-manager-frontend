
import React from 'react'
import CustomAvatar from './avatar'
import { BiRefresh } from 'react-icons/bi'

const RefreshButton = () => {
  return (
    <CustomAvatar size="large" shape="square" icon={<BiRefresh/>} onClick={()=>window.location.reload()} />
  )
}

export default RefreshButton