// // import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import responseHandler from '../utils/responseHandler.js';
// import { HttpStatusCode } from '../utils/constants.js';
// import  {pool}  from '../config/database.js'; 


// const login = async (req, res) => {
//   console.log('login');
  
//   try {
//     const { username, password } = req.body;
//     const query = "SELECT * FROM Sazs_weighbridge_Login WHERE username=?";
//      pool.query(query, [username], (err, results) => {
//       console.log("err",err,results);
      
//       if (err) {
//         console.error(err);
//         return responseHandler({
//           req,
//           res,
//           data: { error: 'Database query error' },
//           httpCode: HttpStatusCode.BAD_REQUEST,
//         });
//         //   return res.json({ Status: 'error', Error: 'Database query error'});
//       }

//       if (results.length === 0) {
//         return responseHandler({
//           req,
//           res,
//           data: { error: 'User not found' },
//           httpCode: HttpStatusCode.BAD_REQUEST,
//         });
//       }

//       const user = results[0];
//       if (password === user.password) {
//         const token = jwt.sign({ id: user.id }, 'sazsapps', {
//           expiresIn: '1h',
//         });
//         return res.json({ Status: 'success', token });
//       } else {
//         return responseHandler({
//           req,
//           res,
//           data: { error: 'Incorrect password' },
//           httpCode: HttpStatusCode.UNAUTHORIZED,
//         });
//       }
//     })
//   } catch (error) {
//     console.log('login err -ok', err);
//     return responseHandler({
//       req,
//       res,
//       data: { error: 'Invalid credentials' },
//       httpCode: HttpStatusCode.UNAUTHORIZED,
//     });
//   }

// }

// export default {
//   login
// }

import jwt from 'jsonwebtoken';
import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { pool } from '../config/database.js';

const login = async (req, res) => {
  
  try {
    const { username, password } = req.body;
    const query = "SELECT * FROM Sazs_weighbridge_Login WHERE username=?";
    
    const [results] = await pool.query(query, [username]);
    if (results.length === 0) {
      return responseHandler({
        req,
        res,
        data: { error: 'User not found' },
        httpCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    const user = results[0];
    if (password === user.password) {
      const token = jwt.sign({ id: user.id }, 'sazsapps', {
        expiresIn: '1h',
      });
      return res.json({ Status: 'success', token });
    } else {
      return responseHandler({
        req,
        res,
        data: { error: 'Incorrect password' },
        httpCode: HttpStatusCode.UNAUTHORIZED,
      });
    }
  } catch (error) {
    console.error('login err:', error);
    return responseHandler({
      req,
      res,
      data: { error: 'Invalid credentials' },
      httpCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}

export default {
  login
}
