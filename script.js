function mostrarCampos() {
    const numCampos = document.getElementById('num-campos').value;
    const fieldsHome = document.getElementById('fields-home');
    const fieldsAway = document.getElementById('fields-away');

    // Limpar os campos existentes
    fieldsHome.innerHTML = '';
    fieldsAway.innerHTML = '';

    // Criar os campos com base na seleção
    for (let i = 1; i <= numCampos; i++) {
        fieldsHome.innerHTML += `
            <div class="field-container">
                <label class="team-name">Total de escanteios na partida ${i}?</label>
                <input type="number" id="escanteio${i}" placeholder="Total de escanteios?" required>
            </div>
        `;
        fieldsAway.innerHTML += `
            <div class="field-container">
                <label class="team-name">Total de escanteios na partida ${i}?</label>
                <input type="number" id="escanteio${i + 10}" placeholder="Total de escanteios?" required>
            </div>
        `;
    }

    // Mostrar resultados após a seleção de uma partida
    if (numCampos >= 1) {
        document.getElementById('resultados').style.display = 'none'; // Esconde resultados na seleção
    }

    // Limitar a altura do campo e habilitar rolagem se necessário
    document.querySelector('.fields-container').style.overflowY = 'auto';
}

function calcular() {
    const escanteios = [];
    const numCampos = document.getElementById('num-campos').value;

    // Verifica se o dropdown está vazio
    if (!numCampos) {
        alert("Por favor, selecione o número de partidas.");
        return;
    }

    // Ler os valores dos escanteios com base no número de campos
    for (let i = 1; i <= numCampos * 2; i++) { // * 2 para incluir ambos os times
        const valorEscanteio = parseInt(document.getElementById('escanteio' + i)?.value || 0, 10);
        escanteios.push(valorEscanteio);
    }

    const total = escanteios.length;

    // Inicializando contadores
    let acima45 = 0, acima55 = 0, acima65 = 0, acima75 = 0, acima85 = 0, acima95 = 0;
    let acima105 = 0, acima115 = 0, acima125 = 0, acima135 = 0;
    let abaixo10 = 0, abaixo12 = 0, abaixo13 = 0, abaixo14 = 0, abaixo15 = 0;

    // Contar as condições
    escanteios.forEach(escanteio => {
        if (escanteio > 4.5) acima45++;
        if (escanteio > 5.5) acima55++;
        if (escanteio > 6.5) acima65++;
        if (escanteio > 7.5) acima75++;
        if (escanteio > 8.5) acima85++;
        if (escanteio > 9.5) acima95++;
        if (escanteio > 10.5) acima105++;
        if (escanteio > 11.5) acima115++;
        if (escanteio > 12.5) acima125++;
        if (escanteio > 13.5) acima135++;
        if (escanteio < 10) abaixo10++;
        if (escanteio < 12) abaixo12++;
        if (escanteio < 13) abaixo13++;
        if (escanteio < 14) abaixo14++;
        if (escanteio < 15) abaixo15++;
    });

    // Calcular o número de entradas válidas
    const entradasValidas = escanteios.filter(valor => valor > 0).length;

    // Se não houver entradas válidas, zerar os resultados abaixo
    if (entradasValidas === 0) {
        abaixo10 = abaixo12 = abaixo13 = abaixo14 = abaixo15 = 0;
    }

    // Mostrar a barra de progresso
    const progressContainer = document.querySelector('.progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const calcularBtn = document.querySelector('.calcular-btn');
    const teamContainer = document.getElementById('team-container');

    // Ocultar o container da equipe
    teamContainer.style.display = 'none'; 

    // Ocultar o título e o conteúdo dos resultados
    const resultados = document.getElementById('resultados');
    resultados.style.display = 'none';

    // Ocultar todos os elementos do corpo, exceto a barra de progresso
    document.querySelectorAll('body > div').forEach(element => {
        if (!element.classList.contains('progress-container')) {
            element.style.display = 'none'; 
        }
    });

    calcularBtn.style.display = 'none';
    progressContainer.style.display = 'block'; 
    progressBar.style.width = '0%'; 
    progressText.innerText = '0%'; 

    let progress = 0;

    const interval = setInterval(() => {
        if (progress < 100) {
            progress++;
            progressBar.style.width = progress + '%'; 
            progressText.innerText = progress + '%'; 
        } else {
            clearInterval(interval);
            progressContainer.style.display = 'none';

            // Se não houver entradas válidas, exibir 0% para todos
            const percentageValues = entradasValidas === 0 ? 0 : total;

            document.getElementById('acima45').innerText = `👆 Acima de 4.5 escanteios: ${entradasValidas ? (acima45 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima55').innerText = `👆 Acima de 5.5 escanteios: ${entradasValidas ? (acima55 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima65').innerText = `👆 Acima de 6.5 escanteios: ${entradasValidas ? (acima65 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima75').innerText = `👆 Acima de 7.5 escanteios: ${entradasValidas ? (acima75 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima85').innerText = `👆 Acima de 8.5 escanteios: ${entradasValidas ? (acima85 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima95').innerText = `👆 Acima de 9.5 escanteios: ${entradasValidas ? (acima95 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima105').innerText = `👆 Acima de 10.5 escanteios: ${entradasValidas ? (acima105 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima115').innerText = `👆 Acima de 11.5 escanteios: ${entradasValidas ? (acima115 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima125').innerText = `👆 Acima de 12.5 escanteios: ${entradasValidas ? (acima125 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('acima135').innerText = `👆 Acima de 13.5 escanteios: ${entradasValidas ? (acima135 / total * 100).toFixed(2) : 0}% 👆`;
            document.getElementById('abaixo10').innerText = `👇 Abaixo de 10 escanteios: ${entradasValidas ? (abaixo10 / total * 100).toFixed(2) : 0}% 👇`;
            document.getElementById('abaixo12').innerText = `👇 Abaixo de 12 escanteios: ${entradasValidas ? (abaixo12 / total * 100).toFixed(2) : 0}% 👇`;
            document.getElementById('abaixo13').innerText = `👇 Abaixo de 13 escanteios: ${entradasValidas ? (abaixo13 / total * 100).toFixed(2) : 0}% 👇`;
            document.getElementById('abaixo14').innerText = `👇 Abaixo de 14 escanteios: ${entradasValidas ? (abaixo14 / total * 100).toFixed(2) : 0}% 👇`;
            document.getElementById('abaixo15').innerText = `👇 Abaixo de 15 escanteios: ${entradasValidas ? (abaixo15 / total * 100).toFixed(2) : 0}% 👇`;

            // Mostrar os resultados novamente
            document.querySelectorAll('body > div').forEach(element => {
                if (!element.classList.contains('result-container')) {
                    element.style.display = 'none'; 
                }
            });
            resultados.style.display = 'block'; 

            // Exibir o botão de voltar
            const voltarBtn = document.querySelector('.voltar-btn');
            voltarBtn.style.display = 'block';
        }
    }, 50);
}

function voltar() {
    // Recarrega a página
    location.reload(); 
}