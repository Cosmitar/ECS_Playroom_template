import { insertCoin } from 'playroomkit'
import { useEffect } from 'react'

export default function InsertCoinSystem() {
  useEffect(() => {
    try {
      insertCoin(
        {
          skipLobby: true,
          defaultPlayerStates: {
            // flag to indicate user has played
            playedTurn: false,
            // synched game state used to make sure everyone is in the same screen
            GAME_STATE: '',
          },
          defaultStates: { roomName: '' },
          maxPlayersPerRoom: 3,
        },
        () => {
          console.log('on launch')
        },
        () => {
          console.log('on dissconnect')
        }
      )
    } catch (e) {
      e.message === 'ROOM_LIMIT_EXCEEDED' && console.log('Room full')
      e.message === 'PLAYER_KICKED' && console.log('You are banned here')
    }
  }, [])

  return <></>
}
