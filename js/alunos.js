'use strict'

import { getAlunoAno, getAlunosCurso, getAlunosStatus, getAnos } from "./functions.js"

const createAlunos = (dados) =>{

    const a = document.createElement('a')
    const img = document.createElement('img')
    const span = document.createElement('span')
    a.classList.add('cards-alunos')
    img.src = dados.foto
    span.textContent = dados.nome
    img.classList.add('dados')
    span.classList.add('dados')
    a.id = dados.matricula
    a.href = './desempenho.html'

    if (dados.status == 'Cursando') {
        a.classList.add('cards-azul')
    }
    if (dados.status == 'Finalizado') {
        a.classList.add('cards-amarelo')
    }

    a.appendChild(img)
    a.appendChild(span)
   

    return a
}

const createTitle = (data) => {
    const h1 = document.createElement('h1')

    const separador = data.curso.split('-')
    h1.textContent = separador[1]

    return h1
} 

const loadAlunos = async (curso) => {

    const main = document.querySelector('main')

    main.innerHTML = ''
    const alunosContainer = document.createElement('div')
    alunosContainer.id = 'alunos-container'
    const data = await getAlunosCurso(curso)

    const cards = data.alunos.map(createAlunos)
    const title = createTitle(data.alunos[0])

    alunosContainer.classList.add('alunos-container')

    alunosContainer.replaceChildren(...cards)
    main.appendChild(title)
    main.appendChild(alunosContainer)
}

loadAlunos(localStorage.getItem('curso'))

const loadAlunoStatus = async (event) => {

    if (event.target.textContent == 'Status') {
        loadAlunos(localStorage.getItem('curso'))
    } else{
        const data = await getAlunosStatus(event.target.textContent, localStorage.getItem('curso'))
        const alunosContainer = document.getElementById('alunos-container')

        const cards = data.map(createAlunos)
        alunosContainer.replaceChildren(...cards)
    }
}

document.getElementById('status').addEventListener('click', loadAlunoStatus)

const loadAlunoAno = async (ano) => {

    const data = await getAlunoAno(ano, localStorage.getItem('curso'))

    if (data) {
        const alunos = data.map(createAlunos)

        const container = document.querySelector('#alunos-container')

        container.replaceChildren(...alunos)
    } else{
        alert('Não foi encontrado')
    }
    
    
}

const year = (data) => {

    return data.conclusao
}

const createOption = (ano) => {
     
    const option = document.createElement('option')
    option.value = ano
    option.textContent = ano
    option.id = ano

    return option
}

const loadForm = async () => {
    const form = document.getElementById('ano-conclusao')
    const data = await getAnos(localStorage.getItem('curso'))

    const anos = data.map(year)
    const anosCorrigido = [...new Set(anos)]
    anosCorrigido.sort((a, b) => a - b)

    const options = anosCorrigido.map(createOption)

    form.replaceChildren(...options)
}

loadForm()

const form = document.getElementById('ano-conclusao')



form.addEventListener('change', () => {

    loadAlunoAno(form.options[form.selectedIndex].text)
})

document.getElementById('limpar').addEventListener('click', () => {
    loadAlunos(localStorage.getItem('curso'))
})

document.querySelector('main').addEventListener('click', (event) => {

    if (event.target.classList.contains('cards-alunos')) {
        localStorage.setItem('idAluno', event.target.id)
    }
    if (event.target.classList.contains('dados')) {
        localStorage.setItem('idAluno', event.target.parentElement.id)
    }

})