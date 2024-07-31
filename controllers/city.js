import City from "../models/city.js"

export const listCity = async (req, res) => {
    try {
        const cities = await City.find({});

        return res.status(200).send({
            status: "success",
            message: "Lista de ciudades",
            cities
        })
    }
    catch (error) {
        console.log("Error al listar ciudades", error);
        return res.status(500).send({
            status: "error",
            message: "Error al listar ciudades"
        });
    }
}