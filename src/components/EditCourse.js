import React, { useContext, useEffect, useState } from "react";
import PageContext from "../PageContext";

import { BiPaint } from "react-icons/bi";
import {
  MdOutlineCancelPresentation,
  MdOutlineDoneOutline,
} from "react-icons/md";

function NewCourse({ activities }) {
  const { screen, setScreen } = useContext(PageContext);
  const { screenPosition, setScreenPosition } = useContext(PageContext);
  const { courses, addCourses } = useContext(PageContext);
  const [newCourse, setNewCourse] = useState("");
  const [newCourseColour, setNewCourseColour] = useState("");
  const [newCourseId, setNewCourseId] = useState();
  const { selectedCourse, setSelectedCourse } = useContext(PageContext);
  const availableColours = [
    "crimson",
    "springgreen",
    "lightpink",
    "lightskyblue",
    "blanchedalmond",
    "lightsalmon",
    "palevioletred",
    "thistle",
    "dodgerblue",
    "yellowgreen",
    "paleturquoise",
    "lightgreen",
  ];

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = () => {
    const retrievedDataArray = courses.filter(
      (object) => object.courseId === selectedCourse
    );
    setNewCourseColour(retrievedDataArray[0].colour);
    setNewCourseId(retrievedDataArray[0].courseId);
    setNewCourse(retrievedDataArray[0].name);
  };

  const editingCourse = () => {
    if (newCourse !== "") {
      const edited = courses.map((obj) => {
        if (obj.courseId === selectedCourse) {
          return { ...obj, name: newCourse, colour: newCourseColour };
        }
        return obj;
      });
      addCourses(edited);
      console.log(courses);
      setScreen("One");
      setScreenPosition("full");
    } else {
      alert("⚠️ You must give it a name.");
    }
  };

  const generateColour = () => {
    const length = availableColours.length;
    const colourIndex = Math.floor(Math.random() * length);
    setNewCourseColour(availableColours[colourIndex]);
  };

  return (
    <div>
      <div
        id="main-header-container"
        className="flex justify-between items-center border-b py-3">
        <div id="part-1" className="flex flex-col gap-1 justify-center">
          <div className="px-2 py-0.5 box-content">
            <h1 className="text-4xl uppercase font-thin text-gray-400">
              Editing Course
            </h1>
          </div>
          <div class="pl-1 flex gap-2">
            {/* Change of Paint + Discard */}
            <button
              onClick={() => {
                generateColour();
              }}
              className="focus:outline-none text-gray-800 bg-gray-200 shadow-sm shadow-gray-300 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm px-1.5 py-1 w-fit flex gap-1 items-center justify-center">
              <BiPaint className="text-lg" />
              <span className="uppercase font-light text-sm">
                Change Colour
              </span>
            </button>
            <button
              onClick={() => {
                activities.return();
              }}
              className="focus:outline-none text-gray-800 bg-gray-200 shadow-sm shadow-gray-300 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm px-1.5 py-1 w-fit flex gap-2 items-center justify-center">
              <MdOutlineCancelPresentation className="text-lg" />
              <span className="uppercase font-light text-sm">Discard</span>
            </button>
          </div>
        </div>
        <div id="part-2">
          <button
            onClick={() => {
              editingCourse();
            }}
            className="focus:outline-none text-white bg-emerald-600 shadow-sm shadow-emerald-400 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm p-3 w-fit flex gap-1 items-center justify-center">
            <MdOutlineDoneOutline className="text-2xl" />
          </button>
        </div>
      </div>
      <div>
        <input
          className="input-bar min-h-[40px] text-4xl w-full border-0 rounded-sm mt-4"
          value={newCourse}
          style={{
            borderBottom: "10px solid",
            borderBottomColor: newCourseColour,
          }}
          minLength="1"
          onInput={(e) => setNewCourse(e.target.value)}></input>
      </div>
    </div>
  );
}

export default NewCourse;
