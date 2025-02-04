import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Dashboard as DashboardIcon, School, BarChart, Event, Settings, Notifications, AccountCircle } from '@mui/icons-material';
import { IconButton, Avatar, Tooltip, Switch, Button, TextField } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend);

const Dashboard = ({ setPage }) => {
  const students = useSelector(state => state.students);
  // Load academic reports from localStorage
  const [academicReports, setAcademicReports] = useState([]);
  useEffect(() => {
    const reports = JSON.parse(localStorage.getItem('academicReports')) || [];
    setAcademicReports(reports);
  }, []);

  // New state for academic resource inline form
  const [resourceName, setResourceName] = useState('');
  const handleResourceSubmit = (e) => {
    e.preventDefault();
    const resources = JSON.parse(localStorage.getItem('academicResources')) || [];
    resources.push({ resourceName, timestamp: new Date().toISOString() });
    localStorage.setItem('academicResources', JSON.stringify(resources));
    toast.success("Academic resource added!");
    setResourceName('');
  };

  // Existing chart for student registration (students grouped by grade)
  const gradeData = useMemo(() => {
    const groups = students.reduce((acc, student) => {
      const gradeLabel = student.grade && student.grade.label ? student.grade.label : 'Unknown';
      acc[gradeLabel] = (acc[gradeLabel] || 0) + 1;
      return acc;
    }, {});
    return {
      labels: Object.keys(groups),
      datasets: [{
        label: 'Students per Grade',
        data: Object.values(groups),
        backgroundColor: Object.keys(groups).map(() => 'rgba(30,144,255,0.6)'),
        borderColor: Object.keys(groups).map(() => 'rgba(30,144,255,1)'),
        borderWidth: 1,
      }]
    };
  }, [students]);
  
  // New chart: Average marks per subject from academic reports
  const subjects = ["Math", "English", "Science", "History", "Geography", "Art", "Music", "Physical Education", "Computer Science"];
  const academicChartData = useMemo(() => {
    const subjectAverages = subjects.map(subject => {
      const vals = academicReports.map(report => {
        const subj = report[subject] || {};
        const term1 = Number(subj.term1 || 0);
        const term2 = Number(subj.term2 || 0);
        const term3 = Number(subj.term3 || 0);
        return (term1 + term2 + term3) / 3;
      });
      const total = vals.reduce((sum, v) => sum + v, 0);
      return vals.length ? (total / vals.length) : 0;
    });
    return {
      labels: subjects,
      datasets: [{
        label: 'Avg Marks per Subject',
        data: subjectAverages,
        backgroundColor: subjects.map(() => 'rgba(255,99,132,0.6)'),
        borderColor: subjects.map(() => 'rgba(255,99,132,1)'),
        borderWidth: 1,
      }]
    };
  }, [academicReports, subjects]);
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Students Grouped by Grade' },
    },
  };

  const academicChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Average Marks per Subject' },
    },
  };

  return (
    <div className="min-h-screen flex bg-[#000000] text-white">
      {/* Sidebar with added buttons and inline resource form */}
      <aside className="w-60 bg-[#1a1a1a] p-4 hidden md:block">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-[#ffd700]">School Logo</h2>
        </div>
        <nav className="space-y-4">
          <SidebarItem icon={<School />} label="Student Profiles" />
          <SidebarItem icon={<DashboardIcon />} label="Academic Records" />
          <SidebarItem icon={<Event />} label="Attendance" />
          <SidebarItem icon={<AccountCircle />} label="Extracurricular" />
          <SidebarItem icon={<BarChart />} label="Analytics" />
          <SidebarItem icon={<Settings />} label="Settings" />
        </nav>
        <div className="mt-6 space-y-2">
          <Button variant="contained" color="primary" fullWidth onClick={() => setPage('registration')}>
            Add Resource
          </Button>
          <Button variant="contained" color="secondary" fullWidth onClick={() => setPage('academic_report')}>
            Add Academic Report
          </Button>
          <form onSubmit={handleResourceSubmit} className="mt-4">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Academic Resource Name"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              InputProps={{ style: { background: '#fff' } }}
            />
            <Button type="submit" variant="contained" color="success" fullWidth className="mt-2">
              Submit Resource
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-[#1a1a1a] p-4">
          <div className="flex items-center">
            <IconButton className="md:hidden">
              <Menu className="text-[#ffd700]" />
            </IconButton>
            <h1 className="ml-2 text-xl font-bold">Student Hub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Tooltip title="Notifications">
              <IconButton>
                <Notifications className="text-[#ffd700]" />
              </IconButton>
            </Tooltip>
            <div className="flex items-center space-x-2">
              <Avatar src="https://via.placeholder.com/40" />
              <span>John Doe</span>
            </div>
            <Switch color="warning" />
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 flex-1 overflow-auto bg-[#121212]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContentCard title="Total Students" value={students.length} />
            <ContentCard title="Attendance Rate" value="98%" />
            <ContentCard title="GPA Average" value="3.8" />
            <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
              <Bar data={gradeData} options={chartOptions} />
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
              <Bar data={academicChartData} options={academicChartOptions} />
            </div>
          </div>
          <div className="mt-6">
            {students.map(student => (
              <div key={student.id} className="p-4 bg-[#1a1a1a] rounded-md mb-4">
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p>Grade: {student.grade && student.grade.label ? student.grade.label : 'Unknown'}</p>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => setPage('registration')}
                >
                  Edit Resource
                </Button>
              </div>
            ))}
          </div>
          {/* Optionally list academic reports */}
          <div className="mt-6">
            {academicReports.map((report, index) => (
              <div key={index} className="p-4 bg-[#1a1a1a] rounded-md mb-4">
                <h3 className="text-lg font-semibold">{report.studentName}</h3>
                <p>Academic Report Submitted</p>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => setPage('academic_report')}
                >
                  Edit Report
                </Button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-[#333] rounded-md cursor-pointer">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function ContentCard({ title, value }) {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[#ffd700]">{value}</p>
    </div>
  );
}

export default Dashboard;
