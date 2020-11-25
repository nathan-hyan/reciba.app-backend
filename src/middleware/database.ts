import mongoose from "mongoose";

if (process.env.MONGO_URI) {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    () => {
      console.log(`Connected to Database`);
    }
  );
} else {
  throw Error("Can't connect to the server, URI not specified");
}
