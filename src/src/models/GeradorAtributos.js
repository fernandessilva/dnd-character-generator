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
                for (let i = 0; i < 4; i++) rolagens.push(Math.floor(Math.random() * 6) + 1)
                rolagens.sort((a, b) => a - b)
                rolagens.shift()
                atributos[atributo] = rolagens.reduce((acc, cur) => acc + cur, 0)
            })
        return atributos
    }
}
export default GeradorAtributos;
