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
