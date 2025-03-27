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
        this.modificadores = [];
        this.aplicarModificadores();
    }

    aplicarModificadores() {

        this.raca.modificadores.forEach(mod => {
            this.modificadores.push({ atributo: mod.atributo, value: mod.value, origem: 'Raça' });
        });

        if (this.subraca?.modificadores.length) {
            this.subraca.modificadores.forEach(mod => {
                this.modificadores.push({ atributo: mod.atributo, value: mod.value, origem: 'Subraça' });
            });
        }
    }
    exibirModificadores() {
        return this.modificadores.map(mod =>
            `${mod.origem} - ${mod.atributo}: +${mod.value}`
        ).join(', ');
    }
}
export default Personagem;
