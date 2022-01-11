import {IdPropertyFunction} from "@milkscout/react/function/getIdentityMap";

export const getIdentityArrayMap = <T>(array: T[], idPropertyFun: IdPropertyFunction<T>): Record<string, Array<T>> => {
    const result: Record<string, Array<T>> = {}
    for(let i = 0; i < array.length; i++){
        const item: T = array[i];
        const property = idPropertyFun(item);
        if(typeof result[property] === 'undefined'){
            result[property] = []
        }
        result[property].push(item)
    }
    return result;
}