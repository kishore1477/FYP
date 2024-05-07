import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import { Box, Button, FormControl, InputLabel, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";

const GenerateQrCode = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [loading, setLoading] = React.useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [emploeeData, setEmploeeData] = useState([])
  const [selectedEmployeeData, setSelectedEmployeeData] = useState(null)
  const apiBaseURl = process.env.REACT_APP_backend_url
  const getUSersData = async (req, res) => {
    try {
      const url = `${apiBaseURl}/auth/getUsers`
      const res = await axios.get(url)
      const userData = res?.data

      setEmploeeData(userData)

    } catch (error) {
      toast.error('Error while fetching')
    }
  }
  useEffect(() => {
    getUSersData().then((res) => {
      console.log("res", res)
    })
  }, [])

  const validationSchema = yup.object().shape({
    product_name: yup.string().required("Product Name is required"),
    color: yup.string().required("Color is required"),
    size: yup.string().required("Size is required"),
    brand: yup.string().required("Brand is required"),
    otherDetails: yup.string(),
    stitching_type: yup.string().required("Stitching Type is required"),
    line: yup.number().required("Line is required"),
    pocket_type: yup.string().required("Pocket Type is required"),
    employee: yup.string().required(" please select the employee"),
  });

  const formik = useFormik({
    initialValues: {
      product_name: "",
      color: "",
      size: "",
      brand: "",
      otherDetails: "",
      stitching_type: "",
      line: '',
      pocket_type: '',
      employee: ''
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log('values', values, jsonData)
        setLoading(true);
        const { product_name, employee, color, size, brand, otherDetails, line, pocket_type, stitching_type } = values;
        const employeeDataOf = emploeeData?.filter((data) => data?._id === values?.employee)
        console.log("employeeDataOf", employeeDataOf)
        setSelectedEmployeeData(employeeDataOf?.[0])
        const url = `${process.env.REACT_APP_backend_url}/storeGeneratedQRCode`;
        const postData = { product_name, employee, color, size, brand, line, otherDetails, pocket_type, stitching_type };
        jsonData.push(postData);
        const res = await axios.post(url, postData);
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
  const employeeName = selectedEmployeeData?.firstName || 'Unknown';

  html2canvas(qrCodeElement).then((qrCanvas) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match QR code canvas
    canvas.width = qrCanvas.width;
    canvas.height = qrCanvas.height;

    // Draw QR code image
    ctx.drawImage(qrCanvas, 0, 0);

    // Draw employee name on top
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText(employeeName, canvas.width / 2, 20);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
      // Create a temporary link element to trigger the download
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(blob);
      anchor.download = `${employeeName}_qr_code.png`; // Include employee name in the filename
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
              sx={{ gridColumn: "span 2" }}
            />
            <FormControl fullWidth sx={{ gridColumn: "span 2" }}>
              <InputLabel id="demo-simple-select-label">Select Employee</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"

                label="Emploee"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.employee}
                name='employee'
              >
                {
                  emploeeData?.map((data) => {
                    return <MenuItem value={data?._id}>{data?.firstName}</MenuItem>
                  }
                  )
                }

              </Select>
            </FormControl>
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
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '40vh', width: '50vw' }}>
           
            {
              selectedEmployeeData?.firstName && <h3>Employee Name: {selectedEmployeeData?.firstName}</h3>
            }
            <div ref={qrCodeRef}>

              <QRCode value={JSON.stringify(jsonData)} title="dhhdede" />
            </div>
            <Button
              type="submit"
              sx={{ marginTop: '4px' }}
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
