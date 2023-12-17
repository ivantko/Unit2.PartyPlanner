let parties = []; // This will act as our local 'database'

document.addEventListener('DOMContentLoaded', () => {
    loadPartiesFromJSON();
    document.getElementById('add-party-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addParty();
    });
});

function loadPartiesFromJSON() {
    fetch('parties.json')
        .then(response => response.json())
        .then(data => {
            parties = data;
            renderParties();
        });
}

function renderParties() {
    const partyList = document.getElementById('party-list');
    partyList.innerHTML = '';
    parties.forEach(party => {
        const partyDiv = document.createElement('div');
        partyDiv.innerHTML = `
            <p>Name: ${party.name}</p>
            <p>Date: ${party.date}</p>
            <p>Time: ${party.time}</p>
            <p>Location: ${party.location}</p>
            <p>Description: ${party.description}</p>
            <button onclick="deleteParty('${party.id}')">Delete</button>
        `;
        partyList.appendChild(partyDiv);
    });
}

function deleteParty(id) {
    parties = parties.filter(party => party.id !== id);
    renderParties();
}

function addParty() {
    const newParty = {
        id: String(Date.now()), // Simple ID generation
        name: document.getElementById('name').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value
    };

    parties.push(newParty);
    renderParties();
}
