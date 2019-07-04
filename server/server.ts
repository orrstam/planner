import app from '../app';
import * as mongoose from 'mongoose';

require('dotenv').config({ path: './.env' });

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

app.set('port', process.env.PORT || 7778);
const server = app.listen(
  app.get('port'),
  (): void => {
    console.log(
      `Express running → PORT ${app.get('port')} in ${app.get('env')} mode`
    );
  }
);
