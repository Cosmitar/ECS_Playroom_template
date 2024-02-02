import { isHost, myPlayer, usePlayersList } from 'playroomkit'
import { useEffect, useState } from 'react'

export default function useConsistentPlayerList() {
  const [onStateUpdate, setOnStateUpdate] = useState(true)
  const players = usePlayersList(onStateUpdate)

  // Problem: usePlayersList() returns only one player when is the second player to join the lobby. This only happens on 2nd player, not in 1st, 3rd or 4th
  // In order to solve this inconsistency we set usePlayersList(true) to react on state change and we force state update in case od inconsistency detected.
  useEffect(() => {
    let tId

    const checkConsistency = () => {
      // problem detection.
      if (!isHost()) {
        // forces state update to refresh players list hook
        setTimeout(() => myPlayer().setState('forceUpdate', Math.random()), 500)
      } else {
        // stops hook to prevent stress when heavy state update occures like in storing player position.
        setOnStateUpdate(false)
      }
    }

    if (players.length === 1) checkConsistency()

    return () => clearTimeout(tId!)
  }, [players])

  return players
}
