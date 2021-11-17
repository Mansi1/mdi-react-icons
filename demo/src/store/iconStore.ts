import { atom } from 'nanostores'
import {Icon} from "../interfaces/Icon";

export const iconStore = atom<Icon| undefined>(undefined)
