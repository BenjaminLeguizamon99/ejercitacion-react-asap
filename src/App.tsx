import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { type Task, type Status, type NewTask } from './types'


const estadosPosibles : Status[] = ["Creado", "En curso", "Finalizado"]

function App() {
  const [tareas, setTareas] = useState<Task[]>([])
  const [seleccion, setSeleccion] = useState<Record<number, Status>>({});

  const cambiarEstado = (id:number, nuevoEstado:Status) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? {...tarea, estado: nuevoEstado} : tarea
    ));
  }

  const onCreate = (newTask:NewTask) => {
    const tareaCompleta: Task = {
      ...newTask,
      id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1, // Reemplazar por UUID.
      estado: "Creado"
    };

    setTareas([...tareas, tareaCompleta])
  }

  return (
    <>
      <h1>Gestor de tareas</h1>
      <Form onCreate={onCreate} />
      <div className='card-container'>
      {tareas.map((tarea) => (
        <div key={tarea.id} className='card'>
          <h2 className='tarea-title'>{tarea.name}</h2>
          <h5 className='tarea-estado'>Estado: {tarea.estado}</h5>
          <h5 className='tarea-description'>{tarea.description}</h5>
          <h3 className='tarea-priority'>Prioridad: {tarea.priority}</h3>
          <h3 className='tarea-responsable'>{tarea.responsable}</h3>
          <select className='select-status' value={seleccion[tarea.id] ?? tarea.estado}
            onChange={(e) => setSeleccion({...seleccion,
                              [tarea.id]: e.target.value as Status,})
            }
            >
            {estadosPosibles.map(estado => (
              <option>{estado}</option>
            ))}
          </select>
          <button  className='btn-estado' onClick={()=>
            cambiarEstado(tarea.id, seleccion[tarea.id]?? tarea.estado)}
            disabled={!seleccion[tarea.id]}
            >Confirmar!</button>
        </div>
      ))}
      </div>
    </>
  )
}

export default App
