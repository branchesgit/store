export interface ICMenu {
    name: string;
    key?: string;
    children?: ICMenu[];
    path?: string;
}
