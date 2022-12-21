import React, { useState } from "react";
import { useEffect } from "react";
import { useRef, useContext } from "react";
import PageContext from "../PageContext";

import { RiSave2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever, MdOutlineEditNote } from "react-icons/md";

function Courses() {
  // HERE Contexts
  // Single
  const { setScreenPosition } = useContext(PageContext);
  const { setScreen } = useContext(PageContext);
  const { setSelectedCourse } = useContext(PageContext);
  // Duplets
  const { courses, addCourses } = useContext(PageContext);
  const { savingStatus, setSavingStatus } = useContext(PageContext);

  // HERE Aux Functions
  const saveToggle = useRef();

  // Permissibility regards localstorage (LS) saving - consent to saving data in LS API

  // Permissibility - First Run -> Upon Launch of Component
  useEffect(() => {
    // [1] Determining first - from LS itself - if LS even permissible
    if (localStorage.getItem("saving") === "yas") {
      setSavingStatus("yas");
      saveToggle.current.checked = true;
      let retrievedCourses = JSON.parse(localStorage.getItem("savedCourses"));

      // [2] If so, whether to load anything from LS on first run
      // Solange there's some to load (!null) and state hasn't received any just yet (length?)
      retrievedCourses !== null &&
        courses.length == 0 &&
        addCourses(retrievedCourses);
    }
  }, []);

  // [L ONLY] Permissibility - Local Level Toggle
  function optinToggle() {
    if (savingStatus == "nay") {
      localStorage.setItem("saving", "yas");
      setSavingStatus("yas");
      courses.length > 0 && saveCourseLS();
      saveToggle.current.checked = true;
    } else {
      localStorage.clear();
      setSavingStatus("nay");
      saveToggle.current.checked = false;
    }
  }

  // [LS ONLY] Permissibility & Content Management - LocalStorage Level
  useEffect(() => {
    // EACH CHANGE IN COURSES - If there are some courses (not 0) & you want (not) them saved locally >>
    if (courses.length !== 0) {
      savingStatus !== "yas" ? localStorage.clear() : saveCourseLS();
    }
  }, [courses, savingStatus]);

  function saveCourseLS() {
    // Instance of Saving Courses in Local Storage - cs. addCourses which adds them locally without determination re localstorage
    localStorage.setItem("savedCourses", JSON.stringify(courses));
  }

  // [L + LS] Content Management
  function deleteCourse(idToDelete) {
    // FIXME Think about filtering course events as well to limit the volume of redundant data
    // [L ONLY] Instance of Removing Course on local level -> Will be reflected in LS w/ useEffect
    addCourses(courses.filter((item) => item.courseId !== idToDelete));
    // [LS ONLY] I made it so w/ useEffect that you need at least 1 course for it to engage if (courses.length !== 0) - don't know why but yeah - this is a clearfix for it
    courses.length === 1 && localStorage.removeItem("savedCourses");
  }

  return (
    <div>
      <div
        id="main-header-container"
        className="flex justify-between items-center border-b py-3">
        <div id="part-1" className="flex flex-col gap-1 justify-center">
          <div className="px-2 py-0.5 box-content">
            <h1>
              <span class="mobile-adjusted">Your</span> Courses
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
                optinToggle();
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
