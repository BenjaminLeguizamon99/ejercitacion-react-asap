import { useState, useEffect } from 'react'
import { type NewTask, type Task } from '../types';
import './form.css'

type Props = {
    onCreate: (task:NewTask) => void;
};

type FormProps = {
    mode: "create" | "edit";
    initialValues?:Partial<NewTask>;
    onSubmit: (data: NewTask) => void;
    onCancel?: () => void;
};

export default function Form ({mode, initialValues, onSubmit, onCancel}: FormProps) {

    const posiblesValores:number[] = [1, 2, 3, 4, 5]
    const [name, setName] = useState<string>(initialValues?.name ?? "");
    const [description, setDescription] = useState<string>(initialValues?.description ?? "");
    const [priority, setPriority] = useState<number>(initialValues?.priority ??1);
    const [responsable, setResponsable] = useState<string>(initialValues?.responsable ?? "");


    useEffect(()=> {
        if(!initialValues) return;
        setName(initialValues.name ?? '');
        setDescription(initialValues.description ?? '');
        setPriority(initialValues.priority ?? 1);
        setResponsable(initialValues.responsable ?? '');
    }, [initialValues])


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload: NewTask = {
            name:name.trim(),
            description: description.trim(),
            priority,
            responsable: responsable.trim()
        };

        onSubmit(payload);

        //si es creacion de una nueva tarea, limpiamos
        if(mode === 'create') {
            setName("");
            setDescription("");
            setPriority(1);
            setResponsable(""); 
        }
        
        
        const newTask:NewTask = {
            name: name,
            description: description,
            priority: priority,
            responsable: responsable
        };

        //onCreate(newTask);
    }


    return(
        <form onSubmit={handleSubmit} className='form-container'>
            <h2>{mode === 'create' ? "Crear Tarea" : "Editar Tarea"}</h2>
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
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
            <label htmlFor='prioridad'>Ingrese una prioridad de la tarea</label>
            <select 
                id="prioridad"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
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
            <button type="submit" className='btn-form'>{mode === "create" ? "Crear tarea" : "Guardar cambios"}</button>
            {mode === "edit" && onCancel && (
                <button type="button" onClick={onCancel}>
                    Cancelar
                </button>
            )}
        </form>
    )
}