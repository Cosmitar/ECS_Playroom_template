import { Html } from '@react-three/drei'
import { Event } from 'eventery'
import { ReactNode, useEffect, useState } from 'react'

export type PointerEventsValues = 'none' | 'auto'
export const LayoutDisableSetPointerEvents = new Event<[state: PointerEventsValues]>()

export default function FullscreenLayout({
  noPointerEvents,
  style = {},
  children,
}: {
  noPointerEvents?: boolean
  style?: React.CSSProperties
  children: ReactNode
}) {
  const [pointerEvents, setPointerEvents] = useState<PointerEventsValues>(noPointerEvents ? 'none' : 'auto')

  useEffect(() => LayoutDisableSetPointerEvents.subscribe(setPointerEvents), [])

  return (
    <Html prepend style={{ pointerEvents: pointerEvents }} zIndexRange={[100, 0]}>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          transform: 'translate(-50%, -50%)',
          flexWrap: 'nowrap',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          ...style,
        }}
      >
        {children}
      </div>
    </Html>
  )
}
