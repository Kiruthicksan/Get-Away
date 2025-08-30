import mongoose from "mongoose";



let isConnected = false

export const ConnectDb = async () => {

    // checking if  db already connected 

    if (isConnected){
        console.log("Mongodb is Already Connected")
        return
    }


    let url = process.env.MONGO_URL

    // Checking the URl is correct
    if (!url){
        throw new Error("MONGO_URL is not defined or incorret in .env file")
    }

    // Connecting Database 
  try{
    const connect = await mongoose.connect(url,
        {dbName: "GetAway"}  // just for reference
    )
    isConnected = true
    console.log(`Db connected: ${connect.connection.host}`)
  }catch{
    console.log("Error connection DB", error.message)
    process.exit(1)
  }

  // handling disconnect

  mongoose.connection.on('disconnected', () => {
    isConnected = false
    console.log("MongoDb is disconnected")
  })

  mongoose.connection.on('error', (err) => {
    console.log("Connection Errorr:", err)
  })
    
}