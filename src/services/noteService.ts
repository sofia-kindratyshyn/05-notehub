import axios from "axios";
import type { NoteForPost} from "../types/note";
export interface NoteResponce{
    notes: [],
    totalPages: number
   }

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

export async function postNote(noteForPostObj: NoteForPost){
    const responce = await axios.post<NoteForPost>(`/notes`, noteForPostObj, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return responce.data;
}

export async function deleteNote(noteId: number){
    const responce = await axios.delete(`/notes/${noteId}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`
        }
    })
    return responce.data;
}