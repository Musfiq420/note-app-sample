import { MouseEventHandler } from "react";

export interface INote {
    id?: string,
    title: string,
    body: string,
    user: string,
    favourite: boolean,
}

export interface ITrashNote {
    id?: string,
    title: string,
    body: string,
    user: string,
    favourite: boolean,
    trashAt: Date,
}

export interface AuthState {
    clientId : string,
    profile : object | null | any
} 
