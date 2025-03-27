// Vamos utilizar o metodo de rolagem de dados para distribuir os atributos de um personagem (Força, Destreza, Constituição, Inteligência, Sabedoria, Carisma). Esse método é conhecido como 4d6. Rolamos 4 dados de 6 lados e descartamos o dado de menor valor. Somamos os 3 dados restantes para obter o valor do atributo. Esse processo é repetido para cada atributo.
class GeradorAtributos {
    static rolarAtributos() {
        const atributos = {}
            ;[
                "forca",
                "destreza",
                "constituicao",
                "inteligencia",
                "sabedoria",
                "carisma",
            ].forEach((atributo) => {
                let rolagens = []
                //  rolagem de 4d6, descartando menor dado e somando os outros 3 maiores
                for (let i = 0; i < 4; i++) rolagens.push(Math.floor(Math.random() * 6) + 1)

                // ordena crescente as rolagens, remove o primeiro elemento e retorna a soma dos elementos restantes em rolagens
                rolagens.sort((a, b) => a - b)
                rolagens.shift()
                atributos[atributo] = rolagens.reduce((acc, cur) => acc + cur, 0)
            })
        return atributos
    }
}
export default GeradorAtributos;
