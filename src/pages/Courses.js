import React, { useState } from "react";
import { useEffect } from "react";
import { useRef, useContext } from "react";
import PageContext from "../PageContext";

import { RiSave2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";

function Courses() {
  const [savingSliderDefault, setSavingSliderDefault] = useState("start");
  const { screenPosition, setScreenPosition } = useContext(PageContext);
  const { screen, setScreen } = useContext(PageContext);
  const { courses, addCourses } = useContext(PageContext);
  const { selectedCourse, setSelectedCourse } = useContext(PageContext);
  const { savingStatus, setSavingStatus } = useContext(PageContext);

  const saveToggle = useRef();

  function savingforLater() {
    if (savingSliderDefault === "start") {
      setSavingSliderDefault("end");
      saveToggle.current.checked = true;
      setSavingStatus("yas");
      determineSaving("yas");
      console.log("i ran saving for later");
    } else {
      setSavingSliderDefault("start");
      saveToggle.current.checked = false;
      setSavingStatus("nay");
      localStorage.clear();
      console.log("i abstained from saving for later");
    }
  }

  function determineSaving(switcher) {
    if (switcher === "yas") {
      localStorage.setItem("saving", "yas");
    }
    if (switcher === "yas" && courses.length > 0) {
      saveCourse();
    }
    if (switcher === "nay") {
      localStorage.setItem("saving", "nay");
    }
  }

  function processSaving() {
    if (localStorage.getItem("saving") !== "yas") {
      console.log("no course shall pass");
    } else {
      savingforLater();
      console.log("i ran process saving");
      const retrievedCourses = JSON.parse(localStorage.getItem("savedCourses"));

      if (retrievedCourses !== null && courses.length === 0) {
        addCourses(retrievedCourses);
        console.log(
          "i even ran adding courses from saved courses in localStorage"
        );
      }
    }
  }

  function saveCourse() {
    localStorage.setItem("savedCourses", JSON.stringify(courses));
    console.log("i saved a course with savecourse");
  }

  useEffect(() => {
    processSaving();
    console.log("processSaving was run on Effect");
  }, []);

  useEffect(() => {
    if (courses.length !== 0) {
      if (savingStatus !== "yas") {
        console.log("there will be no saving with saveCourse");
        localStorage.clear();
        // here is new
      } else {
        console.log(
          "since you want saving, I added and ran savecourse into localStorage"
        );
        saveCourse();
      }
    }
  }, [courses]);

  function deleteCourse(idToDelete) {
    addCourses(courses.filter((item) => item.courseId !== idToDelete));
    if (courses.length === 1) {
      localStorage.removeItem("savedCourses");
    }
  }

  return (
    <div>
      <div
        id="main-header-container"
        className="flex justify-between items-center border-b py-3">
        <div id="part-1" className="flex flex-col gap-1 justify-center">
          <div className="px-2 py-0.5 box-content">
            <h1 className="text-4xl uppercase font-thin text-gray-400">
              Your Courses
            </h1>
          </div>
          <div class="pl-1">
            <button
              onClick={() => {
                setScreenPosition("null");
                setScreen("OneNew");
              }}
              className="focus:outline-none text-white bg-emerald-600 shadow-sm shadow-emerald-400 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-sm px-1.5 py-1 w-fit flex gap-1 items-center justify-center">
              <IoMdAdd className="text-xl" />
              <span className="uppercase font-light text-sm">Add</span>
            </button>
          </div>
        </div>
        <div id="part-2">
          <label class="inline-flex relative items-center cursor-pointer">
            <input
              ref={saveToggle}
              onClick={() => {
                savingforLater();
              }}
              type="checkbox"
              class="sr-only peer"
            />
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-2xl font-medium text-gray-900">
              <RiSave2Line />
            </span>
          </label>
        </div>
      </div>

      {/* <div className="configBar">
        <button
          onClick={() => {
            setScreenPosition("null");
            setScreen("OneNew");
          }}
          className="configBarItem configButton"
          style={{ backgroundColor: "lightseagreen" }}>
          Add
        </button>
        <div className="configDesc">Save for Later</div>
        <div
          onClick={() => {
            savingforLater();
          }}
          className="configBarItem sliderBar"
          style={{ justifyContent: savingSliderDefault }}>
          <div className="sliderButton" ref={coursesCongifBar}></div>
        </div>
      </div> */}
      <div
        id="courses-container"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6">
        {courses.map(({ name, colour, courseId }) => (
          <div
            className="relative course-card border-t-[2rem] rounded-md py-2 px-3 overflow-hidden bg-white border border-gray-300 shadow-sm"
            style={{
              borderTopColor: colour,
              color: colour,
            }}>
            <div
              onClick={() => {
                setScreen("Two");
                setSelectedCourse(courseId);
              }}
              className="cursor-pointer w-full py-6 text-5xl font-semibold relative">
              {name}
            </div>
            <div className="flex w-full justify-end">
              <div class="inline-flex items-center rounded-md shadow-sm">
                <button
                  onClick={() => {
                    setScreenPosition("null");
                    setScreen("OneEdit");
                    setSelectedCourse(courseId);
                  }}
                  class="text-gray-800 hover:text-blue-600 text-sm bg-white hover:bg-blue-100 border border-gray-200 rounded-l-sm px-2 py-1 inline-flex space-x-1 items-center">
                  <MdOutlineEditNote className="text-lg inline-block" />
                  <span className="uppercase font-thin text-sm">Edit</span>
                </button>

                <button
                  onClick={() => {
                    deleteCourse(courseId);
                  }}
                  class="text-gray-800 hover:text-rose-600 text-sm bg-white hover:bg-rose-100 border border-gray-200 rounded-r-sm px-2 py-1 inline-flex space-x-1 items-center">
                  <MdDeleteForever className="text-lg inline-block" />
                  <span className="uppercase font-thin text-sm">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
