/* A ideia é criar um personagem aleatório sorteando os seus valores toda vez que o botão de mostrar personagem for clicado.
 Como o personagem foi declarado dentro do evento de clique do botão, ele não pode ser acessado fora desse escopo e gerar o meu pdf. Para resolver isso, vamos declarar o personagem fora do evento de clique e atribuir o personagem gerado ao clicar no botão.
 Após o usuário gerar o seu personagem ele pode clicar em exportar o personagem para um PDF editável.
*/
import './style.css'
import Personagem from "./src/models/Personagem.js"
import GeradorNome from "./src/models/GeradorNome.js"
import GeradorAtributos from "./src/models/GeradorAtributos.js"
import racas from "./src/data/racas.js"
import classes from "./src/data/classes.js"
import antecedentes from "./src/data/antecedentes.js"
import equipamentos from "./src/data/equipamentos.js"
import alinhamentos from "./src/data/alinhamentos.js"
import { PDFDocument } from "pdf-lib"

document.querySelector('#app').innerHTML = `
  <div id="gerador">
    <h1>Gerador de Personagem D&D 5e</h1>
    <p>Este gerador cria um personagem aleatório para D&D 5e.</p>
    <button id="mostrarPersonagem">Gerar Personagem</button>
    <div id="personagemInfo"></div>
    <p>Após gerar o personagem, clique no botão "Baixar PDF" para baixar a ficha de personagem preenchida.</p>
    <button id="preencherPDF">Baixar PDF</button>
    </div>
    <div id="O que é D&D?">
        <h1>O que é D&D?</h1>
        <p>Dungeons & Dragons (D&D) é um jogo de RPG de mesa onde os jogadores criam personagens e embarcam em aventuras em um mundo de fantasia. O jogo é baseado em regras e dados, e é conhecido por sua narrativa colaborativa e liberdade criativa.</p>
        <p>Os jogadores assumem o papel de personagens, enquanto um jogador atua como o Dungeon Master (DM), que narra a história e controla os desafios que os jogadores enfrentam. O jogo é jogado em sessões, onde os jogadores interagem entre si e com o mundo ao seu redor, tomando decisões que afetam a narrativa.</p>
        <p>D&D é conhecido por sua rica lore, sistemas de combate e magia, e pela possibilidade de personalizar personagens com diferentes raças, classes e habilidades. O jogo tem uma base de fãs dedicada e é frequentemente jogado em grupos, tanto presencialmente quanto online.</p>
        <p>O jogo é jogado com dados, sendo o mais comum o dado de 20 lados (d20), que é usado para determinar o sucesso ou falha de ações dos personagens. Os jogadores também podem usar miniaturas e mapas para representar os personagens e o ambiente durante as sessões.</p>
        <p>D&D é um jogo que promove a criatividade, o trabalho em equipe e a resolução de problemas, e é uma experiência única e envolvente para os jogadores.</p>
    </div>
  <div id="sobre">
    <h1>Sobre</h1>
    <ol>
      <li>O gerador de personagens é uma ferramenta útil para jogadores que desejam criar personagens rapidamente e sem complicações.</li>
      <li>Ajudar o Dungeon Master a criar NPCs ou Personagens rápidos para os jogadores.</li>
      <li>Por que escolhi o método de rolagem de dados? Estatisticamente, rolar os dados para gerar atributos inciais lhe dá uma média de atributos mais altos.
      <ul>
      <li>Média geral de atributos para método de rolagem de dados: 73.47.</li>
      <li>Média geral de atributos para método matriz padrão: 72.</li>
      <li>Média geral de atributos para método de compra de pontos: 72.32.</li>
      </ul>
      </li>
    </ol>
  </div>
`;
// Função para gerar um personagem aleatório e preencher o PDF com os dados do personagem
document.addEventListener("DOMContentLoaded", () => {
  let MeuPersonagem
  document.getElementById("mostrarPersonagem").addEventListener("click", () => {
    const randomRaca = racas[Math.floor(Math.random() * racas.length)]
    const randomSubraca = randomRaca.subraca
      ? randomRaca.subraca[
      Math.floor(Math.random() * randomRaca.subraca.length)
      ]
      : null
    const randomNome = GeradorNome.gerarNome(randomRaca)
    const randomClasse = classes[Math.floor(Math.random() * classes.length)]
    const randomAntecedente =
      antecedentes.length > 0
        ? antecedentes[Math.floor(Math.random() * antecedentes.length)]
        : null
    const randomAlinhamento =
      alinhamentos[Math.floor(Math.random() * alinhamentos.length)]
    const randomatributos = GeradorAtributos.rolarAtributos()
    const classEquip = equipamentos.classes[randomClasse.nome] || []
    const antecedenteEquip = randomAntecedente
      ? equipamentos.antecedentes[randomAntecedente] || []
      : []
    const randomEquipamento = [...classEquip, ...antecedenteEquip]

    MeuPersonagem = new Personagem(
      randomRaca,
      randomSubraca,
      randomNome,
      randomClasse,
      randomAntecedente,
      randomAlinhamento,
      randomatributos,
      randomEquipamento,
    )

    const personagemInfo = `
    <div class="personagem-card">
      <h2>${MeuPersonagem.nome}</h2>
      <p><strong>Raça:</strong> ${MeuPersonagem.subraca ? `${MeuPersonagem.raca.nome} (${MeuPersonagem.subraca.nome})` : MeuPersonagem.raca.nome}</p>
      <p><strong>Classe:</strong> ${MeuPersonagem.classe.nome}</p>
      <p><strong>Antecedente:</strong> ${MeuPersonagem.antecedente || "Nenhum"}</p>
      <p><strong>Alinhamento:</strong> ${MeuPersonagem.alinhamento}</p>
      <p><strong>Atributos:</strong> ${MeuPersonagem.exibirAtributos()}</p>
      <p><strong>Modificadores:</strong> ${MeuPersonagem.exibirModificadores()}</p>
      <p><strong>Habilidades:</strong> ${MeuPersonagem.exibirHabilidades()}</p>
      <p><strong>Equipamentos:</strong> ${MeuPersonagem.equipamento.join(", ")}</p>
    </div>
  `;
    document.getElementById("personagemInfo").innerHTML = personagemInfo;
  })

  document
    .getElementById("preencherPDF")
    .addEventListener("click", async () => {
      if (!MeuPersonagem) {
        alert("Por favor, gere um personagem primeiro!")
        return
      }
      const pdfBytes = await preencherPDF(MeuPersonagem)

      const blob = new Blob([pdfBytes], { type: "application/pdf" })

      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = "personagem-preenchido.pdf"

      link.click()

      URL.revokeObjectURL(link.href)

      alert("PDF gerado com sucesso!")
    })
})

async function preencherPDF(MeuPersonagem) {
  const response = await fetch("/ficha-de-personagem.pdf")
  if (!response.ok) {
    throw new Error(`Erro ao carregar o PDF: ${response.statusText}`)
  }
  const pdfBytes = await response.arrayBuffer()
  const pdfDoc = await PDFDocument.load(pdfBytes)

  const form = pdfDoc.getForm()

  // Campos do formulário com os dados do personagem
  form.getTextField("CharacterName").setText(MeuPersonagem.nome)
  form.getTextField("Race ").setText(MeuPersonagem.subraca
    ? `${MeuPersonagem.raca.nome}(${MeuPersonagem.subraca.nome})`
    : MeuPersonagem.raca.nome
  )
  form.getTextField("ClassLevel").setText(`${MeuPersonagem.classe.nome} 1`)
  form.getTextField("Background").setText(MeuPersonagem.antecedente)
  form.getTextField("Alignment").setText(MeuPersonagem.alinhamento)

  const featuresField = form.getTextField("Features and Traits")
  featuresField.setText(MeuPersonagem.exibirHabilidades())
  featuresField.setFontSize(10)

  // Campos do formulário com os atributos e modificadores
  const atributos = MeuPersonagem.atributos
  form.getTextField("STR").setText(atributos.forca.toString())
  form.getTextField("DEX").setText(atributos.destreza.toString())
  form.getTextField("CON").setText(atributos.constituicao.toString())
  form.getTextField("INT").setText(atributos.inteligencia.toString())
  form.getTextField("WIS").setText(atributos.sabedoria.toString())
  form.getTextField("CHA").setText(atributos.carisma.toString())
  form.getTextField("STRmod").setText(MeuPersonagem.calcularModificador(atributos.forca) >= 0 ?
    `+${MeuPersonagem.calcularModificador(atributos.forca)}` :
    MeuPersonagem.calcularModificador(atributos.forca).toString());
  form.getTextField("DEXmod ").setText(MeuPersonagem.calcularModificador(atributos.destreza) >= 0 ?
    `+${MeuPersonagem.calcularModificador(atributos.destreza)}` :
    MeuPersonagem.calcularModificador(atributos.destreza).toString());
  form.getTextField("CONmod").setText(MeuPersonagem.calcularModificador(atributos.constituicao) >= 0 ?
    `+${MeuPersonagem.calcularModificador(atributos.constituicao)}` :
    MeuPersonagem.calcularModificador(atributos.constituicao).toString());
  form.getTextField("INTmod").setText(MeuPersonagem.calcularModificador(atributos.inteligencia) >= 0 ?
    `+${MeuPersonagem.calcularModificador(atributos.inteligencia)}` :
    MeuPersonagem.calcularModificador(atributos.inteligencia).toString());
  form.getTextField("WISmod").setText(MeuPersonagem.calcularModificador(atributos.sabedoria) >= 0 ?
    `+${MeuPersonagem.calcularModificador(atributos.sabedoria)}` :
    MeuPersonagem.calcularModificador(atributos.sabedoria).toString());
  form.getTextField("CHamod").setText(MeuPersonagem.calcularModificador(atributos.carisma) >= 0 ?
    `+${MeuPersonagem.calcularModificador(atributos.carisma)}` :
    MeuPersonagem.calcularModificador(atributos.carisma).toString());

  // Campos do formulário com os equipamentos
  const equipamentosField = form.getTextField("Equipment")
  equipamentosField.setText(MeuPersonagem.equipamento.join("\n"))
  equipamentosField.setFontSize(10)

  return await pdfDoc.save()
}


