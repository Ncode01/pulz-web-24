import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, IconButton, CircularProgress } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { motion } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDropzone } from 'react-dropzone'
import Select from 'react-select'
import 'tailwindcss/tailwind.css'
import Confetti from 'react-confetti'
import * as THREE from 'three'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { Howl } from 'howler'
import { gsap } from 'gsap'

const gradeOptions = Array.from({ length: 8 }, (_, i) => ({
  value: i + 6,
  label: `Grade ${i + 6}`
}))

function StudentRegistrationForm() {
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [progress, setProgress] = useState(0)
  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition()

  useEffect(() => {
    // Three.js: set up scene, camera, renderer and start animation loop
    const canvas = document.getElementById('three-background')
    if (canvas) {
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
      camera.position.z = 5
      
      const geometry = new THREE.SphereGeometry(0.05, 32, 32)
      const material = new THREE.MeshBasicMaterial({ color: 0x00f3ff })
      for (let i = 0; i < 100; i++) {
        const particle = new THREE.Mesh(geometry, material)
        particle.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        )
        scene.add(particle)
      }
      
      const animate = function () {
        requestAnimationFrame(animate)
        renderer.render(scene, camera)
      }
      animate()
    }
  }, [])

  const startVoiceInput = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: false })
      new Howl({ src: ['bleep.mp3'] }).play()
    }
  }

  const handleFieldFocus = () => {
    gsap.to({}, {
      duration: 1,
      onUpdate: () => setProgress(prev => Math.min(prev + 10, 100))
    })
  }

  const futuristicSubmit = (values, { resetForm }) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success("Student Registered. Level Up!")
      resetForm()
    }, 1500)
  }

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
    onSubmit: futuristicSubmit
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
    accept: { 'image/jpeg': [], 'image/png': [] }
  })

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      background: 'rgba(255,255,255,0.1)',
      borderColor: 'rgba(255,255,255,0.2)',
      transition: 'all 300ms',
    }),
    menu: (provided) => ({
      ...provided,
      animation: 'slideDown 300ms ease',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff'
    })
  }

  const handleNameBlur = e => {
    formik.handleBlur(e)
    if (formik.errors.name) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1000)
    }
    handleFieldFocus()
  }

  return (
    <div className="relative">
      <canvas id="three-background" className="absolute inset-0 z-[-1]"></canvas>
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center bg-[rgba(0,0,0,0.85)] p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-md mb-4">
          <div className="h-2 bg-gray-700 rounded">
            <div style={{ width: `${progress}%` }} className="h-2 bg-cyan-400 rounded"></div>
          </div>
        </div>
        <motion.div
          className="w-[600px] p-8 rounded-[16px] bg-[rgba(10,10,10,0.7)] shadow-xl"
          style={{ backdropFilter: 'blur(20px)' }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <motion.h1
            className="text-[24px] font-semibold text-center text-[#ffd700] mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Engage Student Matrix
          </motion.h1>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div onFocus={handleFieldFocus}>
              <motion.div
                animate={formik.touched.name && formik.errors.name ? { x: [0, -10, 10, -10, 10, 0], rotate: [0, 2, -2, 0] } : {}}
              >
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
                  InputProps={{ style: { background: 'rgba(255,255,255,0.05)', color: '#00f3ff' } }}
                  InputLabelProps={{
                    style: { color: formik.touched.name && !formik.errors.name ? '#ffd700' : '#00f3ff' }
                  }}
                />
              </motion.div>
              {showConfetti && (
                <motion.div
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -20 }}
                  transition={{ duration: 1 }}
                  style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
                >
                  <span style={{ fontSize: 24 }}>💥 ❌ 🤯</span>
                </motion.div>
              )}
            </div>
            {/* ...existing code for Email and Phone fields... */}
            <div>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={e => { formik.handleBlur(e); handleFieldFocus() }}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={(formik.touched.email && formik.errors.email) || ''}
                InputProps={{ style: { background: 'rgba(255,255,255,0.05)', color: '#00f3ff' } }}
                InputLabelProps={{
                  style: { color: formik.touched.email && !formik.errors.email ? '#ffd700' : '#00f3ff' }
                }}
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
                onBlur={e => { formik.handleBlur(e); handleFieldFocus() }}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={(formik.touched.phone && formik.errors.phone) || ''}
                InputProps={{ style: { background: 'rgba(255,255,255,0.05)', color: '#00f3ff' } }}
                InputLabelProps={{
                  style: { color: formik.touched.phone && !formik.errors.phone ? '#ffd700' : '#00f3ff' }
                }}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#00f3ff] mb-2">Grade</label>
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
                InputProps={{ style: { background: 'rgba(255,255,255,0.05)', color: '#00f3ff' } }}
                InputLabelProps={{ style: { color: '#00f3ff' } }}
              />
            </div>
            <div>
              <label className="block text-[14px] font-medium text-[#00f3ff] mb-2">Photo</label>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded p-4 flex flex-col items-center justify-center cursor-pointer transition hover:border-[#00f3ff]"
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
            <div className="flex items-center space-x-2">
              <button type="button" onClick={startVoiceInput} className="bg-indigo-500 p-2 rounded-full">
                🎤
              </button>
              <span className="text-white">{transcript}</span>
            </div>
            <div className="flex flex-col gap-4">
              <Button
                fullWidth
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#00f3ff', height: 48, borderRadius: 8, fontSize: 16, fontWeight: 500 }}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Engage Matrix'}
              </Button>
              <IconButton onClick={() => formik.resetForm()} style={{ color: '#ffd700' }}>
                <RefreshIcon />
              </IconButton>
            </div>
          </form>
          <ToastContainer position="top-center" autoClose={3000} />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default StudentRegistrationForm
