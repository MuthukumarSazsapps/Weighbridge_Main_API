// import mysql from 'mysql2/promise';  // Use promise-based import

// export let pool = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'tn96D1696',
//   database: 'sazs_weighbridge',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// pool.connect((err)=> {
//   if(!err)
//   console.log('Connection Established Successfully');
//   else
//   console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
//   });

import mysql from 'mysql2/promise';  // Use promise-based import

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'tn96D1696',
  database: 'sazs_weighbridge',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connection Established Successfully');
    connection.release();
  } catch (err) {
    console.error('Connection Failed!', err);
  }
})();


