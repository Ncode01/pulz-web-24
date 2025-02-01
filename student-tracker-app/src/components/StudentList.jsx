import React from 'react';
import { useSelector } from 'react-redux';
import StudentCard from './StudentCard';

const StudentList = () => {
    const students = useSelector((state) => state.students);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students.map((student) => (
                <StudentCard key={student.id} student={student} />
            ))}
        </div>
    );
};

export default StudentList;