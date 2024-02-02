import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
import { toast } from "react-toastify";

const GenerateQrCode = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = React.useState(false);
  const [jsonData, setJsonData] = useState([]);

  const apiBaseURl = 'https://8000-patia2-iot-scx2righy6z.ws-us107.gitpod.io/api'

  const validationSchema = yup.object().shape({
    product_name: yup.string().required("Product Name is required"),
    color: yup.string().required("Color is required"),
    size: yup.string().required("Size is required"),
    brand: yup.string().required("Brand is required"),
    otherDetails: yup.string(),
    stitching_type: yup.string().required("Stitching Type is required"),
    line: yup.number().required("Line is required"),
    pocket_type: yup.string().required("Pocket Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      product_name: "",
      color: "",
      size: "",
      brand: "",
      otherDetails: "",
      stitching_type:"",
      line:'',
      pocket_type:''
    },
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        setLoading(true);
        const {product_name, color, size, brand, otherDetails, line, pocket_type, stitching_type} = values;
        const url = `${apiBaseURl}/storeGeneratedQRCode`;
        const postData = {product_name, color, size, brand, line, otherDetails, pocket_type, stitching_type};
        jsonData.push(postData);
        const res = await axios.post(url,postData);
        if (res.status === 200) {
          setLoading(false);
          setShowQRCode(true);
          toast.success(res?.data?.message, { position: 'top-right' });
          resetForm();
          setJsonData([postData]);
        } else {
          setLoading(false);
          toast.error(res?.data?.message);
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      }
    },
  });

  const qrCodeRef = useRef(null);

  const handleDownloadQRCode = () => {
    const qrCodeElement = qrCodeRef.current;
    html2canvas(qrCodeElement).then((canvas) => {
      canvas.toBlob((blob) => {
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = 'qr_code.png';
        anchor.click();
        URL.revokeObjectURL(anchor.href);
      });
    });
  };

  return (
    <>
      <Box m="20px">
        <Header title="Generate QR Code" subtitle="Generate a New QR Code" />
        <form onSubmit={formik.handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Product Name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.product_name}
              name="product_name"
              error={formik.touched.product_name && formik.errors.product_name}
              helperText={formik.touched.product_name && formik.errors.product_name}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Color"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.color}
              name="color"
              error={formik.touched.color && formik.errors.color}
              helperText={formik.touched.color && formik.errors.color}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Size"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.size}
              name="size"
              error={formik.touched.size && formik.errors.size}
              helperText={formik.touched.size && formik.errors.size}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Pocket Type"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.pocket_type}
              name="pocket_type"
              error={formik.touched.pocket_type && formik.errors.pocket_type}
              helperText={formik.touched.pocket_type && formik.errors.pocket_type}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Stitching Type"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.stitching_type}
              name="stitching_type"
              error={formik.touched.stitching_type && formik.errors.stitching_type}
              helperText={formik.touched.stitching_type && formik.errors.stitching_type}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Brand"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.brand}
              name="brand"
              error={formik.touched.brand && formik.errors.brand}
              helperText={formik.touched.brand && formik.errors.brand}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Line"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.line}
              name="line"
              error={formik.touched.line && formik.errors.line}
              helperText={formik.touched.line && formik.errors.line}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Other Details"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.otherDetails}
              name="otherDetails"
              error={formik.touched.otherDetails && formik.errors.otherDetails}
              helperText={formik.touched.otherDetails && formik.errors.otherDetails}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              disabled={loading}
            >
              Generate New QR Code
            </Button>
          </Box>
        </form>
      </Box>
      <div>
        {showQRCode && (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '40vh', width:'50vw' }}>
          <div ref={qrCodeRef}>
            <QRCode value={JSON.stringify(jsonData)} />
          </div>
          <Button
            type="submit"
            sx={{marginTop:'4px'}}
            color="secondary"
            variant="contained"
            onClick={handleDownloadQRCode}
          >
            Download QR Code
          </Button>
        </div>
        
        )}
      </div>
    </>
  );
};

export default GenerateQrCode;
