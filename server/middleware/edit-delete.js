//EDIT
function editBlue(postId) {
    console.log('editBlue Function Called')
};

console.log(postId);

const fetch_url = `http://WEBSITE URL HERE`;
const accessToken = localStorage.getItem('SessionToken');

let card = document.getElementById(postId);
let input = document.createElement('input');

if (card.childNodes.length < 2) {
    card.appendChild(input);
    input.setAttribute("type", "text");
    input.setAttribute("id", "updatedEdit");
    input.setAttribute("placeholder", ");
} else {

    let updated = document.getElementById('updatedEdit').nodeValue;
    let newEdit = {
        edit: {
            edit: updated
        }
    }

    fetch(fetch_url, {
        method: "PUT",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }),
        body: JSON.stringify(newEdit)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMine();
        })
        .catch(err => {
        })

    card.removeChild(card.lastChild)
}



//DELETE
function deleteBlue(postId) {
    console.log(postId);

    const fetch_url = `websiteURL${postId}`;
    const accessToken = localStorage.getItem('SessionToken');
    fetch(fetch_url, {
        method: "DELETE",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMine();
        })
        .catch(err => {
            console.error(err)
        })
}



