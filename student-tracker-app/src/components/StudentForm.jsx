import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent } from '../redux/studentSlice';

const StudentForm = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [grade, setGrade] = useState('');
    const [achievements, setAchievements] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
            id: Date.now(),
            name,
            age,
            grade,
            achievements: achievements.split(',').map(ach => ach.trim()),
        };
        dispatch(addStudent(newStudent));
        setName('');
        setAge('');
        setGrade('');
        setAchievements('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-2">
                <label className="block text-gray-700">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Age</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Grade</label>
                <input
                    type="text"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-gray-700">Achievements (comma separated)</label>
                <input
                    type="text"
                    value={achievements}
                    onChange={(e) => setAchievements(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
                Add Student
            </button>
        </form>
    );
};

export default StudentForm;