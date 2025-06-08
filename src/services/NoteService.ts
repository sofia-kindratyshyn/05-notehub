import axios from "axios";
import type { NoteResponce } from "../types/note";
import type { NoteForPost } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api"

export async function fetchNotes(pageCount: number, searchedValue: string): Promise<NoteResponce>{
    const url = !(searchedValue) ? `/notes?page=${pageCount}&perPage=12` : `/notes?page=${pageCount}&perPage=12&search=${searchedValue}`; 
    const responce = await axios.get<NoteResponce>(url,{
        headers: {
           Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return  responce.data;
    
}

export async function postNotes(noteForPostObj: NoteForPost){
    await axios.post<NoteForPost>(`/notes`, noteForPostObj, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
}

export async function deleteNotes(noteId: number){
    await axios.delete(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
}