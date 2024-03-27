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
export const tweets = atom({
    key:"tweets",
    default:[]
})
export const images = atom({
    key:"images",
    default:[]
})
export const videos = atom({
    key:"videos",
    default:[]
})
export const calleds = atom({
    key:"calleds",
    default:true
})
export const renderCalled = atom({
    key:'renderCalled',
    default:true
})
export const currentUserPlan = atom({
    key:'currentPlan',
    default:''
})
export const UserPayments = atom({
    key:'UserPayments',
    default:[]
})