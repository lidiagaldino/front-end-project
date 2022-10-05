'use strict'

const getCursos = async () => {

    const url = 'https://senai-api.netlify.app/.netlify/functions/api/cursos'

    const response = await fetch(url)
    const listaCursos = await response.json()

    return listaCursos
}

const getAlunosStatus = async (status, curso) => {

    const url = `https://senai-api.netlify.app/.netlify/functions/api/alunos/${status}/${curso}`

    const response = await fetch(url)
    const listaAlunos = await response.json()

    return listaAlunos.alunos
}

const getAlunoMatricula = async (matricula, curso) => {

    const url = `https://senai-api.netlify.app/.netlify/functions/api/aluno/${matricula}/${curso}`

    const response = await fetch(url)
    const aluno = await response.json()

    return aluno
}

const getAlunosCurso = async (curso) => {

    const url = `https://senai-api.netlify.app/.netlify/functions/api/alunos/${curso}`

    const response = await fetch(url)
    const listaAlunos = await response.json()

    return listaAlunos
}

const getAlunoAno = async (ano, curso) => {

    const url = `https://senai-api.netlify.app/.netlify/functions/api/estudantes/${ano}/${curso}`

    const response = await fetch(url)
    const listaAlunos = await response.json()

    if(response.status == 200){
        return listaAlunos.alunos
    } else{
        return false
    } 
}

const getAnos = async (curso) => {

    const url = `https://senai-api.netlify.app/.netlify/functions/api/alunos/${curso}`

    const response = await fetch(url)
    const listaAlunos = await response.json()

    return listaAlunos.alunos
}

export {
    getAlunoMatricula,
    getAlunosStatus,
    getCursos,
    getAlunosCurso,
    getAlunoAno,
    getAnos
}