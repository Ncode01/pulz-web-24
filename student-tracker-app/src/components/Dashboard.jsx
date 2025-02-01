import React from 'react';
import StudentList from './StudentList';
import StudentForm from './StudentForm';

const Dashboard = () => {
    const students = useSelector((state) => state.students);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Student Tracking Dashboard</h1>
            <StudentForm />
            <StudentList students={students} />
        </div>
    );
};

export default Dashboard;