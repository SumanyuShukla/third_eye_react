export const stylizedImage=val=>({
    type:"success",
    payload:val
})

export const loader=val=>({
    type:"loader",
    payload:val
})

export const chat=val=>({
    type:"set",
    payload:val
})

export const chatdoc=val=>({
    type:"setdoc",
    payload:val
})

export const isLoggedIn=val=>({
    type:"loggedIn",
    payload:val
})

export const uploaded=val=>({
    type:"uploaded",
    payload:val
})

export const userid=val=>({
    type:"userid",
    payload:val
})

export const template=val=>({
    type:"setTemplate",
    payload:val
})