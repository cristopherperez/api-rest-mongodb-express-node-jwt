import mongoose from "mongoose";

try {
    await mongoose.connect(process.env.URI_MONGO)
    console.log('connect db ok hola BIEN')
} catch (error) {
    console.log('error de coneccion a mongo db: ESTA ACA EL ERROR' + error)
}
