import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const PictureSchema = new Schema({ image: String });

const DogSchema = Schema({
    user_id: {
        type: Schema.ObjectId,
        ref: "User",
        required: true
    },
    name: { type: String, required: true },
    age: { type: Number, required: false },
    breed: { type: String, required: true },
    size: { type: String, required: true },
    blood: { type: String, required: false },
    location_state: { type: String, required: false },
    location_city: { type: String, required: false }, 
    pictures: { type: [PictureSchema] },
    bio: { type: String },
    create_at: { type: Date, default: Date.now },
});

DogSchema.plugin(mongoosePaginate);

export default model('Dog', DogSchema, 'dogs')