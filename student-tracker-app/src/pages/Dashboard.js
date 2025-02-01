import React from 'react';
import { 
  Menu, 
  Dashboard as DashboardIcon, // renamed imported icon
  School, 
  BarChart, 
  Event, 
  Settings, 
  Notifications, 
  AccountCircle 
} from '@mui/icons-material';
import { IconButton, Avatar, Tooltip, Switch } from '@mui/material';

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-[#000000] text-white">
      {/* Sidebar */}
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
            <ContentCard title="Total Students" value="1,234" />
            <ContentCard title="Attendance Rate" value="98%" />
            <ContentCard title="GPA Average" value="3.8" />
            {/* Placeholder for Chart */}
            <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-semibold mb-2">Analytics Overview</h3>
              <div className="h-64 flex items-center justify-center text-[#666]">
                {/* Replace with a chart component (e.g., Chart.js) */}
                [Chart Placeholder]
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// SidebarItem component
function SidebarItem({ icon, label }) {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-[#333] rounded-md cursor-pointer">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

// Updated ContentCard component
function ContentCard({ title, value }) {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-2xl font-bold text-[#ffd700]">{value}</p>
    </div>
  );
}

export default Dashboard;
