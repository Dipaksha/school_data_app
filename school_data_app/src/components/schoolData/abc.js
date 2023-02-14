import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SchoolData() {
  const [studentList, setStudentList] = useState([
    { id: 1, name: "CCCC", roll_no: 1 },
    { id: 2, name: "DDDDDD", roll_no: 2 },
    { id: 3, name: "EEE", roll_no: 3 },
    { id: 4, name: "AAAAA", roll_no: 4 },
    { id: 5, name: "BBBBB", roll_no: 5 },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckStudent = (e, id) => {
    const tempStudentData = [...studentList];
    const { checked } = e.target;
    tempStudentData.map((student) => {
      if (id === "allSelected") {
        setSelectAll(checked);
        student.isChecked = checked;
      } else {
        if (student.id === id) {
          student.isChecked = checked;
        }
        const isAllChecked = tempStudentData.every(
          (student) => student.isChecked === true
        );
        if (isAllChecked) {
          setSelectAll(checked);
        } else {
          setSelectAll(false);
        }
      }
      return student;
    });

    setStudentList([...tempStudentData]);
  };
  const handleExpandMoreOrLess = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ margin: "2%", textAlign: "center" }}>
      <h2>School</h2>
      <table
        style={{
          border: "2px solid",
          padding: "2%",
          fontFamily: "arial",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <tr>
          <th style={{ width: "20%" }}></th>
          <th style={{ width: "20%" }}>Checkbox</th>
          <th style={{ width: "20%" }}>Name</th>
          <th>No. of Students</th>
        </tr>
      </table>
      <table
        style={{
          border: "2px solid",
          padding: "2%",
          fontFamily: "arial",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <tr>
          <th>
            {
              <button onClick={handleExpandMoreOrLess}>
                {isExpanded ? <RemoveIcon /> : <AddIcon />}
              </button>
            }
          </th>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => handleCheckStudent(e, "allSelected")}
            />
          </th>
          <th>1st Class</th>
          <th>{studentList.length}</th>
        </tr>
        {isExpanded && (
          <>
            {studentList.map((item, index) => {
              return (
                <tr>
                  <td>
                    <label>Checkbox</label>
                    <input
                      type="checkbox"
                      checked={item?.isChecked}
                      onChange={(e) => handleCheckStudent(e, item.id)}
                    />
                  </td>
                  <td>Student Name:{item.name}</td>
                  <td></td>
                  <td>RollNO:{item.roll_no}</td>
                </tr>
              );
            })}
          </>
        )}
      </table>
    </div>
  );
}
