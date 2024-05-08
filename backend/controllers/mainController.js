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
    static getStoreGeneratedQRCodeWithEmployee = async (req, res) => {
        try {
          const qrCodesWithEmployee = await QRCode.aggregate([
            {
              $lookup: {
                from: "users", // Assuming the collection name for employees is "employees"
                localField: "employee_id",
                foreignField: "_id",
                as: "employee"
              }
            },
            {
              $unwind: "$employee"
            },
            {
              $project: {
                _id: 1,
                product_name: 1,
                color: 1,
                size: 1,
                brand: 1,
                otherDetails: 1,
                stitching_type: 1,
                line: 1,
                status: 1,
                pocket_type: 1,
                employee: `$employee`
              }
            }
          ]);
      console.log("qrCodesWithEmployee", qrCodesWithEmployee)
        return  res.status(200).json(qrCodesWithEmployee);
        } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ message: 'Failed to fetch data', error });
        }
      }
      

}
export default MainController