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
          const storedProduct  =   await product.save();
         return   res.status(200).json({ message: 'Product created successfully',storedProduct });
          } catch (err) {
          return  res.status(400).json({ message:err.message }, err);
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
              $sort: { updatedAt: -1 } // Sort by updatedAt in ascending order
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
                employee: `$employee`,
                createdAt: 1,
                updatedAt: 1
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
      static updateEmployeeRecord = async (req, res) => {
        try {
          console.log("body of the scanning ", req.body)
          const { e: employeeId, p: productId } = req.body;
          const updatedRecord = await QRCode.updateOne(
            { _id: productId },
            {
              employee_id: employeeId,
              status: 1,
              isScanned: true
            }
          );
      
          console.log("updatedRecord", updatedRecord);
          res.status(200).send(updatedRecord);
        } catch (error) {
          console.error("Error updating record", error);
          res.status(500).send("An error occurred while updating the record.");
        }
      }
      static getChartData = async(req,res)=>{
        try {
          const getAllUsersPendingAndCompletedTask = QRCode
        } catch (error) {
          
        }
      }

}
export default MainController