console.log("Script carregado")

let botao = document.querySelector(".botao-gerar")
let botaoCopiar = document.querySelector(".botao-copiar")

let chave = "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
let endereco = "https://api.groq.com/openai/v1/chat/completions"

async function gerarCodigo() {
    let textoUsuario = document.querySelector(".caixa-texto").value
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let resultadoCodigo = document.querySelector(".resultado-codigo")

    if (!textoUsuario) {
        blocoCodigo.textContent = "Digite uma descrição primeiro"
        return
    }

    blocoCodigo.classList.add("loading")
    blocoCodigo.textContent = "Gerando código..."

    try {
        let resposta = await fetch(endereco, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "Você é um gerador de código HTML e CSS. Responda somente com código puro. Não use markdown, não use crases e não dê explicações. Retorne primeiro o CSS dentro de <style> e depois o HTML."
                    },
                    {
                        role: "user",
                        content: textoUsuario
                    }
                ]
            })
        })

        let dados = await resposta.json()

        if (!dados.choices) {
            blocoCodigo.classList.remove("loading")
            blocoCodigo.textContent = "Erro na API. Verifique sua chave."
            console.log(dados)
            return
        }

        let resultado = dados.choices[0].message.content

        blocoCodigo.classList.remove("loading")
        blocoCodigo.textContent = resultado
        resultadoCodigo.srcdoc = resultado

    } catch (erro) {
        blocoCodigo.classList.remove("loading")
        blocoCodigo.textContent = "Erro ao gerar código"
        console.error(erro)
    }
}

function copiarCodigo() {
    let blocoCodigo = document.querySelector(".bloco-codigo")
    let codigo = blocoCodigo.textContent

    if (!codigo) return

    navigator.clipboard.writeText(codigo)

    botaoCopiar.textContent = "Copiado ✅"

    setTimeout(() => {
        botaoCopiar.textContent = "Copiar 📋"
    }, 2000)
}

botao.addEventListener("click", gerarCodigo)
botaoCopiar.addEventListener("click", copiarCodigo)
