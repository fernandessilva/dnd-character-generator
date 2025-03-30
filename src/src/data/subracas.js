import Subraca from "../models/SubRaca.js";

const subracas = {
    Anao: [
        new Subraca("Anão da Colina", { sabedoria: 1 }, ["Visão no Escuro", "Resistência Anã", "Treinamento Anão em Combate", "Treinamento Anão em Ferramentas", "Tenacidade Anã"]),
        new Subraca("Anão da Montanha", { força: 2 }, ["Visão no Escuro", "Resistência Anã", "Treinamento Anão em Combate", "Treinamento Anão em Ferramentas", "Treinamento Anão com Armaduras"])
    ],
    Elfo: [
        new Subraca("Elfo Alto", { inteligencia: 1 }, ["Visão no Escuro", "Sentidos Aguçados", "Treinamento Élfico", "Transe"]),
        new Subraca("Elfo da Floresta", { sabedoria: 1 }, ["Sentidos Aguçados", "Ancestral Feérico", "Máscara da Floresta"]),
        new Subraca("Elfo Negro (Drow)", { carisma: 1 }, ["Sensibilidade à Luz Solar", "Magia Drow"])
    ]
};
export default subracas;