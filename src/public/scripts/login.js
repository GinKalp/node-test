import {showError} from "../helpers/errorsHelper.js";

const loginForm = document.getElementById('loginForm')
const errors = document.querySelector('.errors')

const URL = 'http://localhost:3000/auth/login'

loginForm.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const formData = new FormData(loginForm)

    const options = {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData))
    }
    const res = await fetch(URL, options)
    const data = await res.json()
    console.log(data)
    if (Array.isArray(data.error)) return showError(data.error, errors, false)
    if (data.error) return showError(data.error, errors, true)
    localStorage.setItem('userToken', data.data.token)
    alert(data.msg)
    window.location = 'groups.html'
})