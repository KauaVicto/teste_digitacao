$(document).ready(function () {
    $('#campotexto').focus(); // mantem o foco no input

    var texto = $('#texto').text().trim(); // texto inteiro
    var letrasSeparadas = TrocarTexto(texto);

    /* Texto próprio */

    $('#inserir-texto-proprio').on('click', function (e) {

        $('.texto-proprio').show('200');
        $('.jogo-home').hide('200');
        $(this).hide('200');

    })


    $('#env-texto-usuario').on('click', function (e) {
        texto = $('#textarea-texto-proprio').val();
        if (texto.length < 20) {
            alert('É necessário um texto com mais que 20 caracteres. Falta ' + (20 - texto.length));
        } else {
            letrasSeparadas = TrocarTexto(texto);

            $('.texto-proprio').hide('200');
            $('.jogo-home').show('200');
            $('#inserir-texto-proprio').show('200');

            $('#textarea-texto-proprio').val('')
        }
    });
    $('#cancelar-texto-usuario').on('click', function (e) {
        $('.texto-proprio').hide('200');
        $('.jogo-home').show('200');
        $('#inserir-texto-proprio').show('200');
    });


    /* Caso clique em qualquer área da página irá focar no input */
    $('body').on('click', function (e) {
        if (e.target.id != 'textarea-texto-proprio') {
            $('#campotexto').focus();
        }
    });

    var ctPalavras = 0; // quantidade de palavras digitadas
    var ctLetras = 0; // quantidade de letras digitadas
    var ctAcertos = 0; // quantidade de acertos
    var ctErros = 0; // quantidade de erros cometidos
    $('#campotexto').on('input', function (e) {
        var letraDigitada = $(this).val();

        var letraCerta = $('.proxima').text();

        if (letraDigitada == letraCerta) {
            $('.proxima').addClass('certo');
            $('.proxima').removeClass('proxima');

            $('.normal:first').addClass('proxima'); // adiciona a classe 'proxima' na próxima letra
            $('.proxima').removeClass('normal'); // remove a classe 'normal' na próxima letra

            $('.certo').removeClass('errado');
            ctAcertos++;
        } else {
            $('.proxima').addClass('errado');
            ctErros++;
        }
        ctLetras++;

        // quando é digitado espaço soma mais uma palavra
        if (e.originalEvent.data == ' ') {
            ctPalavras++;
        }

        /* Quando todas as letras forem digitadas certo vai para o resultado final */
        if (ctAcertos >= letrasSeparadas.length) {
            $('.digitacao').hide(200);
            $('.resultado').show(200);

            /* Calcula a média de todos os tempos das letras */
            let soma = 0;
            for (let i = 0; i < temposLetra.length; i++) {
                soma += temposLetra[i];
            }
            let lpmfinal = soma / temposLetra.length;
            lpmfinal = (!isNaN(lpmfinal)) ? lpmfinal : 0;

            $('#lpm-final').text(lpmfinal.toFixed(1));

            /* Calcula a média de todos os tempos das palavras */
            soma = 0;
            for (let i = 0; i < temposPalavra.length; i++) {
                soma += temposPalavra[i];
            }
            let ppmfinal = soma / temposPalavra.length;

            ppmfinal = (!isNaN(ppmfinal)) ? ppmfinal : 0;
            $('#ppm-final').text(ppmfinal.toFixed(1));


            /* Calcula o percentual de acertos */
            let percentAcertos = (ctAcertos * 100) / ctLetras;
            $('#percent-acertos').text(percentAcertos.toFixed(1) + '%')

        }

        $(this).val('')

    })

    /* Conta os segundos após começar a digitar */
    var segundos = 0;
    setInterval(function () {
        if (ctLetras >= 1) {
            segundos += 0.1;
        }
    }, 100)


    /* Calcula a quantidade de letras por minuto */
    var temposLetra = [];
    /* Calcula a quantidade de palavras por minuto */
    var temposPalavra = [];
    setInterval(function () {
        /* letras por minuto */
        if (ctLetras >= 1) {
            var lpm = (ctLetras / segundos) * 60;
            temposLetra.push(lpm);
            $('#lpm').text(lpm.toFixed(1))
        }

        /* palavras por minuto */
        if (ctPalavras >= 1) {
            var ppm = (ctPalavras / segundos) * 60;
            temposPalavra.push(ppm);
            $('#ppm').text(ppm.toFixed(1))
        }
    }, 1000);


    $('#recomecar').on('click', function () {
        reiniciar();
    })



    function reiniciar() {
        $('.digitacao').show(200)
        $('.resultado').hide(200)
        $('#ppm').text(0.0)
        $('#lpm').text(0.0)
        ctLetras = 0;
        ctPalavras = 0;
        segundos = 0;
        ctErros = 0;
        ctAcertos = 0;
        temposLetra = [];
        temposPalavra = [];

        $('#texto span').removeClass('certo errado').addClass('normal')
        $('.normal:first').addClass('proxima').removeClass('normal')
    }

    function TrocarTexto(texto) {
        var letrasSeparadas = texto.split(''); // separa todas as letras em um array

        /* Separa cada caracter uma tag span */
        var novoTexto = '';
        for (var i = 0; i < letrasSeparadas.length; i++) {
            if (i == 0) {
                novoTexto += '<span class="proxima">' + letrasSeparadas[i] + '</span>';
            } else {
                novoTexto += '<span class="normal">' + letrasSeparadas[i] + '</span>';
            }
        }
        $('#texto').html(novoTexto);

        reiniciar();

        return letrasSeparadas;
    }
});



