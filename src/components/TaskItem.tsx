/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactElement } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'

import { ITask } from '@pages/dashboard'

interface TaskItemProps {
  snapshot?: DraggableStateSnapshot
  provided?: DraggableProvided
  item: ITask
  color: string
}

export default function TaskItem({
  provided,
  snapshot,
  item,
  color
}: TaskItemProps): ReactElement {
  return (
    <>
      <article>
        <div
          className={`px-6 py-3 mb-3 ${
            snapshot.isDragging ? `bg-${color}-50` : 'bg-white'
          } shadow-sm border border-gray-200 rounded-md tracking-tight select-none ${
            snapshot.isDragging
              ? `dark:bg-${color}-900 dark:border-gray-400`
              : 'dark:bg-gray-800 dark:border-gray-500'
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
          ref={provided.innerRef}
        >
          <h1 className={`font-bold text-lg text-${color}-300`}>
            {item.title}
          </h1>
          <p className="text-xs text-gray-400">{item.description}</p>
        </div>
      </article>
    </>
  )
}
