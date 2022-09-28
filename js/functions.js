'use strict'

const getCursos = async () => {

    const url = 'http://localhost:8080/cursos'

    const response = await fetch(url)
    const listaCursos = await response.json()

    return listaCursos
}

const getAlunosStatus = async (status, curso) => {

    const url = `http://localhost:8080/alunos/${status}/${curso}`

    const response = await fetch(url)
    const listaAlunos = await response.json()

    return listaAlunos.alunos
}

const getAlunoMatricula = async (matricula, curso) => {

    const url = `http://localhost:8080/aluno/${matricula}/${curso}`

    const response = await fetch(url)
    const aluno = await response.json()

    return aluno
}

const getAlunosCurso = async (curso) => {

    const url = `http://localhost:8080/alunos/${curso}`

    const response = await fetch(url)
    const listaAlunos = await response.json()

    return listaAlunos
}

const getAlunoAno = async (ano, curso) => {

    const url = `http://localhost:8080/estudantes/${ano}/${curso}`

    const response = await fetch(url)
    const listaAlunos = await response.json()

    if(response.status == 200){
        return listaAlunos.alunos
    } else{
        return false
    }

    
}

export {
    getAlunoMatricula,
    getAlunosStatus,
    getCursos,
    getAlunosCurso,
    getAlunoAno
}