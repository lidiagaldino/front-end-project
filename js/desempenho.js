import { getAlunoMatricula } from "./functions.js";

const createInfo = (data) => {

    const div = document.createElement('div')
    const img = document.createElement('img')
    const span = document.createElement('span')

    img.src = data.foto
    span.textContent = data.nome
    div.classList.add('info-container')

    div.appendChild(img)
    div.appendChild(span)

    return div
}

const createDesempenho = (data) => {

    const div = document.createElement('div')
    const bar = document.createElement('div')
    const desempenhoBar = document.createElement('div')
    const nota = document.createElement('span')
    const disciplina = document.createElement('span')

    div.classList.add('container')
    bar.classList.add('desempenho')
    desempenhoBar.classList.add('desempenho-bar')
    nota.classList.add('nota')
    disciplina.classList.add('disciplina')

    if (data.media > 60) {
        desempenhoBar.classList.add('azul')
        nota.classList.add('azul-text')
    } else if(data.media < 50){
        desempenhoBar.classList.add('vermelho')
        nota.classList.add('vermelho-text')
    } else{
        desempenhoBar.classList.add('amarelo')
        nota.classList.add('amarelo-text')
    }

    nota.textContent = data.media
    desempenhoBar.style.height = data.media + '%'
    desempenhoBar.style.setProperty('--height', data.media + '%')
    disciplina.textContent = data.sigla

    bar.appendChild(desempenhoBar)
    
    div.appendChild(nota)
    div.appendChild(bar)
    div.appendChild(disciplina)

    return div
}

const getInfo = async () => {

    const main = document.querySelector('main')
    const desempenhoContainer = document.createElement('div')
    desempenhoContainer.classList.add('container-desempenho')

    const data = await getAlunoMatricula(localStorage.getItem('idAluno'), localStorage.getItem('curso'))

    const info = createInfo(data)
    const desempenho = data.desempenho.map(createDesempenho)


    desempenhoContainer.replaceChildren(...desempenho)
    main.appendChild(info)
    main.appendChild(desempenhoContainer)
}

getInfo()