import { GAME_STATES, GameState, enterGameplay, enterHome, enterLobby, enterResults } from '../../state/gameStates'
import LobbyScreen from '../LobbyScreen/LobbyScreen'
import { useEffect } from 'react'

import HomeScreen from '../HomeScreen/HomeScreen'
import { hasPlayroomId, setHashValue } from '../../utils/helpers'
import GameplayScreen from '../GameplayScreen/GameplayScreen'
import ResultsScreen from '../ResultsScreen/ResultsScreen'
import InsertCoinManager from '../../managers/InsertCoinManager/InsertCoinManager'
import MultiplayerJoinQuitManager from '../../managers/MultiplayerJoinQuitManager/MultiplayerJoinQuitManager'
import MultiplayerNavSync from '../../managers/MultiplayerNavSyncManager/MultiplayerNavSyncManager'
import { WorldProvider } from 'koota/react'
import { world } from '../../ECS/ecs'

export default function RouterScreen() {
  useEffect(() => {
    hasPlayroomId() && enterLobby()
  }, [])

  // redirects multiplayer or single player
  const redirectPlayType = (multiplayer: boolean) => (multiplayer ? enterLobby() : null)

  const quit = () => {
    setHashValue('r', '')
    window.location.reload()
  }

  return (
    <WorldProvider world={world}>
      <GameState.Match state={[GAME_STATES.HOME]}>
        <HomeScreen onNext={redirectPlayType} />
      </GameState.Match>

      <GameState.Match state={[GAME_STATES.LOBBY]}>
        <LobbyScreen onNext={enterGameplay} onBack={enterHome} />
        <InsertCoinManager />
      </GameState.Match>

      <GameState.Match state={[GAME_STATES.GAMEPLAY]}>
        <GameplayScreen onNext={enterResults} onBack={enterHome} />
      </GameState.Match>

      <GameState.Match state={[GAME_STATES.RESULTS]}>
        <ResultsScreen onNext={enterGameplay} onBack={quit} />
      </GameState.Match>

      {/* <Systems /> */}
      <MultiplayerJoinQuitManager />
      <MultiplayerNavSync />
    </WorldProvider>
  )
}
