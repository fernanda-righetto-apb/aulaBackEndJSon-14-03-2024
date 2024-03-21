// CLI = Comand Line Interface

import pegaArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk";
import listaValidada from "./http-validacao.js";


// 1) Criar uma variável para recepcionar o caminho via terminal
//valor de argumento - argv
// process
const caminho = process.argv;
//console.log(caminho);

//pegaArquivo(caminho[2]);

//função imprimir no terminal
function imprimeLista(valida,resultado, identificador=""){
    if(valida){
        console.log(chalk.yellow('Lista de links'),
        chalk.black.bgGreen(identificador),
        listaValidada(resultado));
    }else{
        console.log(chalk.yellow('Lista de links'),
        chalk.black.bgGreen(identificador),
        resultado);
    }
    //duas escolhas da função imprimeLista: cli:valida - quer ver um vetor com os links preenchidos / cli - sem passagem de valida (cai direto no else)
}

//tornar função assíncrona (async e await), não fica pendente
async function processaTexto(argumentos){
    const caminho = argumentos[2];
    //posição 3 - que é a posição valida (--valida)
    const valida = argumentos[3] === "--valida";

    try{
        fs.statSync(caminho)
    }
    //armazena o erro
    catch(erro){
        if(erro.code ==="ENOENT"){
            console.log('Arquivo ou diretório não encontrado!');
            return;
        }
    }
    //usando biblioteca fs um método que identifique se é um arquivo ou não
    if(fs.lstatSync(caminho).isFile()){
        const resultado =await pegaArquivo(caminho);
        imprimeLista(valida,resultado);
        // console.log(chalk.yellow('Lista de links'),resultado);
    } else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos =await fs.promises.readdir(caminho);
        arquivos.forEach(async(nomeDoArquivo) => {
            const lista =await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            // console.log(`${caminho}/${nomeDoArquivo}`);
            // console.log(lista);
            imprimeLista(lista, nomeDoArquivo);
        })
    }

    
}

processaTexto(caminho);


//node package manager (NPM)- gerenciador de pacotes do node com o verbo RUN (executar)


//cli:valida - permitir fazer outras coisas, exemplo criar vetor onde tem todas as strings e posteriormente fazer o teste dos links