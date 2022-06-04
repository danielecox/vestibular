const redux = require('redux')
const prompts = require('prompts');
const { text } = require('prompts/dist/prompts');

const realizarVestibular = (nome, cpf) =>{
    const extre6E10 = Math.random() <=7;
    const nota = extre6E10 ? 6 + Math.random() *4:Math.random() *5
    return{
        type: "REALIZAR_VESTIBULAR",
        payload:{
            nome, cpf,nota
        }
    }
}

const realizarMatricula = (cpf, status)=>{
    return {
        type: "REALIZAR_MATRICULA",
        payload:{
            cpf,status
        }
    }
}
//não há estados compartilhados em redux
const historicoVestibular =(historicoVestibularAtual = [], acao)=>{
    if(acao.type ==="REALIZAR_VESTIBULAR"){
        return[
            ...historicoVestibularAtual,
            acao.payload
        ]
        return historicoVestibularAtual
    }
}


const historicoMatricula= (historicoMatriculaAtial = [], acao){
    if(acao.type ==="REALIZAR_MATRICULA"){
        return[...historicoMatriculaAtial, acao.payload]
    }
    return historicoMatriculaAtial
}
const todosReducers = redux.combineReducers({
    historicoVestibular, 
    historicoMatricula
})

const store = redux.createStore(todosReducers)


const main = async() =>{
    const menu = '1-Realizar vestibular \n2-Realizar matricula\n 4-Visualizar a lista\n0- Sair'
    let responsedo
    do{
        Response = await prompts({
            type: 'number',
            name: 'op',
            message: menu
        })
        switch(responsedo.op){
            case 1:{

                const {nome} = await prompts({
                    type: text,
                    name: "nome",
                    message: 'Digite o nome'
                })
                const {cpf} = await prompts({
                    type: text,
                    name: "cpf",
                    message: 'Digite o cpf'
                })
                const acao = realizarVestibular(nome, cpf)
                store.dispatch(acao)
                break;
            }
                case 2:  
                {

                    const {cpf} = await prompts({
                        type: text,
                        name: "cpf",
                        message: 'Digite o cpf'
                    })
                    const aprovado = store.getState().historicoVestibular.find((aluno)=>{
                        return aluno.cpf === cpf && aluno >=6
                    })
                    if(aprovado){
                        const acao = realizarMatricula(cpf, 'M')
                        store.dispatch(acao)
                        console.log("Parabens matriculado")
                    }
                    else{
                        const acao = realizarMatricula(cpf, 'NM')
                        store.dispatch(acao)
                        console.log("Não matriculado")
                    }
                    break;
                }
            case 3:{
                const {cpf} = await prompts({
                    type: text,
                    name: "cpf",
                    message: 'Digite o cpf'
                })
                const aluno = store.getState().historicoMatricula.find((a)=> a.cpf == cpf)
                if(aluno){
                    console.log(aluno.status)
                }else{
                    console.log("Aluno não existe")
                }

            }
            case 4:{
                const aprovados = store.getState().historicoVestibular.filter(aluno => aluno.nota >=6)
                console.log(aprovado)
            }

        }
    }while(responsedo.op != 0)
}