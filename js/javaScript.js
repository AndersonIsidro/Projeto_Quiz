//variaveis de controle do jogo
let perguntasFeitas = []

//perguntas do jogo
const perguntas = [
    //pergunta 0
    {pergunta:"Qual dessas linguagens não é considerada uma linguagem de programação?",
    respostas:["PHP","Javascript","C++","HTML"],
    correta:"resp3"
    },  
    //pergunta 1
    {pergunta:"Em que ano o Brasil foi Descoberto?",
    respostas:["1458","1900","1500","1685"],
    correta:"resp2"
    },
    //pergunta 2
    {pergunta:"De onde é a invenção do chuveiro elétrico?",
    respostas:["França","Brasil","Italia","Australia"],
    correta:"resp1"
    },
    //pergunta 3
    {pergunta:"Complete o provérbio “Cavalo dado …”",
    respostas:["sai caro","tem medo de água fria","não se olha os dentes","não se olha o rabo"],
    correta:"resp2"
    },
    //pergunta 4
    {pergunta:"As pessoas de qual tipo sanguíneo são consideradas doadores universais?",
    respostas:["Tipo O","Tipo A","Tipo B","Tipo AB"],
    correta:"resp0"
    },
    //pergunta 5
    {pergunta:"Quem viveu, segundo a Bíblia, 969 anos?",
    respostas:["Matusalém","Jesus Cristo","Noé","Abel"],
    correta:"resp0"
    }   
    ]

var qtdPerguntas = perguntas.length -1
gerarPergunta(qtdPerguntas)
function gerarPergunta(maxPerguntas){
    //gerar um numero aleatorio
    let aleatorio = (Math.random() * maxPerguntas).toFixed()
    //converter para numero
    aleatorio = Number(aleatorio)

    //verificar se a pergunta sorteada ja foi feita
    if(!perguntasFeitas.includes(aleatorio)){
        //colocar como pergunta feita
        perguntasFeitas.push(aleatorio)

        //preencher o html com os dados da questao sorteada
        var p_selecionada = perguntas[aleatorio].pergunta
       
        //alimentar a pergunta vinda do sorteio
        $("#pergunta").html(p_selecionada)
        $("#pergunta").attr('data-indice',aleatorio)

        //colocar as respostas
        for(var i =0;i <4 ; i++){
            $("#resp"+i).html(perguntas[aleatorio].respostas[i])
        }

        //embaralhar as respostas
        var pai= $("#respostas")
        var botoes = pai.children()
        for(var i = 1 ; i < botoes.length; i++){
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)))
        }
    }else{
        //se a pergunta ja foi feita
        if(perguntasFeitas.length < qtdPerguntas+1){
            return gerarPergunta(maxPerguntas)
        }else{
            $('#quiz').addClass('oculto')
            $('#mensagem').html('Parabens Você Venceu! Acertou todas as perguntas!')
             $('#status').removeClass('oculto')
        }
    }
 }

 $('.resposta').click(function(){
    //percorrer todas resp e desmarcar  a classe selecionada
    resetaBotoes()
    //add classe selecionada
    $(this).addClass('selecionada')
 })
 $("#confirm").click(function(){
    //pegar o indice da pergunta
    var indice = $('#pergunta').attr('data-indice')

    //qual a resposta certa
    var respCerta =perguntas[indice].correta
    //qual foi a resposta que o usuario selecionou
    $('.resposta').each(function(){
        if($(this).hasClass('selecionada')){
            var respostaEscolhida = $(this).attr('id')

            if(respCerta == respostaEscolhida){
                proximaPergunta()
            }else{
                $('#'+respCerta).addClass('correta')
                $('#'+respostaEscolhida).removeClass('selecionada')
                $('#'+respostaEscolhida).addClass('errada')
                setTimeout(function(){
                    gameOver()
                },2000)
            }
        }
    })
 })
 function newGame(){
    perguntasFeitas = []
    resetaBotoes()
    gerarPergunta(qtdPerguntas)
    $('#quiz').removeClass('oculto')
    $('#status').addClass('oculto')
 }
 function proximaPergunta(){
    resetaBotoes()
    gerarPergunta(qtdPerguntas)
 }
 function resetaBotoes(){
 $('.resposta').each(function(){
    if($(this).hasClass('selecionada')){
        $(this).removeClass('selecionada')
    }
    if($(this).hasClass('correta')){
        $(this).removeClass('correta')
    }
    if($(this).hasClass('errada')){
        $(this).removeClass('errada')
    }
})
}

function gameOver(){
    $('#quiz').addClass('oculto')
    $('#mensagem').html('Game Over!')
    $('#status').removeClass('oculto')
}
$('#novoJogo').click(function(){
    newGame()

})

