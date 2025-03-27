// import Personagem from "./models/personagem.js"
// import GeradorNome from "./models/GeradorNome.js"
// import racas from "./data/racas.js"
// import classes from "./data/classes.js"
// import antecedentes from "./data/antecedentes.js"
// import equipamentos from "./data/equipamentos.js"
// import alinhamentos from "./data/alinhamentos.js"
// import { PDFDocument } from "pdf-lib"

// // Vamos utilizar o metodo de rolagem de dados para distribuir os atributos de um personagem (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma). Esse método é conhecido como 4d6. Rolamos 4 dados de 6 lados e descartamos o dado de menor valor. Somamos os 3 dados restantes para obter o valor do atributo. Esse processo é repetido para cada atributo.

// function rolarAtributos() {
//     const atributos = {}
//         ;[
//             "forca",
//             "destreza",
//             "constituicao",
//             "inteligencia",
//             "sabedoria",
//             "carisma",
//         ].forEach((atributo) => {
//             let rolagens = []
//             //  rolagem de 4d6, descartando menor dado e somando os outros 3 maiores
//             for (let i = 0; i < 4; i++) rolagens.push(Math.floor(Math.random() * 6) + 1)

//             // ordena crescente as rolagens, remove o primeiro elemento e retorna a soma dos elementos restantes em rolagens
//             rolagens.sort((a, b) => a - b)
//             rolagens.shift()
//             atributos[atributo] = rolagens.reduce((acc, cur) => acc + cur, 0)
//         })
//     return atributos
// }

// /* A ideia é criar um personagem aleatório sorteando os seus valores toda vez que o botão de mostrar personagem for clicado.
//  Como o personagem foi declarado dentro do evento de clique do botão, ele não pode ser acessado fora desse escopo e gerar o meu pdf. Para resolver isso, vamos declarar o personagem fora do evento de clique e atribuir o personagem gerado ao clicar no botão.
//  Após o usuário gerar o seu personagem ele pode clicar em exportar o personagem para um PDF editável.
// */

// document.addEventListener("DOMContentLoaded", () => {
//     let MeuPersonagem
//     document.getElementById("mostrarPersonagem").addEventListener("click", () => {
//         const randomRaca = racas[Math.floor(Math.random() * racas.length)]
//         const randomSubraca = randomRaca.subraca
//             ? randomRaca.subraca[
//             Math.floor(Math.random() * randomRaca.subraca.length)
//             ]
//             : null
//         const randomNome = GeradorNome.gerarNome(randomRaca)
//         const randomClasse = classes[Math.floor(Math.random() * classes.length)]
//         const randomAntecedente =
//             antecedentes.length > 0
//                 ? antecedentes[Math.floor(Math.random() * antecedentes.length)]
//                 : null
//         const randomAlinhamento =
//             alinhamentos[Math.floor(Math.random() * alinhamentos.length)]
//         const randomatributos = rolarAtributos()
//         const classEquip = equipamentos.classes[randomClasse.nome] || []
//         const antecedenteEquip = randomAntecedente
//             ? equipamentos.antecedentes[randomAntecedente] || []
//             : []
//         const randomEquipamento = [...classEquip, ...antecedenteEquip]

//         MeuPersonagem = new Personagem(
//             randomRaca,
//             randomSubraca,
//             randomNome,
//             randomClasse,
//             randomAntecedente,
//             randomAlinhamento,
//             randomatributos,
//             randomEquipamento,
//         )

//         const personagemInfo = `
//             <p><strong>Nome:</strong> ${MeuPersonagem.nome}</p>
//             <p><strong>Raça:</strong> ${MeuPersonagem.subraca ? `${MeuPersonagem.raca.nome} (${MeuPersonagem.subraca.nome})` : MeuPersonagem.raca.nome}</p>
//             <p><strong>Subraça:</strong> ${MeuPersonagem.subraca?.nome || "Nenhuma"
//             }</p>
//             <p><strong>Classe:</strong> ${MeuPersonagem.classe.nome}</p>
//             <p><strong>Antecedente:</strong> ${MeuPersonagem.antecedente || "Nenhum"
//             }</p>
//             <p><strong>Alinhamento:</strong> ${MeuPersonagem.alinhamento}</p>
//             <p><strong>Atributos:</strong> ${JSON.stringify(
//                 MeuPersonagem.atributos,
//             )}</p>
//             <p><strong>Equipamentos:</strong> ${MeuPersonagem.equipamento.join(
//                 ", ",
//             )}</p>
//             <p><strong>Modificadores:</strong> ${MeuPersonagem.exibirModificadores()}</p>
//         `
//         document.getElementById("personagemInfo").innerHTML = personagemInfo
//     })

//     document
//         .getElementById("preencherPDF")
//         .addEventListener("click", async () => {
//             const pdfBytes = await preencherPDF(MeuPersonagem)

//             const blob = new Blob([pdfBytes], { type: "application/pdf" })

//             const link = document.createElement("a")
//             link.href = URL.createObjectURL(blob)
//             link.download = "personagem-preenchido.pdf"

//             link.click()

//             URL.revokeObjectURL(link.href)
//         })
// })
// async function preencherPDF(MeuPersonagem) {
//     const response = await fetch("/ficha-de-personagem.pdf")
//     if (!response.ok) {
//         throw new Error(`Erro ao carregar o PDF: ${response.statusText}`)
//     }
//     const pdfBytes = await response.arrayBuffer()
//     const pdfDoc = await PDFDocument.load(pdfBytes)

//     const form = pdfDoc.getForm()

//     // Campos do formulário com os dados do personagem
//     form.getTextField("CharacterName").setText(MeuPersonagem.nome)
//     form.getTextField("Race ").setText(MeuPersonagem.subraca
//             ? `${MeuPersonagem.raca.nome} (${MeuPersonagem.subraca.nome})`
//             : MeuPersonagem.raca.nome
//     );
//     form.getTextField("ClassLevel").setText(MeuPersonagem.classe.nome)
//     form.getTextField("Background").setText(MeuPersonagem.antecedente || "Nenhum")
//     form.getTextField("Alignment").setText(MeuPersonagem.alinhamento)

//     // Campos do formulário com os atributos
//     const atributos = MeuPersonagem.atributos;
//     form.getTextField("STR").setText(atributos.forca.toString());
//     form.getTextField("DEX").setText(atributos.destreza.toString());
//     form.getTextField("CON").setText(atributos.constituicao.toString());
//     form.getTextField("INT").setText(atributos.inteligencia.toString());
//     form.getTextField("WIS").setText(atributos.sabedoria.toString());
//     form.getTextField("CHA").setText(atributos.carisma.toString());
    
//     return await pdfDoc.save()
// }
