/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from 'react'
import { Droppable } from 'react-beautiful-dnd'

import { ITasks } from '@pages/dashboard'

import TaskInnerList from './TaskInnerList'
interface TaskListProps {
  tasks: ITasks
}

export default function TaskList({ tasks }: TaskListProps): ReactElement {
  return (
    <div className="grid px-10 overflow-auto mx-auto sm:grid-cols-3 gap-5">
      <div>
        <h1 className="text-3xl text-indigo-400 tracking-tighter font-extrabold">
          TO-DO
        </h1>
        <Droppable droppableId="todo">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`border min-h-tasks transition-colors duration-500 p-3 ${
                  snapshot.isDraggingOver ? 'bg-indigo-50' : 'bg-gray-100'
                } border-gray-200 rounded-lg ${
                  snapshot.isDraggingOver
                    ? 'dark:bg-gray-700 dark:border-gray-600'
                    : 'dark:bg-gray-900 dark:border-gray-600'
                }`}
              >
                <TaskInnerList color="indigo" items={tasks.todo} />
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </div>
      <div>
        <h1 className="text-3xl text-blue-400 tracking-tighter font-extrabold">
          DOING
        </h1>
        <Droppable droppableId="doing">
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`border min-h-tasks transition-colors duration-500 p-3 ${
                  snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-100'
                } border-gray-200 rounded-lg ${
                  snapshot.isDraggingOver
                    ? 'dark:bg-gray-700 dark:border-gray-600'
                    : 'dark:bg-gray-900 dark:border-gray-600'
                }`}
              >
                <TaskInnerList color="blue" items={tasks.doing} />
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </div>
      <div>
        <h1 className="text-3xl text-green-400 tracking-tighter font-extrabold">
          DONE
        </h1>
        <Droppable droppableId="done">
          {(provided, snapshot) => {
            return (
              <section
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`border min-h-tasks  transition-colors duration-500 p-3 ${
                  snapshot.isDraggingOver ? 'bg-green-50' : 'bg-gray-100'
                } border-gray-200 rounded-lg ${
                  snapshot.isDraggingOver
                    ? 'dark:bg-gray-700 dark:border-gray-600'
                    : 'dark:bg-gray-900 dark:border-gray-600'
                }`}
              >
                <TaskInnerList color="green" items={tasks.done} />
                {provided.placeholder}
              </section>
            )
          }}
        </Droppable>
      </div>
    </div>
  )
}
