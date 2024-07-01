
document.addEventListener("DOMContentLoaded", function() {
    const generatePasswordBtn = document.getElementById("generatePassword");
    const copyPasswordBtn = document.getElementById("copyPassword");
    const numbersCheckbox = document.getElementById("numbersCheckbox");
    const lettersCheckbox = document.getElementById("lettersCheckbox");
    const specialCharsCheckbox = document.getElementById("specialCharsCheckbox");
    const passwordLengthRange = document.getElementById("passwordLength");
    const lengthValue = document.getElementById("lengthValue");
    const passwordStrengthProgress = document.getElementById("passwordStrength");
    const passwordInput = document.getElementById("password");
    const warningMessage = document.getElementById("warningMessage");
    const passwordHistoryContainer = document.getElementById("passwordHistory");
    const showHistoryBtn = document.getElementById("showHistory");

    passwordLengthRange.addEventListener("input", function() {
        lengthValue.textContent = passwordLengthRange.value;
    });

    //calcular a força da senha
    function calculatePasswordStrength(password) {
        let strength = 0;

        if (password.length >= 8) {
            strength += 30;
        }
        if (password.match(/[a-z]+/)) {
            strength += 30;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 30;
        }
        if (password.match(/[0-9]+/)) {
            strength += 30;
        }
        if (password.match(/[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/)) {
            strength += 30;
        }

        return Math.min(100, strength);
    }

    function updatePasswordStrength(password) {
        const strength = calculatePasswordStrength(password);
        passwordStrengthProgress.value = strength;
    }

    
    generatePasswordBtn.addEventListener("click", function() {
        const numbers = numbersCheckbox.checked;
        const letters = lettersCheckbox.checked;
        const specialChars = specialCharsCheckbox.checked;
        const length = passwordLengthRange.value;

        let type = "both";
        if (numbers && !letters) {
            type = "numbers";
        } else if (!numbers && letters) {
            type = "letters";
        } else if (numbers && letters) {
            type = "both";
        } else {
            // checkbox
            warningMessage.style.display = "block";
            passwordInput.value = "";
            passwordStrengthProgress.value = 0;
            return;
        }

        // Esconder a mensagem de aviso se pelo menos um checkbox estiver marcado se não tiver
        warningMessage.style.display = "none";

        let charset = "";
        if (type === "letters") {
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        } else if (type === "numbers") {
            charset = "0123456789";
        } else if (type === "both") {
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
        if (specialChars) {
            charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
        }

        const url = `/api/password?type=${type}&numbers=${numbers}&letters=${letters}&specialChars=${specialChars}&length=${length}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                passwordInput.value = data;
                updatePasswordStrength(data);
                addToHistory(data);
            })
            .catch(error => {
                console.error("Erro ao gerar senha:", error);
                passwordInput.value = "Erro ao gerar senha";
                passwordStrengthProgress.value = 0;
            });
    });

    // Evento ao clicar no botão "Copiar Senha estava bugado kskk"
    copyPasswordBtn.addEventListener("click", function() {
        passwordInput.select();
        passwordInput.setSelectionRange(0, 99999); // teste para dispositivos móveis 
        document.execCommand("copy");
        alert("Senha copiada para a área de transferência!");
    });

    //"Ver Log"
    showHistoryBtn.addEventListener("click", function() {
        passwordHistoryContainer.classList.toggle("show");
    });

    // Função para adicionar senha ao histórico
    function addToHistory(password) {
        const p = document.createElement("p");
        p.textContent = password;
        passwordHistoryContainer.appendChild(p);
    }
});
