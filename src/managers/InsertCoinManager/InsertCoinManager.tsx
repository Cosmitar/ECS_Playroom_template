/**
 * Handles the insert coin (multiplayer room creation). Sets default states and triggers events on fails.
 */
import { Event } from 'eventery'
import { insertCoin } from 'playroomkit'
import { useEffect } from 'react'

export const ON_ROOM_FULL = new Event()
export const ON_PLAYER_KICKED = new Event()
export const ON_LAUNCH = new Event()
export const ON_DISSCONNECT = new Event()

export default function InsertCoinManager() {
  // logs
  useEffect(() => ON_ROOM_FULL.subscribe(() => console.log('Room full')), [])
  useEffect(() => ON_PLAYER_KICKED.subscribe(() => console.log('You are banned here')), [])

  // insert coin
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
          ON_LAUNCH.emit()
        },
        (p) => {
          console.log('on dissconnect', p)
          ON_DISSCONNECT.emit()
        }
      )
    } catch (e) {
      e.message === 'ROOM_LIMIT_EXCEEDED' && ON_ROOM_FULL.emit()
      e.message === 'PLAYER_KICKED' && ON_PLAYER_KICKED.emit()
    }
  }, [])

  return <></>
}
