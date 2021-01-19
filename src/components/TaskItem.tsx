/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd'
import { useMutation, useQueryClient } from 'react-query'

import useDebounce from '@hooks/useDebounce'

import { ITask, TaskContext, ITasks } from '@pages/dashboard'

import { UPDATE_TASKS } from '@utils/queries'

import produce from 'immer'

import Editable from './Editable'

interface TaskItemProps {
  snapshot?: DraggableStateSnapshot
  provided?: DraggableProvided
  item: ITask
  color: string
  name: string
}

export default function TaskItem({
  provided,
  snapshot,
  item,
  name,
  color
}: TaskItemProps): ReactElement {
  const queryClient = useQueryClient()

  const { tasks, setTasks, client } = useContext(TaskContext)

  const [title, setTitle] = useState<string>(item.title)
  const [description, setDescription] = useState<string>(item.description)

  const dTitle = useDebounce(title, 1000)
  const dDescription = useDebounce(description, 1000)

  const editTitleRef = useRef<HTMLInputElement>(null)
  const editDescriptionRef = useRef<HTMLTextAreaElement>(null)

  const { mutateAsync: updateTasks } = useMutation(async (tasks: ITasks) => {
    return await client.request(UPDATE_TASKS, { tasks })
  })

  useEffect(() => {
    const newTasks = produce(tasks, draft => {
      const newTask = { _id: item._id, title, description }
      const index = draft[name].findIndex(task => task._id === item._id)
      if (~index) {
        draft[name].splice(index, 1, newTask)
      }
    })
    setTasks(newTasks)
    ;(async () => {
      try {
        await updateTasks({
          todo: tasks.todo,
          doing: tasks.doing,
          done: tasks.done
        })
        queryClient.invalidateQueries('tasks')
      } catch (error) {
        throw new Error(error.message)
      } finally {
        queryClient.invalidateQueries('tasks')
      }
    })()
  }, [dTitle, dDescription])

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
          <Editable
            childRef={editTitleRef}
            className={`font-bold text-lg leading-5 mb-2 text-${color}-300`}
            text={title}
            type="text"
          >
            <input
              className={`px-2 py-1 mb-3 w-full font-bold text-lg leading-5 text-${color}-300 tracking-tighter rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-300 dark:focus:ring-offset-gray-800`}
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              ref={editTitleRef}
            />
          </Editable>
          <Editable
            childRef={editDescriptionRef}
            className="text-xs sm:text-sm text-gray-400"
            text={description}
            type="textarea"
          >
            <textarea
              className="px-2 py-1 mt-3 w-full text-xs sm:text-sm text-gray-400 bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800"
              name="title"
              id="title"
              value={description}
              onChange={e => setDescription(e.target.value)}
              ref={editDescriptionRef}
            />
          </Editable>
        </div>
      </article>
    </>
  )
}
