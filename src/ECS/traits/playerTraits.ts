/**
 * This organizations tries to help to define in a single file all the Player entity traits.
 */
import { trait } from 'koota'
import { Playroom, IsLocalPlayer } from './playroomTrait'
import { RenderHandler, Three } from './renderableTraits'
import { Position } from './positionableTraits'

const PlayerTraits = {
  RenderHandler,

  Three,

  Position,

  Playroom,

  IsLocalPlayer,

  IsPlayer: trait(),

  Color: trait<{ value?: string }>({ value: undefined }),
}

export default PlayerTraits