const mainContainer = document.querySelector('main')
const addBtn = document.getElementById('addBtn')
const groupIdInp = document.querySelector('input')

const URL = 'http://localhost:3000/accounts'
const token = localStorage.getItem('userToken')

window.onload = async () =>{
    const groupsData = await getUsersGroups()
    appendGroups(groupsData)
}

async function getUsersGroups(){
    const options = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const resp = await fetch(URL, options)
    const data = await resp.json()
    console.log(data)
    return data.data
}
function appendGroups(data){
    data.map(item =>{
        mainContainer.innerHTML += `<div class="card">
                                        <h2>ID: ${item.group_id}</h2>
                                        <p>${item.group_name}</p>
                                    </div>`
    })
}

addBtn.onclick = async () =>{
    const group = {
        groupid: Number(groupIdInp.value)
    }
    const options = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(group)
    }
    const resp = await fetch(URL, options)
    const data = await resp.json()
    console.log(data)
    if (!data.error) alert(data.msg)
    if (data.error) return alert(data.error)
    window.location.reload()
}