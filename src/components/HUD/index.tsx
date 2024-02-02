import { Hud, PerspectiveCamera } from '@react-three/drei'
import { ReactNode } from 'react'
import FullscreenLayout from './HUDComponents/FullscreenLayout/FullscreenLayout'

export default function HUD({ children }: { children?: ReactNode }) {
  return (
    <Hud renderPriority={1}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <FullscreenLayout>{children}</FullscreenLayout>
    </Hud>
  )
}
