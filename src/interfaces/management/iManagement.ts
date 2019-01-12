export interface IDict {
    Id: number;
    Code: string;
    Name: string;
    Desc: string;
    selected?: boolean;
};


export interface ICondition {
    Id?: number;
    Code?: string;
    DictPK?: number;
    Precode?: number;
    AdditionBit?: number;
}
