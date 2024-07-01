// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir os arquivos estáticos (HTML, CSS, JS)
app.use(express.static('public'));

// Função para gerar senha aleatória com base nos parâmetros fornecidos
const generatePassword = (length, options) => {
    let charset = "";
    
    if (options.numbers) {
        charset += "0123456789";
    }
    if (options.letters) {
        charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (options.specialChars) {
        charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    }
    
    let password = "";
    for (let i = 0; i < length; ++i) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

// Rota para gerar uma senha aleatória com opções avançadas
app.get('/api/password', (req, res) => {
    const length = req.query.length || 12; // Comprimento padrão da senha é 12 caracteres
    const options = {
        numbers: req.query.numbers === 'true',
        letters: req.query.letters === 'true',
        specialChars: req.query.specialChars === 'true'
    };
    
    // Validar e ajustar as opções de senha com base nas preferências do usuário
    if (!options.numbers && !options.letters && !options.specialChars) {
        options.numbers = true; // Se nenhum tipo específico for selecionado, gerar com números por padrão
        options.letters = true;
    }

    const password = generatePassword(length, options);
    res.send(password);
});

// Rota para a raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao gerador de senhas!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
