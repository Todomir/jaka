import { DispatchWithoutAction, useReducer } from 'react'

export default function useToggle(
  initialValue: boolean
): [boolean, DispatchWithoutAction] {
  return useReducer(state => !state, initialValue)
}
