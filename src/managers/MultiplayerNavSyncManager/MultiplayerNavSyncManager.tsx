/**
 * Reflects into local player network state the current GAME_STATE
 */
import { useEffect } from 'react'
import { ON_ROUTE_CHANGE } from '../../state/gameStates'
import { myPlayer } from 'playroomkit'

export default function MultiplayerNavSyncManager() {
  useEffect(() => ON_ROUTE_CHANGE.subscribe(nextState => myPlayer()?.setState('GAME_STATE', nextState, true)), [])
  return <></>
}
