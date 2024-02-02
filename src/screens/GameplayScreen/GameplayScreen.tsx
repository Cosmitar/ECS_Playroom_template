import { myPlayer, useIsHost } from 'playroomkit'
import HUD from '../../components/HUD'
import useRemoteProcedureCallback from '../../utils/useRemoteProcedureCallback'
import useAllSameState from '../../utils/useAllSameState'
import { useEffect } from 'react'

export default function GameplayScreen({ onNext = () => {}, onBack = () => {} }: { onNext?: () => void; onBack?: () => void }) {
  const remoteNext = useRemoteProcedureCallback('endGameplay', onNext)

  const isHost = useIsHost()

  // only the host calls to remote redirect procedure when all players report have played
  useAllSameState('playedTurn', true, () => isHost && remoteNext())

  useEffect(() => {
    // simulate play in between 1 and 4 seconds
    const timeout = ~~(Math.random() * 3000) + 1000

    setTimeout(() => {
      console.log('set played turn')

      myPlayer().setState('playedTurn', true)
    }, timeout)
  }, [])

  return (
    <>
      <HUD>
        <h1>Gameplay</h1>
        {isHost && <button onClick={() => remoteNext()}>END GAMEPLAY</button>}
        {!isHost && <span>gameplay in course</span>}
      </HUD>
    </>
  )
}
