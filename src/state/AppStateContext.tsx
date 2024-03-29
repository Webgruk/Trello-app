import { createContext, FC, useContext, Dispatch } from 'react'
import { appStateReducer, AppState, List, Task } from './appStateReducer'
import { useImmerReducer } from 'use-immer'
import { Action } from './actions'
import { DragItem } from '../DragItem'

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: '0',
      text: 'To do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }],
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }],
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }],
    },
  ],
}

type AppStateContextProps = {
  draggedItem: DragItem | null
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps,
)

export const useAppState = () => {
  return useContext(AppStateContext)
}

type AppStateProviderProps = {
  children: React.ReactNode
}

export const AppStateProvider: FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData)
  const { draggedItem, lists } = state

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || []
  }

  return (
    <AppStateContext.Provider
      value={{ draggedItem, lists, getTasksByListId, dispatch }}
    >
      {children}
    </AppStateContext.Provider>
  )
}
