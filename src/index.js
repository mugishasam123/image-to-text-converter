import express from 'express';
import {router}  from './routes/route.js';
import { join } from 'path';
import multer from 'multer';


const app = express();
// Set the view engine to ejs
app.set('view engine', 'ejs');
// Set the view directory
app.set('views', join('./src', 'views'));
// Serve static files from the 'public' folder
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer({ dest: 'uploads' }).single('image'));
app.use(router)

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});

export default app;