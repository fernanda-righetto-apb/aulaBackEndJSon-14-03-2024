async function checaStatus(listaUrls){
    const arrStatus = await Promise.all(
        listaUrls.map(async (url)=>{
            const response = await fetch(url);
            return response.status; 
         })
    );
    return arrStatus;
}


//gerar vetor e gera os nomes dos links
//.join() - separador de strings que constituem um array
function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}




//criar uma função listaValidada

export default async function listaValidada(listaDeLinks){
    // return extraiLinks(listaDeLinks);
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    //console.log(status);
    return status;
}






//Protocolo HTTP - informação de resposta http - requisição - perfeito/sucesso na requisição (código 200 - deu tudo certo)
//método fetch




//[gatinho salsicha](http://gatinhosalsicha.com.br/)