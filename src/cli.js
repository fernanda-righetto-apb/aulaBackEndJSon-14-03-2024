// CLI = Comand Line Interface

import pegaArquivo from "./index.js";



// 1) Criar uma variável para recepcionar o caminho via terminal
//valor de argumento - argv
// process
const caminho = process.argv;
console.log(caminho);

pegaArquivo(caminho[2]);