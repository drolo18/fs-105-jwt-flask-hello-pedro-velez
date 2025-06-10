

const SignupUser = async(body) => {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        const url = `${backendUrl}api/user/register`

        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body : JSON.stringify(body)
        })
        if(response.status === 200){
            return true
        }
        console.error("error to register user", response)

    } catch (error) {
        console.error("error to register user", error)
    }
}

export const userService = {
    SignupUser,
}