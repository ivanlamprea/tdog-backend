import connection from '../database/connection.js';
import Breed from '../models/breed.js'

console.log("Start Connection");
connection();

const breeds = [
    { name: 'Pincher', size: 'XS' },
    { name: 'Labrador Retriever', size: 'LG'},
    { name: 'Golden Retriever', size: 'LG'},
    { name: 'Pastor Alemán', size: 'LG'},
    { name: 'Beagle', size: 'MD'},
    { name: 'Bulldog Francés', size: 'SM'},
    { name: 'Bulldog Inglés', size: 'MD'},
    { name: 'Poodle (Caniche)', size: 'SM'},
    { name: 'Chihuahua', size: 'SM'},
    { name: 'Dachshund (Teckel)', size: 'SM'},
    { name: 'Pug', size: 'SM'},
    { name: 'Yorkshire Terrier', size: 'SM'},
    { name: 'Boxer', size: 'LG'},
    { name: 'Rottweiler', size: 'LG'},
    { name: 'Dálmata', size: 'LG'},
    { name: 'Shih Tzu', size: 'SM'},
    { name: 'Doberman', size: 'LG'},
    { name: 'Border Collie', size: 'MD'},
    { name: 'Husky Siberiano', size: 'MD'},
    { name: 'Schnauzer', size: 'MD'},
    { name: 'Cocker Spaniel', size: 'MD'},
    { name: 'Boston Terrier', size: 'SM'},
    { name: 'Pembroke Welsh Corgi', size: 'MD'},
    { name: 'Australian Shepherd (Pastor Australiano)', size: 'MD'},
    { name: 'Maltés', size: 'SM'},
    { name: 'Bichón Frisé', size: 'SM'},
    { name: 'Staffordshire Bull Terrier', size: 'MD'},
    { name: 'Weimaraner', size: 'LG'},
    { name: 'Akita Inu', size: 'LG'},
    { name: 'Pomerania', size: 'SM'},
    { name: 'Saint Bernard (San Bernardo)', size: 'XL'},
    { name: 'Basset Hound', size: 'MD'},
    { name: 'Vizsla', size: 'LG'},
    { name: 'Cavalier King Charles Spaniel', size: 'SM'},
    { name: 'Shiba Inu', size: 'SM'},
    { name: 'Alaskan Malamute', size: 'LG'},
    { name: 'Airedale Terrier', size: 'MD'},
    { name: 'Basenji', size: 'SM a MD'},
    { name: 'Great Dane (Gran Danés)', size: 'XL'},
    { name: 'Greyhound (Galgo)', size: 'LG'},
    { name: 'Irish Setter (Setter Irlandés)', size: 'LG'},
    { name: 'Newfoundland (Terranova)', size: 'XL'},
    { name: 'Lhasa Apso', size: 'SM'},
    { name: 'Samoyed', size: 'LG'},
    { name: 'Bernese Mountain Dog (Boyero de Berna)', size: 'LG'},
    { name: 'Whippet', size: 'MD'},
    { name: 'Collie', size: 'LG'},
    { name: 'Cane Corso', size: 'LG'},
    { name: 'Italian Greyhound (Galgo Italiano)', size: 'SM'},
    { name: 'Bull Terrier', size: 'MD'},
    { name: 'Rhodesian Ridgeback', size: 'LG'},
    { name: 'Scottish Terrier', size: 'SM'},
    { name: 'Jack Russell Terrier', size: 'SM'},
    { name: 'West Highland White Terrier', size: 'SM'},
    { name: 'Havanese', size: 'SM'},
    { name: 'Papillon', size: 'SM'},
    { name: 'Miniature Pinscher', size: 'SM'},
    { name: 'Brittany Spaniel', size: 'MD'},
    { name: 'Cairn Terrier', size: 'SM'},
    { name: 'English Springer Spaniel', size: 'MD'},
    { name: 'Norwegian Elkhound', size: 'MD'},
    { name: 'Belgian Malinois', size: 'LG'},
    { name: 'Chinese Crested', size: 'SM'},
    { name: 'Tibetan Terrier', size: 'MD'},
    { name: 'American Pit Bull Terrier', size: 'MD'},
    { name: 'Pharaoh Hound', size: 'MD'},
    { name: 'Old English Sheepdog', size: 'LG'},
    { name: 'Keeshond', size: 'MD'},
    { name: 'Australian Terrier', size: 'SM'},
    { name: 'Border Terrier', size: 'SM'},
    { name: 'Finnish Spitz', size: 'MD'},
    { name: 'Gordon Setter', size: 'LG'},
    { name: 'Manchester Terrier', size: 'SM'},
    { name: 'Giant Schnauzer', size: 'LG'},
    { name: 'Clumber Spaniel', size: 'LG'},
    { name: 'Finnish Lapphund', size: 'MD'},
    { name: 'Irish Wolfhound', size: 'XL'},
    { name: 'Japanese Chin', size: 'SM'},
    { name: 'Lakeland Terrier', size: 'SM'},
    { name: 'Leonberger', size: 'XL'},
    { name: 'Nova Scotia Duck Tolling Retriever', size: 'MD'},
    { name: 'Petit Basset Griffon Vendéen', size: 'SM'},
    { name: 'Plott Hound', size: 'MD'},
    { name: 'Polish Lowland Sheepdog', size: 'MD'},
    { name: 'Saluki', size: 'LG'},
    { name: 'Schipperke', size: 'SM'},
    { name: 'Scottish Deerhound', size: 'XL'},
    { name: 'Sealyham Terrier', size: 'SM'},
    { name: 'Silky Terrier', size: 'SM'},
    { name: 'Skye Terrier', size: 'SM'},
    { name: 'Soft Coated Wheaten Terrier', size: 'MD'},
    { name: 'Sussex Spaniel', size: 'MD'},
    { name: 'Tibetan Spaniel', size: 'SM'},
    { name: 'Toy Fox Terrier', size: 'SM'},
    { name: 'Treeing Walker Coonhound', size: 'MD'},
    { name: 'Welsh Terrier', size: 'SM'},
    { name: 'Wire Fox Terrier', size: 'SM'},
    { name: 'Xoloitzcuintli (Perro Mexicano sin Pelo)', size: 'SM'},
    { name: 'Spinone Italiano', size: 'LG'},
    { name: 'Kooikerhondje', size: 'MD'},
    { name: 'Bergamasco Sheepdog', size: 'LG'}
];

breeds.forEach(async (_breed) => {
    let newBreed = await new Breed(_breed);
    await newBreed.save();
});

console.log('Finish Breed');