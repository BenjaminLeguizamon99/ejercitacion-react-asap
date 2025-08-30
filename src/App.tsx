import { useState } from 'react'
import './App.css'
import Form from './components/Form'
import { type Task, type Status, type NewTask } from './types'
import { RiDeleteBinLine } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";

const estadosPosibles: Status[] = ["Creado", "En curso", "Finalizado"]

function App() {
  const [tareas, setTareas] = useState<Task[]>([])
  const [seleccion, setSeleccion] = useState<Record<number, Status>>({});
  const [edicionId, setEdicionId] = useState<number | null>(null);


  // Cambiar de estado
  const cambiarEstado = (id: number, nuevoEstado: Status) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? { ...tarea, estado: nuevoEstado } : tarea
    ));
  }

  // Dar de alta tarea
  const onCreate = (newTask: NewTask) => {
    const tareaCompleta: Task = {
      ...newTask,
      id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1, // Reemplazar por UUID.
      estado: "Creado"
    };

    setTareas([...tareas, tareaCompleta])
  }


  // Eliminar tarea
  const onDelete = (id: number) => {
    setTareas(tarea => tarea.filter(t => t.id !== id));
  }

  // Editar tarea
  const editingTask = tareas.find(tarea => tarea.id === edicionId) ?? null;

  const handleUpdate = (id: number, data: NewTask) => {
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
    setEdicionId(null);
  };

  //

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
            <select className='select-status' value={seleccion[tarea.id] ?? tarea.estado}
              onChange={(e) => setSeleccion({
                ...seleccion,
                [tarea.id]: e.target.value as Status,
              })
              }
            >
              {estadosPosibles.map(estado => (
                <option key={estado}>{estado}</option>
              ))}
            </select>
            <button className='btn-estado' onClick={() =>
              cambiarEstado(tarea.id, seleccion[tarea.id] ?? tarea.estado)}
              disabled={!seleccion[tarea.id]}
            >Confirmar!</button>
            <div>

              <RiDeleteBinLine className='btn-delete' onClick={() => onDelete(Number(tarea.id))} />
              <RiEditFill className='btn-edit' onClick={() => setEdicionId(tarea.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
