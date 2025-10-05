
import React from 'react'
import CustomAvatar from './avatar'
import { BiRefresh } from 'react-icons/bi'

type RefreshButtonProps = React.ComponentProps<typeof CustomAvatar>

const RefreshButton: React.FC<RefreshButtonProps> = (props) => {
  return (
    <CustomAvatar size="large" shape="square" icon={<BiRefresh />} {...props} />
  );
}

export default RefreshButton