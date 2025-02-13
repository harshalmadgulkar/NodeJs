import mongoose from 'mongoose';

export const connect = async () => {
  await mongoose.connect(
    'mongodb+srv://harshalmadgulkar725:juL8vrelq2XJHn7Y@cluster0.oqkke.mongodb.net/chatapp?retryWrites=true&w=majority&appName=Cluster0'
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }
  );
  console.log('DB is connected');
};
