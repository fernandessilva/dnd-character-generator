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
