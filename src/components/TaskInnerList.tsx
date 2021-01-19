import { memo, ReactElement } from 'react'
import { Draggable } from 'react-beautiful-dnd'

import { ITask } from '@pages/dashboard'

import TaskItem from './TaskItem'

interface TaskInnerListProps {
  items: [ITask]
  color: string
  name: string
}

function TaskInnerList({
  items,
  color,
  name
}: TaskInnerListProps): ReactElement {
  return (
    <>
      {items.map((item, index) => (
        <Draggable key={item._id} draggableId={item._id} index={index}>
          {(provided, snapshot) => {
            return (
              <TaskItem
                name={name}
                item={item}
                provided={provided}
                snapshot={snapshot}
                color={color}
              />
            )
          }}
        </Draggable>
      ))}
    </>
  )
}

export default memo(TaskInnerList)
