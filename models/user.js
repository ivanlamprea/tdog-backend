import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = Schema ({
    name: { type: String, required: true },
    last_name: { type: String, required: true },
    nick: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    password: { type: String, required: true },
    role: { type: String, default: 'role_user' },
    image: { type: String, default: 'user-default.png' },
    create_at: { type: Date, default: Date.now },
});

UserSchema.plugin(mongoosePaginate);

export default model('User', UserSchema, 'users')