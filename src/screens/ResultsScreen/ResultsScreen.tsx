import { myPlayer, useIsHost } from 'playroomkit'
import HUD from '../../components/HUD'
import useRemoteProcedureCallback from '../../utils/useRemoteProcedureCallback'
import { useEffect } from 'react'

export default function ResultsScreen({ onNext = () => {}, onBack = () => {} }: { onNext?: () => void; onBack?: () => void }) {
  const remoteNext = useRemoteProcedureCallback('endGameplay', onNext)

  // reset states
  useEffect(() => {
    myPlayer().setState('playedTurn', false, true)
  }, [])

  const isHost = useIsHost()

  return (
    <>
      <HUD>
        <h1>ResultsScreen</h1>
        {isHost && <button onClick={() => remoteNext()}>NEXT ROUND</button>}
        {isHost && (
          <button
            onClick={() => {
              onBack()
            }}
          >
            QUIT
          </button>
        )}
        {!isHost && <span>Awaiting for next round</span>}
      </HUD>
    </>
  )
}
