import { connect } from 'mongoose';

const connection = async() => {
    try {
        await connect("mongodb://127.0.0.1:27017/socialnetwork", {
            "authSource": "admin",
            "user": "root",
            "pass": "example"
        });
        console.log("Success connection");
    }
    catch(error) {
        console.log(error);
        throw new error ("¡No se ha conectado a la base de datos");
    }
}

export default connection;