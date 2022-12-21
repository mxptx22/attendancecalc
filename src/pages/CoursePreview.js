import React from "react";
import { useEffect, useContext, useState } from "react";
import PageContext from "../PageContext";
import { IoMdExit } from "react-icons/io";
import { RiCalendarEventLine } from "react-icons/ri";
import { FiRepeat } from "react-icons/fi";

function CoursePreview() {
  // HERE Contexts
  // Single
  const { courses } = useContext(PageContext);
  const { selectedCourse } = useContext(PageContext);
  const { setScreenPosition } = useContext(PageContext);
  const { setScreen } = useContext(PageContext);

  // Duplets
  const { events, addEvents } = useContext(PageContext);

  // HERE Aux Functions
  const [thisCourse, setThisCourse] = useState({});
  const [courseEvents, setCourseEvents] = useState([]);
  const [newDate, setNewDate] = useState(null);

  // HERE Functions for localstorage manipulation
  function retrieveFromLocalStorage() {
    const retrievedEvents = JSON.parse(localStorage.getItem("savedEvents"));
    if (Array.isArray(retrievedEvents) && retrievedEvents.length > 0) {
      addEvents(retrievedEvents);
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("savedEvents", JSON.stringify(events));
  }

  useEffect(() => {
    retrieveFromLocalStorage();
    retrieveData();
  }, []);

  useEffect(() => {
    saveToLocalStorage();
    retrieveData();
  }, [events]);

  useEffect(() => {
    retrieveFromLocalStorage();
  }, [courses]);

  // HERE Functions for event manipulations relevant to course
  const retrieveData = () => {
    const retrievedCourseData = courses.find(
      (object) => object.courseId === selectedCourse
    );

    setThisCourse({
      id: retrievedCourseData.courseId,
      name: retrievedCourseData.name,
      colour: retrievedCourseData.colour,
    });

    const retrievedEventArray = events
      .filter((obj1) => obj1.courseId === selectedCourse)
      .map((obj2) => {
        return { ...obj2, date: new Date(obj2.date) };
      })
      .sort((a, b) => b.date - a.date);
    setCourseEvents(retrievedEventArray);
  };

  const addingNewDate = () => {
    if (newDate) {
      addEvents([
        ...events,
        {
          courseId: thisCourse.id,
          eventId: Math.floor(Math.random() * 1000000000),
          date: newDate,
          status: "Present",
        },
      ]);
    }

    retrieveData();
  };

  function deleteEvent(idToDelete) {
    addEvents(events.filter((item) => item.eventId !== idToDelete));
  }

  const markingAbsence = (course, eventExamined) => {
    // We are mapping through all events of all courses within Context
    const edited = events.map((obj) => {
      // We are addressing only the relevant event - only this one will be affected by change
      // Two conditions just to be on the safe side but technically courseId redundant here
      if (obj.courseId === course && obj.eventId === eventExamined) {
        // Switch - Make it absent or present depending on situation
        return obj.status === "Present"
          ? { ...obj, status: "Absent" }
          : { ...obj, status: "Present" };
      }
      return obj;
    });
    addEvents(edited);
  };

  const calculations = () => {
    // HERE Present
    const countingPresent = () => {
      const presentDates = courseEvents.filter(
        (object) =>
          object.courseId === selectedCourse && object.status === "Present"
      );
      const presentDatesNumber = presentDates.length;
      return presentDatesNumber;
    };

    // HERE Absent
    const countingAbsent = () => {
      const absentDates = courseEvents.filter(
        (object) =>
          object.courseId === selectedCourse && object.status === "Absent"
      );
      const absentDatesNumber = absentDates.length;
      return absentDatesNumber;
    };

    // HERE Total
    const countingTotal = () => {
      const totalDates = courseEvents.filter(
        (object) => object.courseId === selectedCourse
      );
      const totalDatesNumber = totalDates.length;
      return totalDatesNumber;
    };

    // HERE Percentage
    const countingPercentage = () => {
      if (countingTotal() !== 0) {
        return Math.round((countingPresent() / countingTotal()) * 100) + "%";
      } else {
        return "–%";
      }
    };

    return {
      presences: countingPresent(),
      absences: countingAbsent(),
      totals: countingTotal(),
      percentage: countingPercentage(),
    };
  };

  return (
    <div>
      <div
        id="header"
        className="w-full py-4 border-b mb-2 flex justify-between items-center"
        style={{ borderBottomColor: thisCourse.colour }}>
        <h1 id="part-1" className="text-3xl md:text-5xl">
          {thisCourse.name}
        </h1>
        <div id="part-2">
          <button
            onClick={() => {
              setScreen("One");
            }}
            className="yes-button yes-button-gray">
            <IoMdExit className="" />
          </button>
        </div>
      </div>

      <div
        id="controls"
        className="w-full flex flex-col md:flex-row gap-2 mb-4">
        <div class="inline-flex items-center rounded-md shadow-sm">
          <input
            type="date"
            onInput={(e) => setNewDate(new Date(e.target.value))}
            class="focus:outline-none text-gray-800 text-base bg-white
            hover:bg-gray-200 border border-gray-200 rounded-l-sm px-2 py-0.5
            inline-flex space-x-1 items-center w-full md:w-fit"></input>
          <button
            onClick={() => {
              addingNewDate();
            }}
            className="context-button w-fit">
            <RiCalendarEventLine className="inline-block" />
            <span className="uppercase font-thin text-base">Add Date</span>
          </button>
        </div>
        <button
          onClick={() => {
            setScreen("TwoNew");
            setScreenPosition("null");
          }}
          // to match inline-flex shadow...
          className="context-button shadow-sm ">
          <FiRepeat className="text-base inline-block" />
          <span className="uppercase font-thin text-base">Add Recurring</span>
        </button>
      </div>

      <div id="contents" className="flex gap-2 flex-col-reverse md:flex-row">
        {/* MEMO Idea: Stats & List - Icon + text in accent Colors */}
        <div id="list" className="w-full">
          <AttendanceList />
        </div>
        <div id="stats" className="w-full md:w-1/3">
          <AttendanceStats />
        </div>
      </div>
    </div>
  );

  // HERE Go Custom Screens
  function AttendanceList() {
    return (
      <div className="mt-8 flex flex-wrap w-full justify-between gap-2 md:gap-6 md:justify-start">
        {courseEvents.map(({ courseId, date, status, eventId }) => (
          <div className="max-w-[45%] w-28 ">
            <div
              // Here is the entry
              onClick={() => markingAbsence(courseId, eventId)}
              className="text-center p-1 rounded-sm transition-all duration-1000 cursor-pointer border shadow-sm"
              style={{
                backgroundColor:
                  status != "Present" ? "lightcoral" : "palegreen",
                borderColor: status != "Present" ? "crimson" : "green",
              }}>
              <div className="font-semibold text-gray-800 font-medium">
                {new Date(date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="pt-5 uppercase text-gray-700 text-xs font-light tracking-widest">
                {status}
              </div>
            </div>
            <div
              // Here is the deletion button
              className="w-full flex justify-center cursor-pointer pb-3"
              onClick={() => {
                deleteEvent(eventId);
              }}>
              <div className="border border-gray-300 border-t-0 py-1 w-8 text-center rounded-b-md bg-gray-200">
                ✖
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function AttendanceStats() {
    const textColorStyle = { color: thisCourse.colour };
    const bgColorStyle = { backgroundColor: thisCourse.colour };

    return (
      <div className="w-full flex items-center md:items-start flex-col gap-4 mt-3 md:mt-0">
        {/* HERE Percentage */}
        <div
          id="percentage"
          style={textColorStyle}
          className="text-5xl md:text-7xl font-semibold md:pl-1">
          {calculations().percentage}
        </div>
        <div class="flex w-full justify-between md:gap-3 md:flex-col md:items-start">
          {/* HERE Present */}
          <div
            id="present"
            className="flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center">
            <div
              style={bgColorStyle}
              className="text- flex items-center justify-center w-7 aspect-square whitespace-nowrap overflow-hidden">
              <div>{calculations().presences}</div>
            </div>
            <div className="uppercase font-thin tracking-wider text-gray-400 text-xs md:text-lg">
              In Class
            </div>
          </div>
          {/* HERE Absent */}
          <div
            id="absent"
            className="flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center">
            <div
              style={bgColorStyle}
              className="text- flex items-center justify-center w-7 aspect-square whitespace-nowrap overflow-hidden">
              <div>{calculations().absences}</div>
            </div>
            <div className="uppercase font-thin tracking-wider text-gray-400 text-xs md:text-lg">
              Absences
            </div>
          </div>
          {/* HERE Total */}
          <div
            id="absent"
            className="flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center">
            <div
              style={bgColorStyle}
              className="text- flex items-center justify-center w-7 aspect-square whitespace-nowrap overflow-hidden">
              <div>{calculations().totals}</div>
            </div>
            <div className="uppercase font-thin tracking-wider text-gray-400 text-xs md:text-lg">
              Total
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CoursePreview;
