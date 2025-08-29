import React from 'react'
import './App.css'
import Form from './components/Form'
import { type Status, type NewTask, type Task } from './types'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { type RootState } from './app/store'
import { addTask, selectTasks, deleteTask, updateTask, setTaskStatus} from './state/tasksSlice'


import { RiDeleteBinLine } from "react-icons/ri"
import { RiEditFill } from "react-icons/ri"


const estadosPosibles: Status[] = ["Creado", "En curso", "Finalizado"]

function App() {
  const tareas = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  // Estado de UI local (puede seguir así)
  const [seleccion, setSeleccion] = React.useState<Record<string, Status>>({})
  const [edicionId, setEdicionId] = React.useState<string | null>(null)
  
  const editingTask = tareas.find(t => t.id === edicionId) ?? null


  const onCreate = (newTask: NewTask) => {
    dispatch(addTask(newTask))
  }

  const cambiarEstado = (id: string, nuevoEstado: Status) => {
    dispatch(setTaskStatus({id, estado: nuevoEstado}))
    setSeleccion(prev => {
      const copia = {...prev}
      delete copia[id]
      return copia
    })
  }
  const onDelete = (id: string) => {
    if (confirm('¿Eliminar esta tarea?')) dispatch(deleteTask(id))
  }
  const handleUpdate = (id: string, data: NewTask) => {
    dispatch(updateTask({id, changes: data}))
    setEdicionId(null)
  }

  return (
    <>
      <h1>Gestor de tareas</h1>

      {editingTask ? (
        <Form
          mode="edit"
          initialValues={{
            name: editingTask.name,
            description: editingTask.description,
            priority: editingTask.priority,
            responsable: editingTask.responsable
          }}
          onSubmit={(data) => handleUpdate(editingTask.id, data)}
          onCancel={() => setEdicionId(null)}
        />
      ) : (
        <Form
          mode="create"
          onSubmit={onCreate}
        />
      )}

      <div className='card-container'>
        {tareas.map((tarea) => (
          <div key={tarea.id} className='card'>
            <h2 className='tarea-title'>{tarea.name}</h2>
            <h5 className='tarea-estado'>Estado: {tarea.estado}</h5>
            <h5 className='tarea-description'>{tarea.description}</h5>
            <h3 className='tarea-priority'>Prioridad: {tarea.priority}</h3>
            <h3 className='tarea-responsable'>{tarea.responsable}</h3>

            <select
              className='select-status'
              value={seleccion[tarea.id] ?? tarea.estado}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSeleccion(prev => ({...prev, [tarea.id]: e.target.value as Status}))
              }
            >
              {estadosPosibles.map((estado: Status) => (
                <option key={estado}>{estado}</option>
              ))}
            </select>
            <button
              className='btn-estado'
              onClick={() => cambiarEstado(tarea.id, seleccion[tarea.id] ?? tarea.estado)}
              disabled = {
                !seleccion[tarea.id] || (seleccion[tarea.id] === tarea.estado)
              }
            >
              Confirmar
            </button>

            <RiDeleteBinLine
              className='btn-delete'
              onClick={() => onDelete(tarea.id)}
            />

            <RiEditFill
              className='btn-edit'
              onClick={() => setEdicionId(tarea.id)}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default App