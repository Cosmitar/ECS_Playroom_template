import { ECS } from './ECS'

// GAME
export const GameQuery = ECS.world.with('isGame')

// PLAYER
export const RenderablePlayersQuery = ECS.world.with('isPlayer', 'render')
export const RenderedPlayersQuery = ECS.world.with('isPlayer', 'render', 'three')
export const PlayersQuery = ECS.world.with('isPlayer', 'render', 'id')
export const MyPlayersQuery = ECS.world.with('isPlayer', 'render', 'id', 'isLocal')
export const MultiplayerPlayerQuery = ECS.world.with('isPlayer', 'render', 'playroomState')
