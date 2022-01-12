import { atom } from 'nanostores'

export const searchStore = atom< {search: string, data: Array<{ ref: string, score: number}>} | undefined>(undefined)
export const searchTextStore = atom<string>('')
