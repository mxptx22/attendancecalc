import React, { useContext, useEffect, useState } from "react";
import PageContext from "../PageContext";

import { BiPaint } from "react-icons/bi";
import { MdOutlineDoneOutline } from "react-icons/md";
import { IoMdExit } from "react-icons/io";

function NewCourse({ activities }) {
  // HERE Contexts
  // Single
  const { setScreen } = useContext(PageContext);
  const { setScreenPosition } = useContext(PageContext);

  // Duplets
  const { courses, addCourses } = useContext(PageContext);

  // HERE Aux Functions
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

  const randomizer = {
    randomColour: (spontaneous) => {
      const length = availableColours.length;
      const colourIndex = Math.floor(Math.random() * length);
      if (spontaneous) {
        setNewCourseData({
          ...newCourseData,
          colour: availableColours[colourIndex],
        });
      }
      return availableColours[colourIndex];
    },
    randomId: () => {
      return Math.floor(Math.random() * 10000000);
    },
  };

  const [newCourseData, setNewCourseData] = useState({
    name: "",
    colour: randomizer.randomColour(false),
    id: randomizer.randomId(),
  });

  useEffect(() => {
    // FIXME Make it contingent on saving preferences
    localStorage.setItem("savedCourses", JSON.stringify(courses));
  }, [newCourseData]);

  const addingNewCourse = () => {
    if (newCourseData.name.length > 0) {
      addCourses((otherCourses) => [
        ...otherCourses,
        {
          courseId: newCourseData.id,
          name: newCourseData.name,
          colour: newCourseData.colour,
        },
      ]);
      setScreen("One");
      setScreenPosition("full");
    } else {
      alert("⚠️ You must give it a name.");
    }
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
                randomizer.randomColour(true);
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
            borderBottomColor: newCourseData.colour,
          }}
          minLength="1"
          onInput={(e) =>
            setNewCourseData({ ...newCourseData, name: e.target.value })
          }></input>
      </div>
    </div>
  );
}

export default NewCourse;
