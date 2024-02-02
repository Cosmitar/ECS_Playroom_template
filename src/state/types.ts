import { PlayerState } from 'playroomkit'
import { ReactNode } from 'react'
import { ColorRepresentation, Object3D } from 'three'

export type RenderableEntity = {
  three?: Object3D
  render?: ReactNode
}

export type MultiplayerEntity = {
  playroomState?: PlayerState
}

export type PlayerEntity = RenderableEntity &
  MultiplayerEntity & {
    id?: string
    isPlayer?: boolean
    isLocal?: boolean
    color?: ColorRepresentation
  }

export type GameEntity = {
  isGame?: boolean
  roomName?: string
}

export type Entity = PlayerEntity & GameEntity
