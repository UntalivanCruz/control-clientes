export interface Cliente {
    nombre?: string;
    apellido?: string;
    email?: string;
    saldo?: number;
}

export interface ClienteWithId extends Cliente {
    id?: string;
}