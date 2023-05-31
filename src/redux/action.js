export const stylizedImage=val=>({
    type:"success",
    payload:val
})

export const loader=val=>({
    type:"set",
    payload:val
})

export const chat=val=>({
    type:"set",
    payload:val
})

export const isLoggedIn=val=>({
    type:"loggedIn",
    payload:val
})