import React from 'react';

const TableView = ({ accidentData }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Time</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {accidentData.map(accident => (
          <tr key={accident.id}>
            <td>{accident.time}</td>
            <td>{accident.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
