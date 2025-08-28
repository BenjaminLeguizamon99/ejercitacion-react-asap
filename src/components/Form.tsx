import { useState } from 'react'
import { type NewTask } from '../types';
import './form.css'

type Props = {
    onCreate: (task:NewTask) => void;
};

export default function Form ({onCreate}: Props) {

    const posiblesValores:number[] = [1, 2, 3, 4, 5]
    const [name, setName] = useState<string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [prioridad, setPrioridad] = useState<number>(1);
    const [responsable, setResponsable] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTask:NewTask = {
            name: name,
            description: descripcion,
            priority: prioridad,
            responsable: responsable
        };

        onCreate(newTask);

        // Limpiamos el form
        setName("");
        setDescripcion("");
        setPrioridad(1);
        setResponsable("");
    }

    return(
        <form onSubmit={handleSubmit} className='form-container'>
            <label htmlFor='name'>Ingrese el nombre de la tarea</label>
            <input 
                type="text" 
                id='name' 
                value={name} 
                placeholder="Realizar validacion de datos..." 
                onChange={(e) => setName(e.target.value)} />

            <label htmlFor='descripcion'>Ingrese una descripcion de la tarea</label>
            <textarea
                id='descripcion'
                placeholder='En esta tarea tengo que...'
                value={descripcion}
                onChange={(e)=> setDescripcion(e.target.value)}
            />
            <label htmlFor='prioridad'>Ingrese una prioridad de la tarea</label>
            <select 
                id="prioridad"
                value={prioridad}
                onChange={(e) => setPrioridad(Number(e.target.value))}
                >
                {posiblesValores.map(valor => (
                    <option value={valor} key={valor}>{valor}</option>
                )
                )}
            </select>
            <label htmlFor='responsable'>Ingrese un responsable</label>
            <input 
                id='responsable'
                type="text" 
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                />
            <button type="submit" className='btn-form'>Crear tarea</button>
        </form>
    )
}