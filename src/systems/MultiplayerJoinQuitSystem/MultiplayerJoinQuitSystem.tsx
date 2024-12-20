/**
 * Handles player join and quit. Keeps network players in sync with local entities.
 */
import { PlayerState, onPlayerJoin, usePlayersList } from 'playroomkit'
import { useEffect } from 'react'
import { PlayersQuery } from '../../state/queries'
import { createPlayer } from '../../entities/Players/Players'
import { ColorRepresentation } from 'three'
import { ECS } from '../../state/ECS'
import { ON_LAUNCH } from '../InsertCoinSystem/InsertCoinSystem'

export default function MultiplayerJoinQuitSystem() {
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
  const { entities } = PlayersQuery
  const ids = entities.map(e => e.id)

  players.map(p => {
    if (!ids.includes(p.id)) {
      const color = p.getProfile().color ? p.getProfile().color.hexString : '#999'
      createPlayer(p, color as ColorRepresentation)
    }
  })
}

const removePlayer = (player: PlayerState) => {
  const playerEntity = PlayersQuery.where(({ id }) => id === player.id).first

  playerEntity && ECS.world.remove(playerEntity)
}
