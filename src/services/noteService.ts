import axios from "axios";
import type { Note, NoteForPost } from "../types/note";
export interface NoteResponse{
    notes: Note[],
    totalPages: number
   }

axios.defaults.baseURL = "https://notehub-public.goit.study/api"

export async function fetchNotes(pageCount: number, searchedValue: string): Promise<NoteResponse>{
    const url = !(searchedValue) ? `/notes?page=${pageCount}&perPage=12` : `/notes?page=${pageCount}&perPage=12&search=${searchedValue}`; 
    const responce = await axios.get<NoteResponse>(url,{
        headers: {
           Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return  responce.data;

    
}

export async function postNote(noteForPostObj: NoteForPost): Promise<Note>{
    const responce = await axios.post<Note>(`/notes`, noteForPostObj, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return responce.data;
}

export async function deleteNote(noteId: number): Promise<Note>{
    const responce = await axios.delete<Note>(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return responce.data;
}