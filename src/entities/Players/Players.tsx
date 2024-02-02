import { ColorRepresentation } from 'three'
import { ECS } from '../../state/ECS'
import { RenderablePlayersQuery } from '../../state/queries'

import renderEntity from '../../utils/renderEntity'
import { PlayerState } from 'playroomkit'

export default function Players() {
  return <ECS.Entities in={RenderablePlayersQuery} children={renderEntity} />
}

export const createPlayer = (state: PlayerState & { myId?: string }, color: ColorRepresentation) => {
  return ECS.world.add({
    id: state.id,
    isPlayer: true,
    isLocal: state.myId === state.id,
    color,
    playroomState: state,
    render: <group />,
  })
}
