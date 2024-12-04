import HUD from '../../components/HUD'
import { myPlayer, useIsHost, usePlayersList } from 'playroomkit'
import useRemoteProcedureCallback from '../../utils/useRemoteProcedureCallback'
import { quitMultiplayerSession } from '../../utils/helpers'
import Monitor from '../../utils/Monitor/Monitor'
import { useQuery } from 'koota/react'
import PlayerTraits from '../../ECS/traits/playerTraits'

const PlayersQuery = [PlayerTraits.IsPlayer, PlayerTraits.Playroom]

export default function LobbyScreen({ onNext = () => {}, onBack = () => {} }: { onNext?: () => void; onBack?: () => void }) {
  const players = usePlayersList()

  const entities = useQuery(...PlayersQuery)

  const remoteNext = useRemoteProcedureCallback('startGameplay', onNext)

  const isHost = useIsHost()

  return (
    <>
      <HUD>
        <h1>LobbyScreen</h1>
        <h3>players from network</h3>
        <ul>
          {players.map(p => {
            const color = p.getProfile().color ? p.getProfile().color.hexString : '#999'
            return (
              <li key={p.id} style={{ color }}>
                {p.id} {isHost && p.id === myPlayer().id && '(Host)'}
              </li>
            )
          })}
        </ul>
        <h3>local entities</h3>
        <ul>
          {entities.map(p => (
            <li key={p.get(PlayerTraits.Playroom).state.id} style={{ color: p.get(PlayerTraits.Color) as string }}>
              {p.get(PlayerTraits.Playroom).state.id} {p.get(PlayerTraits.IsLocalPlayer) && '(local)'}{' '}
              {<button onClick={() => p.get(PlayerTraits.Playroom).state.kick()}>Kick</button>}
            </li>
          ))}
        </ul>

        {isHost && <button onClick={() => remoteNext()}>START</button>}
        {!isHost && <span>Awaiting host to start</span>}
        <button onClick={quitMultiplayerSession}>Quit</button>
      </HUD>
      <Monitor />
    </>
  )
}
