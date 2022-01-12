import { atom } from 'nanostores'
import {Icon} from "../interfaces/Icon";
export type Version ={version: 'V4' | 'V5' | 'none'
}
const getDefaultValue = ():Version=> {
    if (window.location.pathname.indexOf('/mui') >-1) {
        return{version: "V5"}
    } else if (window.location.pathname.indexOf('/material-ui')> -1){
        return{version: "V4"}
    } else {
        window.history.replaceState({}, "material-v5", "/mdi-react-icons/mui");
        return  {version: "V5"}
    }
}
export const versionStore = atom< Version>(getDefaultValue())

versionStore.listen((value) => {
    console.log('change',value, window.location.pathname)
    if (value.version === "V5" && window.location.pathname.indexOf('/mui') === -1) {
        window.history.replaceState({}, "material-v5", "/mdi-react-icons/mui");
    } else if (value.version === "V4" && window.location.pathname.indexOf('/material-ui') === -1) {
        window.history.replaceState({}, "material-v4", "/mdi-react-icons/material-ui");
    }
})
