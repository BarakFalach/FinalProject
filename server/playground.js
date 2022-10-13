const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://Avichai_Edri:avED8896@finalproject.70igwkx.mongodb.net/?retryWrites=true&w=majority";

async function main() {

    const uri = "mongodb+srv://Avichai_Edri:avED8896@finalproject.70igwkx.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
   try {
    await client.connect();


    // await listDatabases(client); 

    // await creatListing(client,{
    //     name: "Lovely Loft",
    //     summery: "A chaming loft in paris",
    //     bedrooms : 1,
    //     bathrooms: 1
    // })
    await createMultipleListings(client, [
        {
            name: "Infinite Views",
            summary: "Modern home with infinite views from the infinity pool",
            property_type: "House",
            bedrooms: 5,
            bathrooms: 4.5,
            beds: 5
        },
        {
            name: "Private room in London",
            property_type: "Apartment",
            bedrooms: 1,
            bathroom: 1
        },
        {
            name: "Beautiful Beach House",
            summary: "Enjoy relaxed beach living in this house with a private beach",
            bedrooms: 4,
            bathrooms: 2.5,
            beds: 7,
            last_review: new Date()
        }
    ]);


} catch (error) {
    console.error(error);
   }
   finally{
    await client.close();
   }

}
main().catch(console.error);

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
}
async function creatListing(client, newListing){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`new list create with the following id ${result.insertedId}`);

}
async function createMultipleListings(client, newListings){
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListings);
    console.log(result.insertedIds);
}