/**
 * Handles player join and quit. Keeps network players in sync with local entities.
 */
import { PlayerState, onPlayerJoin, usePlayersList } from 'playroomkit'
import { useEffect } from 'react'
import { createPlayer } from '../../ECS/entities/Players/Players'
import { ON_LAUNCH } from '../InsertCoinManager/InsertCoinManager'
import { world } from '../../ECS/ecs'
import PlayerTraits from '../../ECS/traits/playerTraits'

export default function MultiplayerJoinQuitManager() {
  useEffect(
    () =>
      ON_LAUNCH.subscribe(() => {
        onPlayerJoin(player => {
          // on join we do nothing, just let usePlayerList to update for entities maintenance

          player.onQuit(() => {
            removePlayer(player)
          })
        })
      }),
    []
  )

  const playerList = usePlayersList(false)

  useEffect(() => {
    setupPlayers(playerList)
  }, [playerList])

  return <></>
}

const setupPlayers = (players: PlayerState[]) => {
  const entities = world.query(PlayerTraits.IsPlayer, PlayerTraits.Playroom)
  const ids = entities.map(e => e.get(PlayerTraits.Playroom).state.id)

  players.map(p => {
    if (!ids.includes(p.id)) {
      const color = p.getProfile().color ? p.getProfile().color.hexString : '#999'
      createPlayer(p, color)
    }
  })
}

const removePlayer = (player: PlayerState) => {
  const playerEntity = world
    .query(PlayerTraits.IsPlayer, PlayerTraits.Playroom)
    .find(e => e.get(PlayerTraits.Playroom).state.id === player.id)

  playerEntity && playerEntity.destroy()
}
