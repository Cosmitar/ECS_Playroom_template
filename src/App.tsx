import { Canvas } from '@react-three/fiber'
import RouterScreen from './screens/RouterScreen/RouterScreen'

const App = () => {
  return (
    <Canvas shadows camera={{ fov: 50, position: [30, 50, 80] }}>
      <RouterScreen />
    </Canvas>
  )
}

export default App
