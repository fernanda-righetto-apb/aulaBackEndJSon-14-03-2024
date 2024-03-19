// CLI = Comand Line Interface

import pegaArquivo from "./index.js";
import fs from "fs";
import chalk from "chalk";



// 1) Criar uma variável para recepcionar o caminho via terminal
//valor de argumento - argv
// process
const caminho = process.argv;
console.log(caminho);

//pegaArquivo(caminho[2]);

//tornar função assíncrona (async e await), não fica pendente
async function processaTexto(argumentos){
    const caminho = argumentos[2];
    //usando biblioteca fs um método que identifique se é um arquivo ou não
    if(fs.lstatSync(caminho).isFile()){
        const resultado =await pegaArquivo(caminho);
        console.log(chalk.yellow('Lista de links'),resultado);
    } else if(fs.lstatSync(caminho).isDirectory()){
        const arquivos =await fs.promises.readdir(caminho);
        arquivos.forEach(async(nomeDoArquivo) => {
            const lista =await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            console.log(`${caminho}/${nomeDoArquivo}`);
            console.log(lista);
        })
    }

    
}

processaTexto(caminho);