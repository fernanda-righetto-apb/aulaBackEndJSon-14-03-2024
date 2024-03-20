// CLI = Comand Line Interface

import pegaArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk";



// 1) Criar uma variável para recepcionar o caminho via terminal
//valor de argumento - argv
// process
const caminho = process.argv;
//console.log(caminho);

//pegaArquivo(caminho[2]);

//função imprimir no terminal
function imprimeLista(resultado, identificador=""){
    console.log(chalk.yellow('Lista de links'),
    chalk.black.bgGreen(identificador),
    resultado);
}

//tornar função assíncrona (async e await), não fica pendente
async function processaTexto(argumentos){
    const caminho = argumentos[2];
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
        imprimeLista(resultado);
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


//node package manager (NPM)- gerenciador de pacotes do node 