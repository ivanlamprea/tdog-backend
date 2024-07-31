import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const BreedSchema = Schema({
    name: { type: String, required: true },
    size: { type: String, required: true }
});

BreedSchema.plugin(mongoosePaginate);

export default model('Breed', BreedSchema, 'breeds')