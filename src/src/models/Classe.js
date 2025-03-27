/* 
hitDie é o dado de vida da classe.
atributoBonus é o atributo bonus que o personagem recebe de sua classe.
*/
class Classe {
    constructor(nome, hitDie, atributoBonus) {
        this.nome = nome;
        this.hitDie = hitDie;
        this.atributoBonus = atributoBonus;
    }
}
export default Classe;
