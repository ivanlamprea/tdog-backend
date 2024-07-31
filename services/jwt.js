import jwt from 'jwt-simple';
import moment from 'moment';

//Secret Key
const secret = 'F3aDFdf482v134vb_}4d5&2D5';

//Metodo para generar tokens

const createToken = (user) => {
    const payload = {
        userId: user._id,
        role: user.role,
        name: user.name,
        last_name: user.last_name,
        image: user.image,
        nick: user.nick,
        iat: moment.unix(),
        exp:moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
}

export {
    secret,
    createToken
 }