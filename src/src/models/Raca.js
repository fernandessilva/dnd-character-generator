/*
modificadores são os bônus de atributo que a raça dá ao personagem
subraças são variações de raças que dão bônus diferentes
*/
class Raca {
    constructor(nome, subraca = [], modificadores, lingua = []) {
        this.nome = nome;
        this.subraca = subraca;
        this.modificadores = modificadores;
        this.lingua = lingua

    }
}
export default Raca;