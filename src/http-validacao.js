import chalk from "chalk";

async function checaStatus(listaUrls){
    const arrStatus = await Promise.all(
        listaUrls.map(async (url)=>{
            try{
                const response = await fetch(url);
                return response.status; 
            }catch(erro){
                return manejaErros(erro);
            }
         })
    );
    return arrStatus;
}


//gerar vetor e gera os nomes dos links
//.join() - separador de strings que constituem um array
function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

function manejaErros(erro){
    // console.log(chalk.red('Algo deu errado'));
    //cause - causa do erro
    if(erro.cause.code==="ENOTFOUND"){
        return 'Link não encontrado'
    } else{
        return 'Ocorreu um erro'
    }
}


//criar uma função listaValidada

export default async function listaValidada(listaDeLinks){
    // return extraiLinks(listaDeLinks);
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    //console.log(status);
    return listaDeLinks.map((objeto,indice) => ({
        //distriuir informação, esparramar - ...
        ...objeto,
        status:status[indice]
    }));
    //percorrer a lista, desmembra as informações,daí junta a variável status com o status propriamente dito (índice)
}






//Protocolo HTTP - informação de resposta http - requisição - perfeito/sucesso na requisição (código 200 - deu tudo certo)
//método fetch




//[gatinho salsicha](http://gatinhosalsicha.com.br/)