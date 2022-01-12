import { atom } from 'nanostores'

export const searchStore = atom<  {status: 'NONE' | 'LOADING'  } | {status: 'DONE', search: string, data: Array<{ ref: string, score: number}>}>({status: 'NONE'})
export const searchTextStore = atom<string>('')
