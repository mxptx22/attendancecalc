import React, { useContext, useEffect, useState } from "react";
import PageContext from "../PageContext";

import { BiPaint } from "react-icons/bi";
import {
  MdOutlineCancelPresentation,
  MdOutlineDoneOutline,
} from "react-icons/md";
import { IoMdExit } from "react-icons/io";

function NewCourse({ activities }) {
  const { screen, setScreen } = useContext(PageContext);
  const { screenPosition, setScreenPosition } = useContext(PageContext);
  const { courses, addCourses } = useContext(PageContext);
  const [newCourse, setNewCourse] = useState("");
  const [newCourseColour, setNewCourseColour] = useState("");
  const [newCourseId, setNewCourseId] = useState();
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
    generateColour();
    generateCourseId();
    localStorage.setItem("savedCourses", JSON.stringify(courses));
  }, []);

  const addingNewCourse = () => {
    if (newCourse !== "") {
      addCourses((otherCourses) => [
        ...otherCourses,
        { courseId: newCourseId, name: newCourse, colour: newCourseColour },
      ]);
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

  const generateCourseId = () => {
    const generatedCourseId = Math.floor(Math.random() * 10000000);
    setNewCourseId(generatedCourseId);
  };

  return (
    <div>
      <div
        id="main-header-container"
        className="flex justify-between items-center border-b py-3">
        <div id="part-1" className="flex flex-col gap-1 justify-center">
          <div className="px-2 py-0.5 box-content">
            <h1>
              Create <span class="mobile-adjusted">Course</span>
            </h1>
          </div>
          <div class="pl-1 flex gap-2">
            <button
              onClick={() => {
                addingNewCourse();
              }}
              className="subheader-button subheader-button-green">
              <MdOutlineDoneOutline />
              <span>Save</span>
            </button>
            <button
              onClick={() => {
                generateColour();
              }}
              className="subheader-button subheader-button-gray">
              <BiPaint className="text-lg" />
              <span className="uppercase font-light text-sm">
                <span className="mobile-adjusted">Change</span> Colour
              </span>
            </button>
          </div>
        </div>
        <div id="part-2">
          <button
            onClick={() => {
              activities.return();
            }}
            className="yes-button yes-button-gray">
            <IoMdExit className="" />
          </button>
        </div>
      </div>

      <div>
        <input
          className="input-bar min-h-[40px] text-4xl w-full border-0 rounded-sm mt-4"
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
