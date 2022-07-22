$(document).ready(function () {
    $('#campotexto').focus(); // mantem o foco no input

    var texto = $('#texto').text().trim(); // texto inteiro

    var letrasSeparadas = texto.split(''); // separa todas as letras em um array

    /* Separado cada caracter uma tag span */
    var novoTexto = '';
    for (var i = 0; i < letrasSeparadas.length; i++) {
        if (i == 0) {
            novoTexto += '<span class="proxima">' + letrasSeparadas[i] + '</span>';
        } else {
            novoTexto += '<span class="normal">' + letrasSeparadas[i] + '</span>';
        }
    }
    $('#texto').html(novoTexto);

    /* Caso clique em qualquer área da página irá focar no input */
    $(document).on('click', function () {
        $('#campotexto').focus();
    });

    var ctPalavra = 0; // quantidade de palavras digitadas
    var ctLetras = 0; // quantidade de letras digitadas
    $('#campotexto').on('input', function (e) {

        var letraDigitada = $(this).val().split('');

        var letraCerta = $('.proxima').text();

        if (letraDigitada == letraCerta) {
            $('.proxima').addClass('certo')
            $('.proxima').removeClass('proxima')

            $('.normal:first').addClass('proxima') // adiciona a classe 'proxima' na próxima letra
            $('.proxima').removeClass('normal') // remove a classe 'normal' na próxima letra

            $('.certo').removeClass('errado') // remove a classe 'errado' em qualquer letra com classe 'certo'

            ctLetras++;
        } else {
            $('.proxima').addClass('errado') // adiciona a classe 'errado' na letra quando digitou errado
        }

        // quando é digitado espaço soma mais uma palavra
        if (e.originalEvent.data == ' ') {
            ctPalavra++;
        }

        /* Quando todas as letras forem digitadas certo vai para o resultado final */
        if (ctLetras >= letrasSeparadas.length) {
            $('.digitacao').hide(200)
            $('.resultado').show(200)

            /* Calcula a média de todos os tempos */
            let soma = 0;
            for (let i = 0; i < tempos.length; i++) {
                soma += tempos[i];
            }
            let ppmfinal = soma / tempos.length;
            $('#ppm-final').text(ppmfinal.toFixed(1))

        }

        $(this).val('')

    })

    /* Conta os segundos após começar a digitar */
    var segundos = 0;
    setInterval(function () {
        if (ctPalavra >= 1) {
            segundos += 0.1;
        }
    }, 100)

    /* Calcula a quantidade de palavras por minuto */
    var tempos = [];
    setInterval(function () {
        if (ctPalavra >= 1) {
            var ppm = (ctPalavra / segundos) * 60;
            tempos.push(ppm);
            $('#ppm').text(ppm.toFixed(1))
        }
    }, 1000);



    $('#recomecar').on('click', function () {
        $('.digitacao').show(200)
        $('.resultado').hide(200)
        ctLetras = 0;
        ctPalavra = 0;
        segundos = 0;
        tempos = [];

        $('#texto span').removeClass('certo errado').addClass('normal')
        $('.normal:first').addClass('proxima').removeClass('normal')
    })
});