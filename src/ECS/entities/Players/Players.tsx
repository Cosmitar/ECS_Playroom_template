import { useQuery } from 'koota/react'
import { PlayerState } from 'playroomkit'
import { world } from '../../ecs'
import Traits from '../../traits/playerTraits'
import ThreeEntity from '../ThreeEntity/ThreeEntity'

const QueryRenderablePlayers = [Traits.IsPlayer, Traits.RenderHandler]

export default function Players() {
  const entities = useQuery(...QueryRenderablePlayers)

  return (
    <>
      {entities.map(entity => (
        <ThreeEntity key={entity} entity={entity} />
      ))}
    </>
  )
}

export const createPlayer = (state?: PlayerState & { myId?: string }, color?: string) => {
  const entity = world.spawn(Traits.IsPlayer, Traits.RenderHandler({ render: <group /> }), Traits.Color({ value: color }))

  state && entity.add(Traits.Playroom({ state }))

  state && state.myId === state.id && entity.add(Traits.IsLocalPlayer)

  return entity
}
