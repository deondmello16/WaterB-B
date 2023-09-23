const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campGround');

// mongoose.connect('mongodb://localhost:27017/yelp-camp');

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WaterB&B');
    console.log("Done")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  }
  
  main().catch(err => console.log(err));


const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '650bc938df4ecabf179687bf',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:`https://source.unsplash.com/random/100X100/?hotel`,
            description:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint soluta dolor, nihil impedit at magni exercitationem autem ipsam quidem molestias pariatur hic quibusdam facilis explicabo a consequuntur quis nobis ipsum?",
            price:price,
            // description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            // price,
            // geometry: {
            //     type: "Point",
            //     coordinates: [
            //         cities[random1000].longitude,
            //         cities[random1000].latitude,
            //     ]
            // },
            // images: [
            //     {
            //         url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
            //         filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
            //     },
            //     {
            //         url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
            //         filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
            //     }
            // ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})