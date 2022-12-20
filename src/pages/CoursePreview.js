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

  function testingPrinter() {
    // console.log(events)
    // console.log(courseEvents)
    // console.log(newDate)
    // console.log('Present Days',countingPresent())
    // console.log('Absent Days',countingAbsent())
    // console.log('Total Days',countingTotal())
    // console.log('Total Days',countingAttendance())
    console.log(events.sort((a, b) => a.date.localeCompare(b.date)));
  }

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
    }
  };

  function deleteEvent(idToDelete) {
    addEvents(events.filter((item) => item.eventId !== idToDelete));
  }

  return (
    <div>
      <div
        className="w-full py-4 border-b mb-2 flex justify-between items-center"
        style={{ borderBottomColor: newCourseColour }}>
        <div id="part-1" className="text-5xl uppercase font-thin text-gray-400">
          {newCourse}
        </div>
        <div id="part-2">
          {" "}
          <button
            onClick={() => {
              setScreen("One");
            }}
            className="focus:outline-none text-gray-800 bg-gray-200 shadow-sm shadow-gray-300 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 font-medium rounded-sm p-2.5 w-fit flex gap-1 items-center justify-center">
            <IoMdExit className="text-4xl" />
          </button>
        </div>
      </div>

      <div className="w-full flex gap-2">
        <div class="inline-flex items-center rounded-md shadow-sm">
          <input
            type="date"
            onInput={(e) => setNewDate(e.target.value)}
            class="focus:outline-none text-gray-800 text-base bg-white
            hover:bg-gray-200 border border-gray-200 rounded-l-sm px-2 py-0.5
            inline-flex space-x-1 items-center"></input>
          <button
            onClick={() => {
              addingNewDate();
            }}
            class=" text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 rounded-r-sm px-2 py-1 inline-flex space-x-1 items-center gap-1">
            <RiCalendarEventLine className="text-lg inline-block" />
            <span className="uppercase font-thin text-base">Add Date</span>
          </button>
        </div>

        <button
          onClick={() => {
            setScreen("TwoNew");
            setScreenPosition("null");
          }}
          class=" text-gray-800 bg-white hover:bg-gray-100 border border-gray-200 rounded-r-sm px-2 py-1 inline-flex space-x-1 items-center gap-1">
          <FiRepeat className="text-base inline-block" />
          <span className="uppercase font-thin text-base">Add Recurring</span>
        </button>
      </div>

      <div class="bigAttendance" style={{ color: newCourseColour }}>
        {countingAttendance()}
      </div>
      <div class="mediumAttendance">
        <span style={{ color: newCourseColour, fontWeight: "800" }}>
          {countingPresent()}
        </span>{" "}
        Marked Present
      </div>
      <div class="mediumAttendance">
        <span style={{ color: newCourseColour, fontWeight: "800" }}>
          {countingAbsent()}
        </span>{" "}
        Marked Absent
      </div>
      <div class="mediumAttendance">
        <span style={{ color: newCourseColour, fontWeight: "800" }}>
          {countingTotal()}
        </span>{" "}
        in Total
      </div>
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
    </div>
  );
}

export default CoursePreview;
