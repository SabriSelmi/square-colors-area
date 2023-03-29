export interface Area {
    size: number;
    color: string | null;    
    cells: number[][];
}

export interface InputType {
    id : string;
    type : string;
    value : string;
    onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
    name : string;
    placeholder? : string;
}