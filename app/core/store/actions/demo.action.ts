export const initialState = {
  count: 1,
}

export function ACTION_ADD_COUNT(
  state: StoreStates,
  action: StoreAction<'ACTION_ADD_COUNT'>
): { count: number } {
  return { count: state.count + 1 }
}

declare global {
  interface StoreStates {
    count: number,
    user: object
  }

  interface StoreActions {
    ACTION_ADD_COUNT: number
  }
}
