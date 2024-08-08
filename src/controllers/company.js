import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { pool } from '../config/database.js'; 
// import  transaction from '../config/transaction.js'; 


const getAllCompanies= async(req,res) =>{
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
          const [rows1] = await connection.query('Select * from company');
          await connection.commit();
          return { companlists: rows1};
      } catch (error) {
        console.error('Transaction failed:', error);
        await connection.rollback();
      }
}


export default {
    getAllCompanies
}