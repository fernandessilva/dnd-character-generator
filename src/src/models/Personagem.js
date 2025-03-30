/* 
Raca é a raça do personagem.
Subraca é uma subraça do personagem por exemplo um anão da colina ou um anão da montanha. Algumas Raças nao tem subraças.
classe é a classe do personagem.
antecedente é o que diz respeito ao passado do personagem.
atributos são os valores dos atributos do personagem como força, destreza, etc.
equipamento é o equipamento inicial do personagem de acordo com a sua classe e antecedente.
O método aplicarModificadores é responsável pelos modificadres de cada raça, subraça e antecedente. Por exemplo, um anão da montanha tem +2 de constituição e +2 de força, enquanto um anão da colina tem +2 de constituição e +1 de sabedoria.
Os modificadores não sao somados aos valores dos atributos gerados aleatoriamente, mas são usados para serem exibidos e usados separadamente durante o jogo.
*/
import habilidades from "../data/habilidades.js";
class Personagem {
    constructor(raca, subraca, nome, classe, antecedente, alinhamento, atributos, equipamento) {
        this.raca = raca;
        this.subraca = subraca;
        this.nome = nome;
        this.classe = classe;
        this.antecedente = antecedente;
        this.alinhamento = alinhamento;
        this.atributos = atributos;
        this.equipamento = equipamento;
        this.habilidades = [];
        this.definirHabilidades();
    }
    // Adicione este método à classe Personagem em Personagem.js
    calcularModificador(valor) {
        return Math.floor((valor - 10) / 2);
    }

    exibirModificadores() {
        const mods = {};
        for (const [atributo, valor] of Object.entries(this.atributos)) {
            mods[atributo] = this.calcularModificador(valor);
        }
        return Object.entries(mods)
            .map(([atributo, valor]) => `${atributo.charAt(0).toUpperCase() + atributo.slice(1)}: ${valor >= 0 ? '+' + valor : valor}`)
            .join(', ');
    }

    exibirAtributos() {
        return Object.entries(this.atributos)
            .map(([atributo, valor]) => `${atributo.charAt(0).toUpperCase() + atributo.slice(1)}: ${valor}`)
            .join(', ');
    }

    definirHabilidades() {
        if (habilidades.racas[this.raca.nome]) {
            this.habilidades.push(...habilidades.racas[this.raca.nome]);
        }

        if (habilidades.classes[this.classe.nome]) {
            this.habilidades.push(...habilidades.classes[this.classe.nome]);
        }
    }
    exibirHabilidades() {
        return this.habilidades.join('\n');
    }
}
export default Personagem;
