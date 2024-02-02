import QRCode from "../model/QRCode.js";

class MainController  {

    static StoreGeneratedQRCode = async (req, res) => {
        try {
            const product = new QRCode(req.body);
            await product.save();
         return   res.status(200).json({ message: 'Product created successfully' });
          } catch (err) {
          return  res.status(500).json({ error: 'Failed to create product' });
          }
    }

}
export default MainController