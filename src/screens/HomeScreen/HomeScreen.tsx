import { useEffect } from 'react'
import HUD from '../../components/HUD'
import { enterLobby } from '../../state/gameStates'
import Players, { createPlayer } from '../../ECS/entities/Players/Players'

export default function HomeScreen({ onNext = () => {}, onBack = () => {} }: { onNext?: (multi?: boolean) => void; onBack?: () => void }) {
  useEffect(() => {
    createPlayer()
  }, [])
  return (
    <>
      <HUD>
        <h1>HomeScreen</h1>
        <button onClick={enterLobby}>Multiplayer</button>
      </HUD>
      <Players />
      <group />
    </>
  )
}
