import { PlayerState, usePlayersState } from 'playroomkit'
import { useEffect } from 'react'

export default function useAllSameState(
  key: string,
  expectedValue: any,
  callback: () => void,
  filter: (p: PlayerState) => boolean = () => true
) {
  const playersGameState = usePlayersState(key)

  // awaits for all players to report themselves in expected state value
  useEffect(() => {
    const allHere = playersGameState.filter(({ player }) => filter(player)).reduce((res, { state }) => res && state === expectedValue, true)
    if (allHere) {
      callback()
    }
  }, [playersGameState])

  return null
}
