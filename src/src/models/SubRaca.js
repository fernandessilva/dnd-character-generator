/* 
Traços são características específicas de cada subraça, como habilidades especiais, proficiências, etc.
*/
class Subraca {
    constructor(nome, modificadores, tracos = []) {
        this.nome = nome;
        this.modificadores = modificadores;
        this.tracos = tracos;
    }
}
export default Subraca;
