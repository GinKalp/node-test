const mainContainer = document.querySelector('main')
const addBtn = document.getElementById('addBtn')
const groupIdInp = document.querySelector('input')

const URL = 'http://localhost:3000'
const token = localStorage.getItem('userToken')

window.onload = async () =>{
    const groupsData = await getUsersGroups()
    appendGroups(groupsData)
    singleGroup()
}

async function getUsersGroups(){
    const options = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const resp = await fetch(URL + '/accounts', options)
    const data = await resp.json()
    console.log(data)
    return data.data
}
function appendGroups(data){
    data.map(item =>{
        mainContainer.innerHTML += `<div data-id="${item.group_id}" class="card">
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
    const resp = await fetch(URL + '/accounts', options)
    const data = await resp.json()
    console.log(data)
    if (!data.error) alert(data.msg)
    if (data.error) return alert(data.error)
    window.location.reload()
}
function singleGroup(){
    const cardDivs = document.querySelectorAll('.card')
    for (let i = 0; i < cardDivs.length; i++) {
        cardDivs[i].onclick = async (event) =>{
            console.log(event.target.dataset.id)
            const groupId = event.target.dataset.id
            localStorage.setItem('groupId', groupId)
            window.location = 'bills.html'
        }
    }
}
