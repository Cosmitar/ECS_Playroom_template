import { GAME_STATES, GameState, enterGameplay, enterHome, enterLobby, enterResults } from '../../state/gameStates'
import LobbyScreen from '../LobbyScreen/LobbyScreen'
import { useEffect } from 'react'

import HomeScreen from '../HomeScreen/HomeScreen'
import { hasPlayroomId, setHashValue } from '../../utils/helpers'
import GameplayScreen from '../GameplayScreen/GameplayScreen'
import ResultsScreen from '../ResultsScreen/ResultsScreen'
import InsertCoinSystem from '../../systems/InsertCoinSystem/InsertCoinSystem'
import MultiplayerJoinQuitSystem from '../../systems/MultiplayerJoinQuitSystem/MultiplayerJoinQuitSystem'
import MultiplayerNavSync from '../../systems/MultiplayerNavSync/MultiplayerNavSync'

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
    <>
      <GameState.Match state={[GAME_STATES.HOME]}>
        <HomeScreen onNext={redirectPlayType} />
      </GameState.Match>

      <GameState.Match state={[GAME_STATES.LOBBY]}>
        <LobbyScreen onNext={enterGameplay} onBack={enterHome} />
        <InsertCoinSystem />
      </GameState.Match>

      <GameState.Match state={[GAME_STATES.GAMEPLAY]}>
        <GameplayScreen onNext={enterResults} onBack={enterHome} />
      </GameState.Match>

      <GameState.Match state={[GAME_STATES.RESULTS]}>
        <ResultsScreen onNext={enterGameplay} onBack={quit} />
      </GameState.Match>

      {/* <Systems /> */}
      <MultiplayerJoinQuitSystem />
      <MultiplayerNavSync />
    </>
  )
}
