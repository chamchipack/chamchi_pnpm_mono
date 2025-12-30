import mongoose from 'mongoose';
require('dotenv').config();

const db = () => {
  mongoose
    .connect(process.env.MONGO + 'majority', {
      dbName: 'library',
      // useCreateIndex: true, //MondDB 6.0 이상에서는 지원 X
      ignoreUndefined: true,
    })
    .then(() => console.log('MongoDB 연결완료'))
    .catch((err: any) => {
      console.log(err);
    });
};

export default db;
