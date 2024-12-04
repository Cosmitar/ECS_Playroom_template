import { trait } from 'koota'
import type { JSXElementConstructor, MutableRefObject, ReactElement } from 'react'
import { Object3D } from 'three'

export const RenderHandler = trait<{ render: ReactElement<any, string | JSXElementConstructor<any>> }>({ render: null! })

export const Three = trait<{ ref: MutableRefObject<Object3D> }>({ ref: null! })
