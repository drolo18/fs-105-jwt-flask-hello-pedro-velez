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
        const url = `${backendUrl}api/user/login`

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
            const data = await response.json()
            if (data.token) {
                sessionStorage.setItem('token', data.token)
            }
            return data
        }
        const errorData = await response.json()
        console.error("error to login user", errorData)
        return null

    } catch (error) {
        console.error("error to login user", error)
        return null
    }
}

const LogoutUser = async() => {
    try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL
        const url = `${backendUrl}api/user/logout`
        const token = sessionStorage.getItem('token')

        if (!token) {
            console.error("No hay token de sesión")
            return false
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token.trim()}`
            },
            body: JSON.stringify({})
        })

        if(response.ok){
            sessionStorage.removeItem('token')
            return true
        }
        
        const errorData = await response.json()
        console.error("error al cerrar sesión", errorData)
        return false

    } catch (error) {
        console.error("error al cerrar sesión", error)
        return false
    }
}

export const userService = {
    SignupUser,
    LoginUser,
    LogoutUser
}