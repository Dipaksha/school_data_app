import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function SchoolData() {
  const [schoolData, setSchoolData] = useState([
    {
      Class1: [
        { id: 1, name: "CCCC", roll_no: 1 },
        { id: 2, name: "DDDDDD", roll_no: 2 },
        { id: 3, name: "EEE", roll_no: 3 },
        { id: 4, name: "AAAAA", roll_no: 4 },
        { id: 5, name: "BBBBB", roll_no: 5 },
      ],
      id: "Class1",
    },
    {
      Class2: [
        { id: 1, name: "CCCC22222", roll_no: 1 },
        { id: 2, name: "DDDDDD2222", roll_no: 2 },
        { id: 5, name: "BBBBB2222", roll_no: 5 },
      ],
      id: "Class2",
    },
    {
      Class3: [
        { id: 1, name: "CCCC33333", roll_no: 1 },
        { id: 2, name: "DDDDDD3333", roll_no: 2 },
        { id: 3, name: "EEE3333", roll_no: 3 },
        { id: 4, name: "AAAAA3333", roll_no: 4 },
      ],
      id: "Class3",
    },
    {
      Class4: [
        { id: 1, name: "CCCC44444", roll_no: 1 },
        { id: 2, name: "DDDDDD4444", roll_no: 2 },
      ],
      id: "Class4",
    },
    {
      Class5: [
        { id: 1, name: "CCCC55555", roll_no: 1 },
        { id: 2, name: "DDDDDD55555", roll_no: 2 },
        { id: 3, name: "EEE5555", roll_no: 3 },
        { id: 4, name: "AAAAA355555", roll_no: 4 },
        { id: 4, name: "BBBBB66666", roll_no: 5 },
        { id: 4, name: "QQQQQQQ66666", roll_no: 6 },
      ],
      id: "Class5",
    },
    {
      Class6: [
        { id: 1, name: "CCCC6666", roll_no: 1 },
        { id: 2, name: "DDDDDD6666", roll_no: 2 },
        { id: 3, name: "EEE666666", roll_no: 3 },
        { id: 4, name: "AAAA66666", roll_no: 4 },
        { id: 4, name: "BBBBB66666", roll_no: 6 },
        { id: 4, name: "QQQQQQ66666", roll_no: 8 },
        { id: 4, name: "RRRRRRR66666", roll_no: 9 },
      ],
      id: "Class6",
    },
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dragStart = (_, position) => {
    dragItem.current = position;
  };

  const dragEnter = (_, position) => {
    dragOverItem.current = position;
  };
  const drop = () => {
    const copyListItems = [...schoolData];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setSchoolData(copyListItems);
  };

  const isAllChecked = (selectedArray) => {
    const allStudentChecked = selectedArray.every(
      (student) => student.isChecked === true
    );
    return allStudentChecked;
  };
  const handleCheckStudent = (e, id, selectedArray) => {
    const { checked } = e.target;
    const tempSchoolArray = [...schoolData];
    selectedArray.map((student) => {
      if (id === "allSelected") {
        setSelectAll(checked);
        student.isChecked = checked;
      } else {
        if (student.id === id) {
          student.isChecked = checked;
        }
      }
      return student;
    });
    setSchoolData([...tempSchoolArray]);
  };

  const handleExpandMoreOrLess = (selectedClassID) => {
    const tempSchoolArray = [...schoolData];
    tempSchoolArray.map((class_) => {
      if (class_.id === selectedClassID) {
        class_.isExpanded = !class_.isExpanded;
      }
      return class_;
    });
    setSchoolData(tempSchoolArray);
  };

  return (
    <div style={{ margin: "2%" }}>
      <table
        style={{
          border: "2px solid green",
          padding: "2%",
          fontFamily: "arial",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "20%" }}></th>
            <th style={{ width: "20%" }}>Checkbox</th>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "20%" }}>No. of Students in Class</th>
          </tr>
        </thead>
      </table>
      <div
        style={{
          border: "2px solid green",
        }}
      >
        {schoolData &&
          schoolData.map((class_, index) => (
            <div
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              key={index}
              draggable
            >
              <table
                style={{
                  textAlign: "center",
                  border: "2px solid green",
                  margin: "2%",
                  fontFamily: "arial",
                  borderCollapse: "collapse",
                  width: "96%",
                  backgroundColor: "lightblue",
                }}
                key={index}
              >
                <thead>
                  <tr key={index}>
                    <th style={{ width: "20%", padding: "1%" }}>
                      {
                        <button
                          onClick={() => {
                            handleExpandMoreOrLess(class_.id, index);
                          }}
                        >
                          {class_.isExpanded ? <RemoveIcon /> : <AddIcon />}
                        </button>
                      }
                    </th>
                    <th style={{ width: "20%" }}>
                      <input
                        type="checkbox"
                        checked={isAllChecked(Object.values(class_)[0])}
                        onChange={(e) =>
                          handleCheckStudent(
                            e,
                            "allSelected",
                            Object.values(class_)[0]
                          )
                        }
                      />
                    </th>
                    <th style={{ width: "20%" }}>{class_.id.toUpperCase()}</th>
                    <th style={{ width: "20%", padding: "1%" }}></th>
                    <th style={{ width: "20%" }}>
                      {Object.values(class_)[0].length}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {class_.isExpanded && (
                    <>
                      {Object.values(class_)[0].map((student, i) => {
                        return (
                          <tr
                            style={{
                              textAlign: "center",
                              backgroundColor: "lightgray",
                            }}
                            key={i}
                          >
                            <td></td>
                            <td>
                              <label>Sr. No:{i + 1}</label>
                              <input
                                type="checkbox"
                                checked={student?.isChecked}
                                onChange={(e) =>
                                  handleCheckStudent(
                                    e,
                                    student.id,
                                    Object.values(class_)[0]
                                  )
                                }
                              />
                            </td>
                            <td>Student Name:{student.name}</td>
                            <td></td>
                            <td>RollNO:{student.roll_no}</td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
