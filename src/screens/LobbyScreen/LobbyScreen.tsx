import { useState } from 'react'
import HUD from '../../components/HUD'
import useConsistentPlayerList from '../../utils/useConsistentPlayerList'
import { PlayerEntity } from '../../state/types'
import { useOnEntityAdded, useOnEntityRemoved } from 'miniplex-react'
import { PlayersQuery } from '../../state/queries'
import { myPlayer, useIsHost } from 'playroomkit'
import useRemoteProcedureCallback from '../../utils/useRemoteProcedureCallback'

export default function LobbyScreen({ onNext = () => {}, onBack = () => {} }: { onNext?: () => void; onBack?: () => void }) {
  const players = useConsistentPlayerList()

  const [entities, setEntities] = useState<PlayerEntity[]>([])

  useOnEntityAdded(PlayersQuery, e => {
    setEntities(v => [...v, e])
  })

  useOnEntityRemoved(PlayersQuery, e => {
    setEntities(v => v.filter(ee => ee.id !== e.id))
  })

  const remoteNext = useRemoteProcedureCallback('startGameplay', onNext)

  const isHost = useIsHost()

  return (
    <>
      <HUD>
        <h1>LobbyScreen</h1>
        <h3>players from network</h3>
        <ul>
          {players.map(p => (
            <li key={p.id} style={{ color: p.getProfile().color.hexString as string }}>
              {p.id} {isHost && p.id === myPlayer().id && '(Host)'}
            </li>
          ))}
        </ul>
        <h3>local entities</h3>
        <ul>
          {entities.map(p => (
            <li key={p.id} style={{ color: p.color as string }}>
              {p.id} {p.isLocal && '(local)'} {isHost && !p.isLocal && <button onClick={() => p.playroomState!.kick()}>Kick</button>}
            </li>
          ))}
        </ul>

        {isHost && <button onClick={() => remoteNext()}>START</button>}
        {!isHost && <span>Awaiting host to start</span>}
      </HUD>
    </>
  )
}
