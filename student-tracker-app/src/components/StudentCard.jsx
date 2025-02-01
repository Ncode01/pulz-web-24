import React from 'react';

const StudentCard = ({ student }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 m-2">
            <h2 className="text-xl font-bold">{student.name}</h2>
            <p className="text-gray-700">Age: {student.age}</p>
            <p className="text-gray-700">Grade: {student.grade}</p>
            <h3 className="text-lg font-semibold">Achievements:</h3>
            <ul className="list-disc list-inside">
                {student.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-600">{achievement}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudentCard;