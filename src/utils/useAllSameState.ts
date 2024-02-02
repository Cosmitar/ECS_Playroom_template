import { usePlayersState } from 'playroomkit'
import { useEffect } from 'react'

export default function useAllSameState(key: string, expectedValue: any, callback: () => void) {
  const playersGameState = usePlayersState(key)

  // awaits for all players to report themselves in expected state value
  useEffect(() => {
    const allHere = playersGameState.reduce((res, { state }) => res && state === expectedValue, true)
    if (allHere) {
      callback()
    }
  }, [playersGameState])

  return null
}
