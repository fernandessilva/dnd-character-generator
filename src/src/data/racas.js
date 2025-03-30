import Raca from "../models/Raca.js";
import subracas from "./subracas.js";

const racas = [
    new Raca("Anao",
        subracas.Anao,
        [
            { atributo: "forca", value: 2 },
            { atributo: "constituicao", value: 2 }
        ],
        ["Comum", "Anao"]),
    new Raca("Elfo",
        subracas.Elfo,
        [
            { atributo: "destreza", value: 2 },
            { atributo: "inteligencia", value: 1 }
        ],
        ["Comum", "Elfo"]),
    new Raca("Halfling",
        null,
        [
            { atributo: "destreza", value: 2 },
            { atributo: "carisma", value: 1 }
        ],
        ["Comum", "Halfling"]),
    new Raca("Humano",
        null,
        [
            { atributo: "forca", value: 1 },
            { atributo: "destreza", value: 1 },
            { atributo: "constituicao", value: 1 },
            { atributo: "inteligencia", value: 1 },
            { atributo: "sabedoria", value: 1 },
            { atributo: "carisma", value: 1 }
        ],
        ["Comum", "Humano"]),
    new Raca("Draconato",
        null,
        [
            { atributo: "forca", value: 2 },
            { atributo: "carisma", value: 1 }
        ],
        ["Comum", "Draconico"]),
    new Raca("Gnomo",
        null,
        [
            { atributo: "inteligencia", value: 2 },
            { atributo: "destreza", value: 1 }
        ],
        ["Comum", "Gnomico"]),
    new Raca("MeioElfo",
        null,
        [
            { atributo: "carisma", value: 2 },
            { atributo: "inteligencia", value: 1 }
        ],
        ["Comum", "Elfo", "Humano"]),
    new Raca("MeioOrc",
        null,
        [
            { atributo: "forca", value: 2 },
            { atributo: "constituicao", value: 1 }
        ],
        ["Comum", "Orc"]),
    new Raca("Tiefling",
        null,
        [
            { atributo: "carisma", value: 2 },
            { atributo: "inteligencia", value: 1 }
        ],
        ["Comum", "Infernal"])
];
export default racas;