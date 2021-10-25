import {showError} from "../helpers/errorsHelper.js";

const registerForm = document.getElementById('registerForm')
const errors = document.querySelector('.errors')

const URL = 'http://localhost:3000/auth/register'

registerForm.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const formData = new FormData(registerForm)
    console.log(Object.fromEntries(formData))
    const {name, email, password1, password2} = Object.fromEntries(formData)
    if (password1 !== password2) return showError("Passwords don't match", errors, true)

    const user = {
        name,
        email,
        password: password1
    }
    const options = {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(user)
    }
    const res = await fetch(URL, options)
    const data = await res.json()
    console.log(data)
    if (Array.isArray(data.error)) return showError(data.error, errors, false)
    if (data.error) return showError(data.error, errors, true)
    alert(data.msg)
    // window.location = 'login.html'
})