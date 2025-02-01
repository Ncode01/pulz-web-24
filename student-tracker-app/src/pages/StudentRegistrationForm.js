import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDropzone } from 'react-dropzone'
import Select from 'react-select'
import 'tailwindcss/tailwind.css'

const gradeOptions = Array.from({ length: 8 }, (_, i) => ({
  value: i + 6,
  label: `Grade ${i + 6}`
}))

function StudentRegistrationForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
      grade: gradeOptions[0],
      email: '',
      phone: '',
      achievements: '',
      photo: null,
      photoPreview: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Name must be at least 3 characters').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      phone: Yup.string().matches(/^\d{10,}$/, 'Phone must be at least 10 digits').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      toast.success("Registration successful!")
      resetForm()
    }
  })

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0]
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader()
      reader.onload = () => formik.setFieldValue('photoPreview', reader.result)
      reader.readAsDataURL(file)
      formik.setFieldValue('photo', file)
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'image/jpeg': [], 'image/png': []}
  })

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-[#000000] p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-[600px] p-8 rounded-[16px] bg-[rgba(0,0,0,0.8)] backdrop-blur-md shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,215,0,0.1)]"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <motion.h1
          className="text-[24px] font-semibold text-center text-[#ffd700] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Register a New Student
        </motion.h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Name Field using Material-UI TextField */}
          <div>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
            />
          </div>
          {/* Email Field */}
          <div>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
            />
          </div>
          {/* Phone Field */}
          <div>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
            />
          </div>
          {/* Grade Field using React Select */}
          <div>
            <label className="block text-[14px] font-medium text-[#1e90ff] mb-2">Grade</label>
            <Select
              options={gradeOptions}
              value={formik.values.grade}
              onChange={option => formik.setFieldValue('grade', option)}
              styles={{
                control: (provided) => ({
                  ...provided,
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff'
                }),
                singleValue: (provided) => ({ ...provided, color: '#ffffff' })
              }}
            />
          </div>
          {/* Achievements Field */}
          <div>
            <TextField
              fullWidth
              label="Achievements"
              variant="outlined"
              name="achievements"
              value={formik.values.achievements}
              onChange={formik.handleChange}
              multiline
              minRows={2}
              InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
            />
          </div>
          {/* Creative Image Section: React Dropzone */}
          <div>
            <label className="block text-[14px] font-medium text-[#1e90ff] mb-2">Photo</label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded p-4 flex flex-col items-center justify-center cursor-pointer transition hover:border-[#1e90ff]"
            >
              <input {...getInputProps()} />
              {formik.values.photoPreview ? (
                <img src={formik.values.photoPreview} alt="Preview" className="h-20 w-20 rounded-full object-cover" />
              ) : (
                <div className="flex flex-col items-center">
                  <span className="text-white mb-1">Drag & Drop Photo Here</span>
                  <span className="text-[12px] text-[rgba(255,255,255,0.5)]">or click to upload</span>
                </div>
              )}
            </div>
          </div>
          {/* Interactive Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#1e90ff', height: 48, borderRadius: 8, fontSize: 16, fontWeight: 500 }}
              whileHover={{ scale: 1.02 }}
              component={motion.button}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Submit
            </Button>
            <IconButton
              onClick={() => formik.resetForm()}
              style={{ color: '#ffd700' }}
            >
              <RefreshIcon />
            </IconButton>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </motion.div>
    </motion.div>
  )
}

export default StudentRegistrationForm
