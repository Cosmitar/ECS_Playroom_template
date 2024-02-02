import { Event } from 'eventery'
// import { myPlayer } from 'playroomkit'
import { createStateMachine } from 'state-composer'

/* Define a type of possible states */
export enum GAME_STATES {
  HOME = 'home',
  LOBBY = 'lobby',
  GAMEPLAY = 'gameplay',
  RESULTS = 'results',
}

/* Create and export the State Machine */
export const GameState = createStateMachine<GAME_STATES>(GAME_STATES.HOME)

/* create and export an event for state transition */
export const ON_ROUTE_CHANGE = new Event<[nextRoute: GAME_STATES]>()

const enterTo = (nextState: GAME_STATES) => () => {
  ON_ROUTE_CHANGE.emit(nextState)

  GameState.enter(nextState)
}

export const enterHome = enterTo(GAME_STATES.HOME)
export const enterLobby = enterTo(GAME_STATES.LOBBY)
export const enterGameplay = enterTo(GAME_STATES.GAMEPLAY)
export const enterResults = enterTo(GAME_STATES.RESULTS)
