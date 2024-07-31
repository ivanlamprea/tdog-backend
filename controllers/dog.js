import Dog from "../models/dog.js"
import Follow from "../models/follow.js"
import fs from "fs";
import path from "path";

// Acciones de prueba
export const testDog = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador: dog.js"
    });
}

export const getDogById = async (req, res) => {
    try{
        const dogId = req.params.id;
        const dogInfo = await Dog.findById(dogId);

        if (!dogInfo) {
            return res.status(404).send({
                status: "error",
                message: "No existe la mascota"
            });
        }

        return res.status(200).send({
            status: "success",
            message: "¡Trajistea tu mascota!",
            dogInfo
        });
    }
    catch (error) {
        console.log("Error al traer la mascota:", error);
        return res.status(500).send({
            status: "error",
            message: "Error al traer la mascota"
        });
    }
}

export const dogByFilter = async (req, res) => {
    try {
        // Devolver respuesta exitosa
        const userId = req.user.userId;
        const followedDogs = await Follow.find({ followed_user: userId }).select('-_id following_dog');
        const followedDogsArray = followedDogs.map(_dog => { return _dog.following_dog._id });
      
        const dogs = await Dog.find({_id: { $nin: followedDogsArray},  user_id: { $ne: userId } }).select('-user_id -create_at -__v');

        return res.status(200).send({
            status: "success",
            message: "Listado de mascotas",
            dogs
        });
    }
    catch (error) {
        console.log("Error al crear la mascota:", error);
        return res.status(500).send({
            status: "error",
            message: "Error al crear la mascota"
        });
    }
} 

export const listDogByUser = async (req, res) => {
    try {
        // Devolver respuesta exitosa
        const userId = req.user.userId;

        const dogs = await Dog.find({ user_id: userId }).select('-user_id -create_at -__v');

        return res.status(200).send({
            status: "success",
            message: "Lista de tus mascotas",
            dogs
        });
    }
    catch (error) {
        console.log("Error al crear la mascota:", error);
        return res.status(500).send({
            status: "error",
            message: "Error al crear la mascota"
        });
    }
}

export const createDog = async (req, res) => {
    try{
        const params = req.body;

        if (!params.name || !params.age || !params.breed || !params.size ) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        let newDog = new Dog(params);
        newDog.user_id = req.user.userId;
        const dogStored = await newDog.save();

        if(!dogStored) {
            return res.status(500).send({
                status: "error",
                message: "No se ha guardado tu mascota"
            });
        }

        // Devolver respuesta exitosa

        return res.status(200).send({
            status: "success",
            message: "¡Tu mascota ha sido registrada!",
            dogStored
        });
    }
    catch(error) {
        console.log("Error al crear la mascota:", error);
        return res.status(500).send({
            status: "error",
            message: "Error al crear la mascota"
        });
    }
}

// Método para mostrar las fotos de la mascota
export const photo = async (req, res) => {
    try {
        // Obtener el parámetro de la url
        const file = req.params.file;

        // Obtener el path real de la imagen
        const filePath = "./uploads/dogs/" + file;

        // Comprobamos si existe
        fs.stat(filePath, (error, exists) => {
            if (!exists) {
                return res.status(404).send({
                    status: "error",
                    message: "No existe la imagen"
                });
            }
            // Devolver el archivo
            return res.sendFile(path.resolve(filePath));
        });

    } catch (error) {
        console.log("Error al mostrar la imagen", error);
        return res.status(500).send({
            status: "error",
            message: "Error al mostrar la imagen"
        });
    }
}

// Método para subir imágenes (DOG) y Actualizar la imagen de perfil
export const uploadPictures = async (req, res) => {
    try {
        // Obtener el id de la mascota
        const dogId = req.params.id;

        // Verificar si la publicación existe en la base de datos antes de subir el archivo
        const dog = await Dog.findById(dogId);
        if (!dog) {
            return res.status(404).send({
                status: "error",
                message: "No existe la mascota"
            });
        }

        // Comprobamos que existe el archivo en el body
        if (!req.files) {
            return res.status(404).send({
                status: "error",
                message: "La petición no incluye la imagen"
            });
        }

        // Carga de multiples archivos 
        req.files.forEach(async (_file) => {
             // Obtener el nombre del archivo
            let image = _file.originalname;

            // Obtener la extensión del archivo
            const imageSplit = image.split(".");
            const extension = imageSplit[imageSplit.length - 1];

            // Validar la extensión
            if (!["png", "jpg", "jpeg", "gif"].includes(extension.toLowerCase())) {
                //Borrar archivo subido
                const invalidFilePath = _file.path;
                fs.unlinkSync(invalidFilePath);

                return res.status(400).send({
                    status: "error",
                    message: "Extensión del archivo es inválida."
                });
            }

            // Comprobar tamaño del archivo (pj: máximo 1MB)
            const fileSize = _file.size;
            const maxFileSize = 1 * 1024 * 1024; // 1 MB

            if (fileSize > maxFileSize) {
                const largeFilePath = _file.path;
                fs.unlinkSync(largeFilePath);

                return res.status(400).send({
                    status: "error",
                    message: "El tamaño del archivo excede el límite (máx 1 MB)"
                });
            }
            
            // Verificar si el archivo realmente existe antes de proceder
            const currentFilePath = path.resolve("./uploads/dogs/", _file.filename);
            try {
                fs.statSync(currentFilePath);
            } catch (error) {
                return res.status(404).send({
                    status: "error",
                    message: "El archivo no existe o hubo un error al verificarlo"
                });
            }

            
            // Si todo es correcto, se procede a guardar en la BD
            await dog.pictures.push({ image: _file.filename });
        });
        dog.save();
        // Devolver respuesta exitosa
        return res.status(200).send({
            status: "success",
            message: "Archivos subido con éxito",
            dog: dog
        });
       

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al subir el archivo a la publicación"
        });
    }
}

// Método para eliminar un follow (dejar de seguir)
export const deleteDog = async (req, res) => {
    try {
        const userId = req.user.userId;
        const dogId = req.params.id;
        const dogDeleted = await Dog.findOneAndDelete({
            _id: dogId,
            user_id: userId
        });
        
        // Verificar si se encontró el documento y lo eliminó
        if (!dogDeleted) {
            return res.status(404).send({
                status: "error",
                message: "No se encontró la mascota a eliminar."
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Eliminaste la mascota correctamente."
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al eliminar la mascota."
        });
    }
}