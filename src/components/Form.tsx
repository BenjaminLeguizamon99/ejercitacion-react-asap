import { useState, useEffect } from 'react'
import { type NewTask } from '../types';
import { useAppDispatch } from '../app/hooks';
import { addTask } from '../state/tasksSlice';
import './form.css'

type FormMode = 'create' | 'edit'

type FormProps = {
    mode: FormMode
    onSubmit: (data: NewTask) => void
    onCancel?: () => void
    initialValues?: {
        name: string
        description: string
        priority: number
        responsable: string
    }
}

export default function Form({ mode, onSubmit, onCancel, initialValues }: FormProps) {
    const dispatch = useAppDispatch()
    const posiblesValores: number[] = [1, 2, 3, 4, 5]
    const [form, setForm] = useState({
        name: '',
        description: '',
        priority: 1,
        responsable: '',
    })

    useEffect(() => {
        if (mode === 'edit' && initialValues) setForm(initialValues)
    }, [mode, initialValues])


    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (mode === 'create') {
            // Crear directamente en Redux
            dispatch(addTask(form))
        } else {
            // Editar: delega al padre
            onSubmit(form)
        }

        setForm({ name: '', description: '', priority: 1, responsable: '' })
    }

    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <input name="name" value={form.name} onChange={onChange} placeholder="Nombre" />
            <textarea name="description" value={form.description} onChange={onChange} placeholder="Descripción" />
            <select
                name='priority'
                value={form.priority}
                onChange={onChange}
            >
                {posiblesValores.map(valor => (
                    <option value={valor} key={valor}>{valor}</option>
                )
                )}
            </select>
            <input name="responsable" value={form.responsable} onChange={onChange} placeholder="Responsable" />
            <button type="submit" className='btn-form'>Crear</button>
        </form>
    )
}