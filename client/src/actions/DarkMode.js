import {atom} from 'recoil'

export const darkModes = atom({
    key:"darkMode",
    default:false
})
export const AuthUser = atom({
    key:"AuthUser",
    default:''
})
export const chatResponse = atom({
    key:"chatResponse",
    default:[]
})