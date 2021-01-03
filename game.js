// definindo os players
const playler1 = "X";
const playler2 = "O";

var playTime = playler1; // definir quem joga
let gameOVer = false; // verificar se jogo acabou

// atualizar mostrador
atualizaMostrador();
inicializarEspacos();

function atualizaMostrador(){
    if(gameOVer){ // se jogo finalizado, não faz nada
        return;
    }

    if(playTime == playler1){
        let player = document.querySelectorAll("div#mostrador img")[0]; // selecionar o primeiro elemento
        player.setAttribute("src", "images/cross.jpg"); // setar a imagem
    } else {
        let player = document.querySelectorAll('div#mostrador img')[0]; 
        player.setAttribute("src", "images/circle.jpg"); 
    }

}

//pegar todas as divs, e dizer que ele vai ficar esperando clique pra setar imagem
function inicializarEspacos(){
    let espacos = document.getElementsByClassName('espaco');

    // varrer todo o tabuleiro
    for(let i = 0; i < espacos.length; i+=1){
        espacos[i].addEventListener("click", function(){
            if(gameOVer){ return; } // se jogo acabou, não aceita nenhum clique
            
            if(this.getElementsByTagName("img").length == 0 ) { // se espaço estiver vazio,
                if(playTime == playler1){
                    this.innerHTML = "<img src='images/cross.jpg'>" // quando jogador 1 jogar, setar imagem X
                    this.setAttribute("jogada", playler1); // setar o atributo com o valor do jogador 1
                    playTime = playler2; // mudando a vez do jogador
                } else {
                    this.innerHTML = "<img src='images/circle.jpg'>" // quando jogador 2 jogar, setar imagem O
                    this.setAttribute("jogada", playler2); // setar o atributo com o valor do jogador 2
                    playTime = playler1; // mudando a vez do jogador
                }
                atualizaMostrador(); // atualizar tabuleiro
                verificarVencedor(); // verificar se há vencedor
            }
        });
    }
}

// verificando vencedor
async function verificarVencedor(){ // async -> sincronizar com a chamada da função
    var a1 = document.getElementById('linha-a1').getAttribute("jogada"); // pegando o valor de cada peça
    var a2 = document.getElementById('linha-a2').getAttribute("jogada");
    var a3 = document.getElementById('linha-a3').getAttribute("jogada");

    var b1 = document.getElementById('linha-b1').getAttribute("jogada"); // pegando o valor de cada peça
    var b2 = document.getElementById('linha-b2').getAttribute("jogada");
    var b3 = document.getElementById('linha-b3').getAttribute("jogada");

    var c1 = document.getElementById('linha-c1').getAttribute("jogada"); // pegando o valor de cada peça
    var c2 = document.getElementById('linha-c2').getAttribute("jogada");
    var c3 = document.getElementById('linha-c3').getAttribute("jogada");

    var vencedor = "";
    if(((a1 == b1 && a1 == c1) || (a1 == a2 && a1 == a3 ) || (a1 == b2 && a1 == c3 )) && a1 != ""  ){
        vencedor = a1;
    } else if((b2 == b1 && b2 == b3 ) || (b2 == a2 && b2 == c2 ) || (b2 == a3 && b2 == c1 ) && b2 !="") {
        vencedor = b2;
    } else if(((c3 == c2 && c3 == c1) || (c3 == a3 && c3 == b3)) && c3 != "") {
        vencedor = c3;
    } if(vencedor != ""){
        gameOVer = true; // fim do jogo
        setTimeout(function(){

        }, 2000);
        alert("Ganhador: ' " + vencedor + " ' ");
    }
}