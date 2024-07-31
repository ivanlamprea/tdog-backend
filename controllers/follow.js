import Follow from "../models/follow.js"
import User from "../models/user.js"
import Dog from "../models/dog.js"
import { followUserIds } from "../services/followServices.js"


// Acciones de prueba
export const testFollow = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador: follow.js"
    });
}

// Método para guardar un follow (seguir a otro usuario)
export const saveFollow = async (req, res) => {
    try {
        // Obtener datos del body
        const following_dog = req.body.id;
        // Obtener el id del usuario autenticado (login) desde el token
        const identity = req.user;

        // Verificar si "identity" contiene la información del usuario autenticado
        if (!identity || !identity.userId) {
            return res.status(400).send({
                status: "error",
                message: "No se ha proporcionado el usuario para realizar el following"
            });
        }

        // Verificar si el usuario a seguir existe
        const followingDog = await Dog.findById(following_dog);
        if (!followingDog) {
            return res.status(404).send({
                status: "error",
                message: "El usuario que intentas seguir no existe"
            });
        }

        // Verificar si ya existe un seguimiento con los mismos usuarios
        const existingFollow = await Follow.findOne({
            following_dog: followingDog,
            followed_user: identity.userId
        });
        
        console.log(existingFollow);
        if (existingFollow) {
            return res.status(400).send({
                status: "error",
                message: "Ya estás siguiendo a este usuario."
            });
        }

        // Crear el objeto con modelo follow
        const newFollow = new Follow({
            following_dog: followingDog,
            followed_user: identity.userId
        });

        // Guardar objeto en la BD
        const followStored = await newFollow.save();

        // Verificar si se guardó correctamente en la BD
        if (!followStored) {
            return res.status(500).send({
                status: "error",
                message: "No se ha podido seguir al usuario."
            });
        }

        // Devolver respuesta
        return res.status(200).json({
            status: "success",
            followStored
        });

    } catch (error) {
        if (error.code === 11000) { // Error de índice único duplicado
            return res.status(400).json({
                status: "error",
                message: "Ya estás siguiendo a este usuario, error de indice."
            });
        }
        return res.status(500).send({
            status: "error",
            message: "Error al seguir al usuario.",
        });
    }
}


// Método para eliminar un follow (dejar de seguir)
export const unfollow = async (req, res) => {
    try {
        // Obtener el Id del usuario indentificado
        const userId = req.user.userId;

        // Obtener el Id del usuario que sigo y quiero dejar de seguir
        const followedId = req.params.id;

        // Búsqueda de las coincidencias de ambos usuarios y elimina
        const followDeleted = await Follow.findOneAndDelete({
            following_user: userId, // quien realiza el seguimiento
            followed_user: followedId // a quien se quiere dejar de seguir
        });

        // Verificar si se encontró el documento y lo eliminó
        if (!followDeleted) {
            return res.status(404).send({
                status: "error",
                message: "No se encontró el seguimiento a eliminar."
            });
        }

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Dejaste de seguir al usuario correctamente."
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al dejar de seguir al usuario."
        });
    }
}
// Método para listar usuarios que estoy siguiendo
export const following = async (req, res) => {
    try {
        // Obtener el ID del usuario identificado
        let userId = req.user && req.user.userId ? req.user.userId : undefined;

        // Comprobar si llega el ID por parámetro en la url (este tiene prioridad)
        if (req.params.id) userId = req.params.id;

        // Asignar el número de página
        let page = req.params.page ? parseInt(req.params.page, 10) : 1;

        // Número de usuarios que queremos mostrar por página
        let itemsPerPage = req.query.limit ? parseInt(req.query.limit, 10) : 5;

        // Configurar las opciones de la consulta
        const options = {
            page: page,
            limit: itemsPerPage,
            populate: {
                path: 'followed_user',
                select: '-password -role -__v -email'
            },
            lean: true
        }

        // Buscar en la BD los seguidores y popular los datos de los usuarios
        const follows = await Follow.paginate({ following_user: userId }, options);

        // Listar los seguidores de un usuario, obtener el array de IDs de los usuarios que sigo
        let followUsers = await followUserIds(req);

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que estoy siguiendo",
            follows: follows.docs,
            total: follows.totalDocs,
            pages: follows.totalPages,
            page: follows.page,
            limit: follows.limit,
            users_following: followUsers.following,
            user_follow_me: followUsers.followers
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al listar los usuarios que estás siguiendo."
        });
    }
}

// Método para listar los usuarios que me siguen
export const followers = async (req, res) => {
    try {
        // Obtener el ID del usuario identificado
        let userId = req.user && req.user.userId ? req.user.userId : undefined;

        // Comprobar si llega el ID por parámetro en la url (este tiene prioridad)
        if (req.params.id) userId = req.params.id;

        // Asignar el número de página
        let page = req.params.page ? parseInt(req.params.page, 10) : 1;

        // Número de usuarios que queremos mostrar por página
        let itemsPerPage = req.query.limit ? parseInt(req.query.limit, 10) : 5;

        // Configurar las opciones de la consulta
        const options = {
            page: page,
            limit: itemsPerPage,
            populate: {
                path: 'following_user',
                select: '-password -role -__v -email'
            },
            lean: true
        }

        // Buscar en la BD los seguidores y popular los datos de los usuarios
        const follows = await Follow.paginate({ followed_user: userId }, options);

        // Listar los seguidores de un usuario, obtener el array de IDs de los usuarios que sigo
        let followUsers = await followUserIds(req);

        // Devolver respuesta
        return res.status(200).send({
            status: "success",
            message: "Listado de usuarios que me siguen",
            follows: follows.docs,
            total: follows.totalDocs,
            pages: follows.totalPages,
            page: follows.page,
            limit: follows.limit,
            users_following: followUsers.following,
            user_follow_me: followUsers.followers
        });

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al listar los usuarios que me siguen."
        });
    }
}