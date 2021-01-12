interface SwitchProps {
  value: boolean
  darkMode?: boolean
  toggle: () => unknown
}

const Switch: React.FC<SwitchProps> = ({ value, toggle, darkMode }) => {
  const setBgOnToggle = () => {
    if (value) {
      if (darkMode) {
        return 'bg-gray-700'
      } else {
        return 'bg-indigo-400'
      }
    } else {
      return 'bg-gray-200'
    }
  }
  return (
    <div className="toggle-switch">
      <input
        type="checkbox"
        className="hidden"
        name="toggleSwitch"
        id="toggleSwitch"
        checked={value}
        onChange={toggle}
      />
      <label className="cursor-pointer" htmlFor="toggleSwitch">
        <div
          className={`w-10 h-5 px-0.5 ${setBgOnToggle()} rounded-full flex items-center transition-colors duration-300`}
        >
          <span
            className={`w-4 h-4 ${
              darkMode ? 'bg-white bg-opacity-50' : 'bg-white'
            } text-xs flex justify-center items-center rounded-full transition-transform duration-300 transform ${
              value ? 'translate-x-5' : 'translate-x-0'
            } select-none p-1`}
          >
            {darkMode ? (value ? '🌝' : '🌞') : ''}
          </span>
        </div>
      </label>
    </div>
  )
}

export default Switch
