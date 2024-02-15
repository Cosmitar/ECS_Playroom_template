/**
 * Heads up! use this hook with careful, usePlayersState updates on every state key change, not only the supervised key.
 * Avoid using it in system that are always mounted and prefer the use in screens that eventually unmount
 */
import { Query } from 'miniplex'
import { Entity } from '../state/types'
import { usePlayersState } from 'playroomkit'
import { useEffect } from 'react'
import { ECS } from '../state/ECS'

export default function useNetworkEntitySync<T extends Entity>(stateName: keyof T, Query: Query<T>, matchIdKey: keyof T = 'id') {
  const playersWithValues = usePlayersState(stateName as string)

  useEffect(() => {
    playersWithValues.forEach(({ state, player }) => {
      const entity = Query.entities.find((e: T) => e[matchIdKey] === player.id) as T
      if (entity) {
        ECS.world.addComponent(entity, stateName as keyof Entity, state)
      }
    })
  }, [playersWithValues])
}
