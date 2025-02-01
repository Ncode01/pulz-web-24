import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addStudent, removeStudent, updateStudent } from './redux/studentSlice'
function App() {
  const students = useSelector(state => state.students.students)
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [contact, setContact] = useState('')
  const [photo, setPhoto] = useState('')
  const [term, setTerm] = useState('')
  const [recordsInput, setRecordsInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1e6)}`
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhoto(reader.result)
      reader.readAsDataURL(file)
    }
  }
  const parseRecords = (input) => {
    return input.split('\n').map(line => {
      const parts = line.split(':')
      return parts.length === 2 ? { subject: parts[0].trim(), grade: Number(parts[1].trim()) } : null
    }).filter(r => r && !isNaN(r.grade))
  }
  const calculateGPA = (records) => {
    if (!records.length) return 'N/A'
    const total = records.reduce((sum, rec) => sum + rec.grade, 0)
    const avg = total / records.length
    return (avg / 25).toFixed(2)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    const academicRecords = parseRecords(recordsInput)
    if (editId) {
      dispatch(updateStudent({ id: editId, name, grade, contact, photo, term, academicRecords }))
      setEditId(null)
    } else {
      dispatch(addStudent({ id: generateId(), name, grade, contact, photo, term, academicRecords }))
    }
    setName('')
    setGrade('')
    setContact('')
    setPhoto('')
    setTerm('')
    setRecordsInput('')
  }
  const handleEdit = student => {
    setEditId(student.id)
    setName(student.name)
    setGrade(student.grade || '')
    setContact(student.contact || '')
    setPhoto(student.photo || '')
    setTerm(student.term || '')
    setRecordsInput(student.academicRecords ? student.academicRecords.map(r => `${r.subject}: ${r.grade}`).join('\n') : '')
  }
  const handleDelete = id => dispatch(removeStudent(id))
  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <div className="bg-[#121212] text-white min-h-screen flex">
      {sidebarOpen && (
        <aside className="p-4 space-y-4 w-[280px] bg-[rgba(40,40,40,0.8)] backdrop-blur-md shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)]">
          <div className="text-xl font-bold">Menu</div>
          <button onClick={() => setSidebarOpen(false)}>Collapse</button>
          <nav className="space-y-2">
            <a href="#" className="block px-2 py-1">All Students</a>
            <a href="#" className="block px-2 py-1">Add Student</a>
            <a href="#" className="block px-2 py-1">Attendance</a>
            <a href="#" className="block px-2 py-1">Reports</a>
          </nav>
        </aside>
      )}
      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="p-2 bg-indigo-500 text-white m-2">Open</button>
      )}
      <div className="flex-1 flex flex-col">
        <nav className="h-[72px] flex justify-between items-center px-4 bg-[rgba(30,30,30,0.8)] backdrop-blur-md shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)]">
          <div className="text-2xl font-bold">School</div>
          <div className="space-x-4">
            <input
              type="text"
              placeholder="Search Students"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded"
            />
          </div>
        </nav>
        <div className="p-8 md:grid md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4 lg:col-span-3 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Student Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded"/>
              <input type="text" placeholder="Grade" value={grade} onChange={e => setGrade(e.target.value)} className="w-full p-2 border rounded"/>
              <input type="text" placeholder="Contact Info" value={contact} onChange={e => setContact(e.target.value)} className="w-full p-2 border rounded"/>
              <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded"/>
              <input type="text" placeholder="Term" value={term} onChange={e => setTerm(e.target.value)} className="w-full p-2 border rounded"/>
              <textarea placeholder="Academic Records (each line: subject: grade)" value={recordsInput} onChange={e => setRecordsInput(e.target.value)} className="w-full p-2 border rounded" rows="3"></textarea>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{editId ? "Update Student" : "Add Student"}</button>
            </form>
          </div>
          <div className="mt-6 md:col-span-8 lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudents.map(student => (
              <div key={student.id} className={
                "group perspective w-[280px] h-[360px] p-6 rounded-[16px] bg-[#1e1e1e] " +
                "shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)] " +
                "transition-transform transform duration-300 hover:scale-105 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)] relative"
              }>
                <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-800 p-4 rounded shadow">
                  <img src={student.photo || "https://via.placeholder.com/150"} alt="student" className="w-24 h-24 object-cover rounded-full mx-auto"/>
                  <h2 className="mt-4 text-xl font-bold text-center">{student.name}</h2>
                  <p className="text-center">{student.grade}</p>
                  <p className="text-center text-sm">ID: {student.id}</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <button onClick={() => handleEdit(student)} className="px-3 py-1 bg-green-500 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(student.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                  </div>
                </div>
                <div className="absolute w-full h-full backface-hidden bg-gray-200 dark:bg-gray-700 p-4 rounded shadow rotate-y-180">
                  <h3 className="text-lg font-bold mb-2">Academic Record</h3>
                  {student.term && <p>Term: {student.term}</p>}
                  {student.academicRecords && student.academicRecords.length > 0 ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr>
                          <th className="border px-2 py-1">Subject</th>
                          <th className="border px-2 py-1">Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {student.academicRecords.map((rec, idx) => (
                          <tr key={idx}>
                            <td className="border px-2 py-1">{rec.subject}</td>
                            <td className="border px-2 py-1">{rec.grade}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No records</p>
                  )}
                  {student.academicRecords && student.academicRecords.length > 0 && (
                    <div className="mt-2">
                      <p>GPA: {calculateGPA(student.academicRecords)}</p>
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(calculateGPA(student.academicRecords) / 4) * 100}%` }}></div>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 flex justify-center">
                    <button onClick={() => alert("Generating Report Card")} className="px-3 py-1 bg-indigo-500 text-white rounded">View Report</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className={
          "h-[56px] flex items-center justify-center px-4 mt-auto " +
          "bg-[rgba(30,30,30,0.8)] backdrop-blur-md " +
          "shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)]"
        }>
          © 2023 MySchool
        </footer>
      </div>
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={
          "fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center " +
          "bg-[rgba(40,40,40,0.8)] backdrop-blur-md " +
          "shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)] " +
          "text-2xl transform transition hover:rotate-45 hover:shadow-[0_0_16px_rgba(255,255,255,0.1)]"
        }
      >
        +
      </button>
    </div>
  )
}
export default App
