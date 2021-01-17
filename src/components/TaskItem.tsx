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
          className={`px-8 py-4 mb-3 shadow-sm transition-colors duration-300 bg-white ${
            snapshot.isDragging
              ? `ring-2 ring-${color}-300`
              : 'border border-gray-100'
          } rounded-md tracking-tight select-none dark:bg-gray-800 ${
            snapshot.isDragging
              ? `dark:ring-2 dark:ring-${color}-500`
              : 'dark:border dark:border-gray-700'
          }`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style }}
          ref={provided.innerRef}
        >
          <h1 className={`font-bold text-lg leading-5 mb-2 text-${color}-300`}>
            {item.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
        </div>
      </article>
    </>
  )
}
