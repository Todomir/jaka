import { DispatchWithoutAction, useReducer } from 'react'

export default function useToggle(
  initialValue = false
): [boolean, DispatchWithoutAction] {
  return useReducer(state => !state, initialValue)
}
