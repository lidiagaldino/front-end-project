'use strict'

import { getCursos } from "./functions.js"

const createCards = (dados) => {

    const a = document.createElement('a')
    const div = document.createElement('div')
    const img = document.createElement('img')
    img.src = dados.icone

    img.classList.add('icone')
    div.classList.add('cards')
    a.classList.add('link')

    a.textContent = dados.sigla
    a.href = './pages/alunos.html'
 
    a.appendChild(img)
    div.appendChild(a)

    return div
}

const loadCard = async () => {

    const cardContainer = document.getElementById('cards')
    const data = await getCursos()

    const cards = data.cursos.map(createCards)

    cardContainer.replaceChildren(...cards)
}

loadCard()

document.querySelector('#cards').addEventListener('click', (event) => {

    if (event.target.classList.contains('icone')) {
        localStorage.setItem('curso', event.target.parentElement.textContent)
    } else{
        localStorage.setItem('curso', event.target.textContent)
    }
})



