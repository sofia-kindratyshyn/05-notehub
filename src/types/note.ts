export type NoteResponce = null | NoteList

export interface Note{
id: number
  title: string,
  content: string,
  tag: string
}

export interface NoteList {
  notes: Note[],
  totalPages: number
}

export interface NoteForPost{
  title: string,
  content: string,
  tag: string
}