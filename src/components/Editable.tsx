import {
  KeyboardEvent,
  MutableRefObject,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  useEffect,
  useState
} from 'react'

import autosize from 'autosize'

interface EditableProps {
  text: string
  type: 'text' | 'textarea'
  className?: string
  childRef:
    | MutableRefObject<HTMLInputElement>
    | MutableRefObject<HTMLTextAreaElement>
  children: ReactNode | ReactNodeArray | ReactElement
}
export default function Editable({
  text,
  type,
  children,
  className,
  childRef,
  ...props
}: EditableProps): ReactElement {
  const [isEditing, setEditing] = useState<boolean>(false)

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus()
      autosize(childRef.current)
    }
  }, [isEditing, childRef])

  const handleKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    type: 'text' | 'textarea'
  ) => {
    const { key } = event
    const keys = ['Escape', 'Tab']
    const enterKey = 'Enter'
    const allKeys = [...keys, enterKey] // All keys array

    /*
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (type === 'textarea') {
      if (keys.indexOf(key) > -1 || allKeys.indexOf(key) > -1) {
        setEditing(false)
      }
    }
  }

  useEffect(() => {
    if (type === 'textarea') {
      if (childRef && childRef.current) {
        autosize.update(childRef.current)
      }
    }
  }, [childRef, text])

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={e => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span className={className}>{text || 'Editable content'}</span>
        </div>
      )}
    </section>
  )
}
