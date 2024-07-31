import Breed from "../models/breed.js"

export const listBreed = async (req, res) => {
    try {
        const breeds = await Breed.find({});

        return res.status(200).send({
            status: "success",
            message: "Lista de razas",
            breeds
        })
    }
    catch (error) {
        console.log("Error al listar razas", error);
        return res.status(500).send({
            status: "error",
            message: "Error al listar razas"
        });
    }
}