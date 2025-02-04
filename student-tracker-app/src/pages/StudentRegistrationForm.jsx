import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, IconButton, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import 'tailwindcss/tailwind.css';
import Confetti from 'react-confetti';

const gradeOptions = Array.from({ length: 8 }, (_, i) => ({
  value: i + 6,
  label: `Grade ${i + 6}`
}));

function StudentRegistrationForm({ setPage }) {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
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
      phone: Yup.string().matches(/^\d{10,}$/, 'Phone must be at least 10 digits').required('Required')
    }),
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        toast.success("Registration successful!");
        resetForm();
        setPage('dashboard');
      }, 1500);
    }
  });

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = () => formik.setFieldValue('photoPreview', reader.result);
      reader.readAsDataURL(file);
      formik.setFieldValue('photo', file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] }
  });

  const selectStyles = {
    control: provided => ({
      ...provided,
      background: 'rgba(255,255,255,0.1)',
      borderColor: 'rgba(255,255,255,0.2)',
      transition: 'all 300ms'
    }),
    menu: provided => ({
      ...provided,
      animation: 'slideDown 300ms ease'
    }),
    singleValue: provided => ({
      ...provided,
      color: '#ffffff'
    })
  };

  const handleNameBlur = e => {
    formik.handleBlur(e);
    if (formik.errors.name) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1000);
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-[#000000] p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <motion.div className="w-[600px] p-8 rounded-[16px] bg-[rgba(0,0,0,0.8)] shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,215,0,0.1)]" style={{ backdropFilter: 'blur(20px)' }} animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
        <motion.h1 className="text-[24px] font-semibold text-center text-[#ffd700] mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          Register a New Student
        </motion.h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <motion.div animate={formik.touched.name && formik.errors.name ? { x: [0, -10, 10, -10, 10, 0] } : {}}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={handleNameBlur}
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={(formik.touched.name && formik.errors.name) || ''}
              InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
              InputLabelProps={{ style: { color: formik.touched.name && !formik.errors.name ? '#ffd700' : '#1e90ff' } }}
            />
          </motion.div>
          <div>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={(formik.touched.email && formik.errors.email) || ''}
              InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
              InputLabelProps={{ style: { color: formik.touched.email && !formik.errors.email ? '#ffd700' : '#1e90ff' } }}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.phone && formik.errors.phone)}
              helperText={(formik.touched.phone && formik.errors.phone) || ''}
              InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
              InputLabelProps={{ style: { color: formik.touched.phone && !formik.errors.phone ? '#ffd700' : '#1e90ff' } }}
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#1e90ff] mb-2">Grade</label>
            <Select
              options={gradeOptions}
              value={formik.values.grade}
              onChange={option => formik.setFieldValue('grade', option)}
              styles={selectStyles}
            />
          </div>
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
              InputLabelProps={{ style: { color: '#1e90ff' } }}
            />
          </div>
          <div>
            <label className="block text-[14px] font-medium text-[#1e90ff] mb-2">Photo</label>
            <div {...getRootProps()} className="border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded p-4 flex flex-col items-center justify-center cursor-pointer transition hover:border-[#1e90ff]">
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
          <div className="flex flex-col gap-4">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#1e90ff', height: 48, borderRadius: 8, fontSize: 16, fontWeight: 500 }}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
            <IconButton onClick={() => formik.resetForm()} style={{ color: '#ffd700' }}>
              <RefreshIcon />
            </IconButton>
          </div>
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </motion.div>
    </motion.div>
  );
}

export default StudentRegistrationForm;
