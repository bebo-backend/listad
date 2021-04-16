import * as types from './types'







// INITIALIZES CLOCK ON CLIENT
export const startClock = () => (dispatch) =>

 setInterval(() => {
    dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } })
  }, 1000)


