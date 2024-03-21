//gerar vetor e gera os nomes dos links
//.join() - separador de strings que constituem um array
function extraiLinks(arrLinks){
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}




//criar uma função listaValidada

export default function listaValidada(listaDeLinks){
    return extraiLinks(listaDeLinks);
}