import {ADD_USER_ID} from './constants'

export function addUserId(payload){
    return {
        type: ADD_USER_ID,
        data: payload
    }
}