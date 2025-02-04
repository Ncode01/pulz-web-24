import React, { useState, useEffect } from 'react';
import StudentRegistrationForm from './pages/StudentRegistrationForm.jsx';
import Dashboard from './pages/Dashboard';

function App() {
  const [page, setPage] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [modalStudent, setModalStudent] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(data);
  }, [page === 'data']);

  const handleDelete = (id) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
  };

  const renderRegistrationPage = () => (
    <StudentRegistrationForm setPage={setPage} />
  );

  const renderStudentDataPage = () => {
    const filteredStudents = students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search));
    return (
      <div className="min-h-screen bg-[#121212] text-white p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Student Data</h1>
          <input type="text" placeholder="Search by name or ID" value={search} onChange={e => setSearch(e.target.value)}
            className="p-2 border rounded w-1/3" />
          <button onClick={() => setPage('registration')} className="p-2 bg-indigo-500 rounded">
            Back to Registration
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStudents.map(student => (
            <div key={student.id} className="p-6 bg-[rgba(40,40,40,0.8)] backdrop-blur-md rounded-[16px] shadow-lg transition transform hover:scale-105 relative">
              <img src={student.photo || "https://via.placeholder.com/150"} alt="student" className="w-24 h-24 object-cover rounded-full mx-auto" />
              <h2 className="mt-4 text-xl font-bold text-center">{student.name}</h2>
              <p className="text-center">Grade: {student.grade}</p>
              <p className="text-center text-xs">ID: {student.id}</p>
              <div className="mt-4 flex justify-around">
                <button onClick={() => alert("Edit functionality not implemented")} className="px-3 py-1 bg-green-500 rounded">
                  Edit
                </button>
                <button onClick={() => handleDelete(student.id)} className="px-3 py-1 bg-red-500 rounded">
                  Delete
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <button onClick={() => setModalStudent(student)} className="px-3 py-1 bg-indigo-500 rounded">
                  View Academic Records
                </button>
              </div>
            </div>
          ))}
        </div>
        {modalStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="w-full max-w-xl bg-[rgba(40,40,40,0.8)] backdrop-blur-md p-8 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Academic Records for {modalStudent.name}</h2>
              <button onClick={() => setModalStudent(null)} className="px-4 py-2 bg-red-500 rounded">
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {page === 'dashboard'
        ? <Dashboard setPage={setPage} />
        : page === 'registration'
          ? renderRegistrationPage()
          : renderStudentDataPage()
      }
    </>
  );
}

export default App;
