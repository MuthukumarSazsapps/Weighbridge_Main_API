import responseHandler from '../utils/responseHandler.js';
import { HttpStatusCode } from '../utils/constants.js';
import { pool } from '../config/database.js';
// import  transaction from '../config/transaction.js'; 

const getAllCompanies = async (req, res) => {
  try {
    const query = 'select * from sazs_weighbridge_Customers';
    const [results] = await pool.query(query);

    if (results.length === 0) {
      return responseHandler({
        req,
        res,
        data: { error: 'No companies found' },
        httpCode: HttpStatusCode.NOT_FOUND, // Using 404 Not Found
      });
    }

    return responseHandler({
      req,
      res,
      data: { companyLists: results },
      httpCode: HttpStatusCode.OK, // Using 200 OK
    });
  } catch (error) {
    console.error('Database query error:', error);
    return responseHandler({
      req,
      res,
      data: { error: 'Database query error' },
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR, // Using 500 Internal Server Error
    });
  }
};


const createcompany = async (req, res) => {
  const { Address, BusinessName, ConfirmPassword, GST, Pan, Password, PhoneNO, Pin, Place, dateTime, companyName, username } = req.body;

  try {
    const query = `
      INSERT INTO sazs_weighbridge_Customers 
      (CompanyId, companyName, username, Address, Place, Pin, PhoneNO, GST, Pan, Password, ConfirmPassword, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = ['cust-002', companyName,username, Address, Place, Pin, PhoneNO, GST, Pan, Password, ConfirmPassword, username, new Date(), username, new Date()];

    const [result] = await pool.query(query, values);

    return responseHandler({
      req,
      res,
      data: {status:true, message: 'Company created successfully', companyId: result.insertId },
      httpCode: HttpStatusCode.CREATED,
    });
  } catch (error) {
    console.error('Database insert error:', error);
    return responseHandler({
      req,
      res,
      data: { error: 'Failed to create company' },
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
};

const editcompany = async (req, res) => {
  const { Address, BusinessName, ConfirmPassword, GST, Pan, Password, PhoneNO, Pin, Place, dateTime, companyName, username } = req.body;

  try {
    const query = `
      INSERT INTO sazs_weighbridge_Customers 
      (CompanyId, companyName, username, Address, Place, Pin, PhoneNO, GST, Pan, Password, ConfirmPassword, CreatedBy, CreatedOn, ModifiedBy, ModifiedOn) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = ['cust-002', companyName,username, Address, Place, Pin, PhoneNO, GST, Pan, Password, ConfirmPassword, username, new Date(), username, new Date()];

    const [result] = await pool.query(query, values);

    return responseHandler({
      req,
      res,
      data: {status:true, message: 'Company created successfully', companyId: result.insertId },
      httpCode: HttpStatusCode.CREATED,
    });
  } catch (error) {
    console.error('Database insert error:', error);
    return responseHandler({
      req,
      res,
      data: { error: 'Failed to create company' },
      httpCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  }
};


export default {
  getAllCompanies, createcompany
}