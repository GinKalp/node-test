const main = document.querySelector('main')
const tbody = document.querySelector('tbody')
const inputs = document.querySelectorAll('input')
const addBtn = document.getElementById('addBtn')

const URL = 'http://localhost:3000'
const groupId = localStorage.getItem('groupId')

window.onload = async () =>{
    const billsData = await getBills(groupId)
    appendData(billsData)
}
async function getBills(groupId){
    const resp = await fetch(`${URL}/bills/${groupId}`)
    const data = await resp.json()
    console.log(data)
    return data.data
}
function appendData(data){
    if (!data) return
    if (Array.isArray(data)){
        data.map(item =>{
            tbody.innerHTML += `<tr>
                                <td>${item.id}</td>
                                <td>${item.description}</td>
                                <td>$${item.amount}</td>
                            </tr>`
        })
    } else {
        tbody.innerHTML += `<tr>
                                <td>${data.id}</td>
                                <td>${data.description}</td>
                                <td>$${data.amount}</td>
                            </tr>`
    }

}

addBtn.onclick = async () =>{
    const bill = {
        group_id: Number(groupId),
        amount: Number(inputs[0].value),
        descriptions: inputs[1].value
    }
    const options = {
        method: "POST",
        headers: {
            "content-type":"application/json",
        },
        body: JSON.stringify(bill)
    }

    const resp = await fetch(`${URL}/bills`, options)
    const data = await resp.json()
    console.log(data)
    if (data.error) alert(data.error)
    if (!data.error) alert(data.msg)
    window.location.reload()
}