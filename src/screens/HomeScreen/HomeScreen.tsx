import HUD from '../../components/HUD'
import { enterLobby } from '../../state/gameStates'

export default function HomeScreen({ onNext = () => {}, onBack = () => {} }: { onNext?: (multi?: boolean) => void; onBack?: () => void }) {
  return (
    <>
      <HUD>
        <h1>HomeScreen</h1>
        <button onClick={enterLobby}>Multiplayer</button>
      </HUD>
    </>
  )
}
