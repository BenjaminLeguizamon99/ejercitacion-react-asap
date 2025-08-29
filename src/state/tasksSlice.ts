import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Status, type Task, type NewTask } from "../types";
import {v4 as uuidv4} from 'uuid';
import type { RootState } from '../app/store'



interface TasksState {
    items: Task[]
}

const initialState:TasksState = {
    items: []
}

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: { // Son los creadores de acciones
        addTask: {
            prepare: (data: NewTask) => ({
                payload: {
                    id: uuidv4(),
                    name: data.name,
                    description: data.description,
                    priority: data.priority,
                    responsable : data.responsable,
                    estado: (data.estado ?? "Creado") as Status
                } as Task
            }),
            reducer: (state, action: PayloadAction<Task>) => {
                state.items.push(action.payload)
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(t => t.id !== action.payload)
        },
        updateTask: (
            state,
            action: PayloadAction<{id: string; changes: Partial<Omit<Task, "id">>}>
        ) => {
            const {id, changes} = action.payload
            const t = state.items.find(x => x.id === id)
            if(t) Object.assign(t, changes)
        },
        setTaskStatus: (
            state,
            action: PayloadAction<{id: string, estado:Status}>
        ) => {
            const t = state.items.find(x => x.id === action.payload.id)
            if(t) t.estado = action.payload.estado
        }

    }
})

export const { addTask, deleteTask, updateTask, setTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer
export const selectTasks = (state: RootState) => state.tasks.items
