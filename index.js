import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from "body-parser";
import { expressCspHeader, SELF } from 'express-csp-header';
import routes from './src/routes/index.js';
// import connectToDatabase from './src/config/database.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expressCspHeader({
  policies: {
    'default-src': [SELF],
    'img-src': ['data:', 'images.com'],
    'connect-src': [SELF, 'http://localhost:5000'], // Allow connections to the backend server
  }
}));

routes(app);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: "root",
//   password: "tn96D1696",
//   database: "Sazs_weighbridge",
// });

// db.connect(err => {
//   if (err) throw err;
//   console.log('MySQL Connected...');
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   console.log(username, password);

//   const query = "SELECT * FROM Sazs_weighbridge_Login WHERE username=?";
  
//   db.query(query, [username], (err, results) => {
//     if (err) {
//       console.error(err);
//       return res.json({ Status: 'error', Error: 'Database query error'});
//     }

//     if (results.length === 0) {
//       return res.json({ Status: 'error', Error: 'User not found' });
//     }

//     const user = results[0];
//     if (password === user.password) {
//       const token = jwt.sign({ id: user.id }, 'sazsapps', {
//         expiresIn: '1h',
//       });
//       return res.json({ Status: 'success', token });
//     } else {
//       return res.json({ Status: 'error', Error: 'Incorrect password'});
//     }
//   });
// });

// app.post('/createcompany',(req,res=>{
  
// }))

(async () => {
  // await connectToDatabase();
  const PORT = process.env.PORT ?? 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // console.log("publicKey", publicKey, "privateKey", privateKey);
  });
})();



// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
// });