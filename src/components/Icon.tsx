import { ReactElement } from 'react'

const icons = {
  login:
    'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  logout:
    'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  signin:
    'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
  plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
}

interface IconProps {
  icon: string
  size?: number
  stroke?: number
}

export default function Icon({
  icon,
  size = 24,
  stroke = 2
}: IconProps): ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        d={icons[icon]}
      ></path>
    </svg>
  )
}
