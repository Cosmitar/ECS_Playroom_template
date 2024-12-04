import { trait } from 'koota'
import type { PlayerState } from 'playroomkit'

export const Playroom = trait<{ state: PlayerState }>({ state: null! })

export const IsLocalPlayer = trait()
