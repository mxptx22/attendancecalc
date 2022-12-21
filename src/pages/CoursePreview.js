import React from "react";
import { useRef, useEffect, useContext, useState } from "react";
import PageContext from "../PageContext";
import { IoMdExit } from "react-icons/io";
import { RiCalendarEventLine } from "react-icons/ri";
import { FiRepeat } from "react-icons/fi";

function CoursePreview() {
  const { screen, setScreen } = useContext(PageContext);
  const { courses, addCourses } = useContext(PageContext);
  const [newCourse, setNewCourse] = useState("");
  const [newCourseColour, setNewCourseColour] = useState("");
  const [newCourseId, setNewCourseId] = useState();
  const { selectedCourse, setSelectedCourse } = useContext(PageContext);
  const { events, addEvents } = useContext(PageContext);
  const [courseEvents, setCourseEvents] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [courseDates, setCourseDates] = useState([]);
  const { screenPosition, setScreenPosition } = useContext(PageContext);

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

  useEffect(() => {}, [screen]);

  const retrieveData = () => {
    const retrievedDataArray = courses.filter(
      (object) => object.courseId === selectedCourse
    );
    setNewCourseColour(retrievedDataArray[0].colour);
    setNewCourseId(retrievedDataArray[0].courseId);
    setNewCourse(retrievedDataArray[0].name);
    const retrievedEventArray = events
      .filter((object) => object.courseId === selectedCourse)
      .sort((a, b) => b.date.localeCompare(a.date));
    setCourseEvents(retrievedEventArray);
  };

  function retrieveFromLocalStorage() {
    const retrievedEvents = JSON.parse(localStorage.getItem("savedEvents"));
    if (retrievedEvents !== null) {
      if (retrievedEvents.length !== 0) {
        addEvents(retrievedEvents);
      }
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem("savedEvents", JSON.stringify(events));
  }

  const addingNewDate = () => {
    if (newDate !== "") {
      addEvents((otherCourseDates) => [
        ...otherCourseDates,
        {
          courseId: newCourseId,
          eventId: Math.floor(Math.random() * 1000000000),
          date: newDate,
          status: "Present",
        },
      ]);
    }
    retrieveData();
  };

  const markingAbsence = (course, eventExamined) => {
    const edited = events.map((obj) => {
      if (obj.courseId === course && obj.eventId === eventExamined) {
        if (obj.status === "Present") {
          return { ...obj, status: "Absent" };
        } else {
          return { ...obj, status: "Present" };
        }
      }
      return obj;
    });
    addEvents(edited);
  };

  const countingPresent = () => {
    const presentDates = courseEvents.filter(
      (object) =>
        object.courseId === selectedCourse && object.status === "Present"
    );
    const presentDatesNumber = presentDates.length;
    return presentDatesNumber;
  };

  const countingAbsent = () => {
    const absentDates = courseEvents.filter(
      (object) =>
        object.courseId === selectedCourse && object.status === "Absent"
    );
    const absentDatesNumber = absentDates.length;
    return absentDatesNumber;
  };

  const countingTotal = () => {
    const totalDates = courseEvents.filter(
      (object) => object.courseId === selectedCourse
    );
    const totalDatesNumber = totalDates.length;
    return totalDatesNumber;
  };

  const countingAttendance = () => {
    if (countingTotal() !== 0) {
      return Math.round((countingPresent() / countingTotal()) * 100) + "%";
    } else {
      return "–%";
    }
  };

  function deleteEvent(idToDelete) {
    addEvents(events.filter((item) => item.eventId !== idToDelete));
  }

  return (
    <div>
      <div
        id="header"
        className="w-full py-4 border-b mb-2 flex justify-between items-center"
        style={{ borderBottomColor: newCourseColour }}>
        <h1 id="part-1" className="text-3xl md:text-5xl">
          {newCourse}
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
            onInput={(e) => setNewDate(e.target.value)}
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
        {/* FIXME Stats & List - Icon + text in accent Colors */}
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
      <div className="recordsContainer">
        {courseEvents.map(({ courseId, date, status, eventId }) => (
          <div>
            <div
              className="recordCard"
              style={{
                backgroundColor:
                  status != "Present" ? "lightcoral" : "palegreen",
              }}>
              <div onClick={() => markingAbsence(courseId, eventId)}>
                <div>
                  <b>{date}</b>
                </div>
                <div>___</div>
                <div>{status}</div>
              </div>
            </div>
            <div
              className="recordCard"
              style={{ marginTop: "10px", backgroundColor: "gainsboro" }}
              onClick={() => {
                deleteEvent(eventId);
              }}>
              ✖
            </div>
          </div>
        ))}
      </div>
    );
  }

  function AttendanceStats() {
    const textColorStyle = { color: newCourseColour };
    const bgColorStyle = { backgroundColor: newCourseColour };

    return (
      <div className="w-full flex items-center md:items-start flex-col gap-4 mt-3 md:mt-0">
        {/* HERE Percentage */}
        <div
          id="percentage"
          style={textColorStyle}
          className="text-5xl md:text-7xl font-semibold md:pl-1">
          {countingAttendance()}
        </div>
        <div class="flex w-full justify-between md:gap-3 md:flex-col md:items-start">
          {/* HERE Present */}
          <div
            id="present"
            className="flex flex-col md:flex-row gap-3 items-center md:items-start md:justify-center">
            <div
              style={bgColorStyle}
              className="text- flex items-center justify-center w-7 aspect-square whitespace-nowrap overflow-hidden">
              <div>{countingPresent()}</div>
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
              <div>{countingAbsent()}</div>
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
              <div>{countingTotal()}</div>
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
