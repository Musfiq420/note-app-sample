import { MouseEventHandler } from "react";

export interface INote {
    id?: string,
    title: string,
    body: string,
    onDelete?: MouseEventHandler<HTMLButtonElement>
}