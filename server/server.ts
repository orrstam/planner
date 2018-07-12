import app from '../app';

app.set('port', process.env.PORT || 7778);
const server = app.listen(app.get('port'), (): void => {
  console.log(`Express running → PORT ${app.get('port')} in ${app.get('env')} mode`);
});
