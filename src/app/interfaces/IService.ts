export interface IService {
    id: string;
    name: string;
    operations: IOperation[];
}

export interface IOperation {
    id: string;
    name: string;
    type: string;
    serviceId: string;
}