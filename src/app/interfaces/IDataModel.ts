export interface IDataModel {
    id: string;
    name: string;
    properties: IDataModelProperty[];
}

export interface IDataModelProperty {
    id: string;
    name: string;
    type: string;
    dataModelId: string;
}