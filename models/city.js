import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CitySchema = Schema({
    state_code: { type: String, required: true },
    state: { type: String, required: true },
    city_code: { type: String, required: true },
    city: { type: String, required: true },
});

CitySchema.plugin(mongoosePaginate);

export default model('City', CitySchema, 'cities')