import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, IconButton, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const subjects = ["Math", "English", "Science", "History", "Geography", "Art", "Music", "Physical Education", "Computer Science"];

function AcademicReportForm({ setPage }) {
  // Build initial values dynamically: one field for student name plus each subject has term1, term2, term3.
  const initialValues = {
    studentName: '',
  };
  subjects.forEach(subject => {
    initialValues[subject] = { term1: '', term2: '', term3: '' };
  });

  const validationSchema = Yup.object({
    studentName: Yup.string().required('Required'),
    // Optionally add validations for each subject's marks if needed.
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Save academic report to localStorage
      const stored = JSON.parse(localStorage.getItem('academicReports')) || [];
      stored.push(values);
      localStorage.setItem('academicReports', JSON.stringify(stored));
      toast.success("Academic report submitted!");
      resetForm();
      setPage('dashboard');
    }
  });

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-[#000000] p-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div className="w-[800px] p-8 rounded-[16px] bg-[rgba(0,0,0,0.8)]" style={{ backdropFilter: 'blur(20px)' }}>
        <h1 className="text-2xl font-bold text-center text-[#ffd700] mb-8">
          Enter Academic Report
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Student Name"
            variant="outlined"
            name="studentName"
            value={formik.values.studentName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.studentName && Boolean(formik.errors.studentName)}
            helperText={(formik.touched.studentName && formik.errors.studentName) || ''}
            InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
          />
          {subjects.map(subject => (
            <div key={subject} className="border p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2 text-[#ffd700]">{subject}</h2>
              <div className="grid grid-cols-3 gap-4">
                {['term1','term2','term3'].map(term => (
                  <TextField
                    key={term}
                    fullWidth
                    label={`${subject} ${term.toUpperCase()}`}
                    variant="outlined"
                    name={`${subject}.${term}`}
                    value={formik.values[subject][term]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{ style: { background: 'rgba(255,255,255,0.1)', color: '#ffffff' } }}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-4 mt-4">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#1e90ff', height: 48, fontSize: 16, fontWeight: 500 }}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
            >
              Submit Academic Report
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

export default AcademicReportForm;
