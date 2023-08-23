interface SkeType{
    chatCount : number ,
}

const initialSke : SkeType = {
    chatCount  : 1,
}

export const ske : SkeType = localStorage.getItem('ske') ? JSON.parse(localStorage.getItem('ske') || '{}') : initialSke