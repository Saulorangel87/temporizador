const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('./sons/luna-rise-part-one.mp3')
const somStart = new Audio('./sons/play.wav')
const somPause = new Audio('./sons/pause.mp3')
const somFinish = new Audio('./sons/beep.mp3')
const tempoNaTela = document.querySelector('#timer')

const iconeBotao = document.querySelector('.app__card-primary-butto-icon')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

musica.loop = true
musica.volume = 0.09

musicaFocoInput.addEventListener('change', () => {
    if (musicaFocoInput.checked) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(botao => botao.classList.remove('active'))
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
            titulo.innerHTML = 'Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>'
            break;
        case 'descanso-curto':
            titulo.innerHTML = 'Qua tal da uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta.</strong>'
            break;
        case 'descanso-longo':
            titulo.innerHTML = 'Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>'
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar()

        somFinish.play()
        somFinish.volume = 0.09
        iconeBotao.setAttribute('src', './imagens/play_arrow.png')

        setTimeout(() => {
        alert('Tempo finalizado!')
        }, 50)
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar)


function iniciarOuPausar() {
    if (intervaloId) {
        somPause.play()
        somPause.volume = 0.09
        zerar()
        iconeBotao.setAttribute('src', './imagens/play_arrow.png')

        return  
    }

    somStart.play()
    somStart.volume = 0.09
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconeBotao.setAttribute('src', '/.imagens/pause.png')
    
}

function zerar() {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null
}

function mostrarTempo() {
   const tempo = new Date(tempoDecorridoEmSegundos * 1000);
   const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
   tempoNaTela.textContent = `${tempoFormatado}`;
}


mostrarTempo()