export type Task = {
    id: number;
    name: string;
    description: string;
    priority: number;
    responsable: string;
    estado : Status
}

export type Status = 
    | "Creado"
    | "En curso"
    | "Finalizado"


export type NewTask = {
    name: string;
    description: string;
    priority: number;
    responsable: string
}