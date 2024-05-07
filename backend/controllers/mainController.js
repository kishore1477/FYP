import QRCode from "../model/QRCode.js";

class MainController  {

    static StoreGeneratedQRCode = async (req, res) => {
        try {
            const data = {
                ...req.body,
                employee_id: req?.body?.employee
            }
            console.log("data", data)
            const product = new QRCode(data);
            await product.save();
         return   res.status(200).json({ message: 'Product created successfully' });
          } catch (err) {
          return  res.status(500).json({ message: 'Failed to create product' }, err);
          }
    }
    static getStoreGeneratedQRCodeByEmployeeId = async (req, res) => {
        try {
            const employeeId = req.params.employeeId;
            const qrCodes = await QRCode.find({ employee_id: employeeId });
          return   res.status(200).json(qrCodes); 
          } catch (error) {
            console.error('Error fetching data by employee_id:', error);
           return res.status(500).json({ message: 'Failed to fetch data by employee_id', error });
          }
    }

}
export default MainController