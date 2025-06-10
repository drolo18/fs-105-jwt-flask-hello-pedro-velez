const SignupUser = async(body) => {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const url = `${backendUrl}api/user/register`

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        
        if(response.ok){
            return true
        }
        console.error("error to register user", response)

    } catch (error) {
        console.error("error to register user", error)
    }
}

const LoginUser = async(body) => {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const url = `${backendUrl}/api/user/login`

        const response = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if(response.status === 200){
            const data = await response.json()
            return data
        }
        console.error("error to login user", response)

    } catch (error) {
        console.error("error to login user", error)
    }
}

export const userService = {
    SignupUser,
    LoginUser
}