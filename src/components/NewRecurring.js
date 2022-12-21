import React, { useState, useContext } from "react";
import PageContext from "../PageContext";
import { BiAddToQueue } from "react-icons/bi";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { IoMdExit } from "react-icons/io";

function NewRecurring({ activities }) {
  const [startDate, setStartDate] = useState();
  // const [startDateDay, setStartDateDay] = useState()
  // const [startDateMonth, setStartDateMonth] = useState()
  // const [startDateYear, setStartDateYear] = useState()
  // const [startDateWeekday, setStartDateWeekday] = useState()
  const [endDate, setEndDate] = useState();
  const { selectedCourse, setSelectedCourse } = useContext(PageContext);
  const { events, addEvents } = useContext(PageContext);
  const { screenPosition, setScreenPosition } = useContext(PageContext);
  const { screen, setScreen } = useContext(PageContext);

  const diffCalc = () => {
    let dStart = new Date(startDate);
    let dEnd = new Date(endDate);
    let dStartNum = dStart.valueOf();
    let dEndNum = dEnd.valueOf();
    const week = 604800000;
    let difference = (dEndNum - dStartNum) / week;
    return Math.floor(difference);
  };

  const recurrenceCalc = () => {
    if (diffCalc() >= 0) {
      let dStart = new Date(startDate);
      let dStartNum = dStart.valueOf();
      const week = 604800000;
      for (let index = 0; index < diffCalc() + 1; index++) {
        let newOccurrence = new Date(dStartNum + week * index);
        let newOccurrenceDate = newOccurrence.toLocaleDateString(undefined);
        addEvents((otherCourseDates) => [
          ...otherCourseDates,
          {
            courseId: selectedCourse,
            eventId: Math.floor(Math.random() * 1000000000),
            date: newOccurrenceDate,
            status: "Present",
          },
        ]);
      }
      setScreen("Two");
      setScreenPosition("full");
    } else {
      alert("⚠️ First Event must be the earlier date of the two.");
    }
  };

  const weekdayText = () => {
    if (startDate !== undefined) {
      let dStart = new Date(startDate);
      let dStartWeekday = dStart.getDay();
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return "Every " + weekdays[dStartWeekday];
    } else {
      return "Select the relevant dates";
    }
  };

  const recurrenceText = () => {
    if (diffCalc() === 0) {
      return "this week only";
    } else if (diffCalc() > 0) {
      return "for " + (diffCalc() + 1) + " weeks";
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
              <span className="mobile-adjusted">Add</span> Recurring{" "}
              <span className="mobile-adjusted">Events</span>
            </h1>
          </div>
          <div class="pl-1 flex gap-2">
            <button
              onClick={() => {
                recurrenceCalc();
              }}
              className="subheader-button subheader-button-green">
              <BiAddToQueue className="" />
              <span className="">Add</span>
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
          {/* <button
            onClick={() => {
              recurrenceCalc();
            }}
            className="yes-button yes-button-green">
            <BiAddToQueue className="" />
          </button> */}
        </div>
      </div>
      <div className="w-full text-center mt-12">
        <span className="px-4 py-4 uppercase font-thin tracking-wider text-gray-400">
          {weekdayText()} {recurrenceText()}
        </span>
      </div>
      <div className="flex gap-8 flex-col md:flex-row justify-between pt-8">
        <div
          id="start-date"
          className="flex flex-col w-full items-center gap-2">
          <div className="uppercase font-thin text-gray-600 tracking-wider">
            First Event
          </div>
          <input
            type="date"
            className="input-bar w-1/2 text-center text-xl"
            minLength="1"
            onInput={(e) => setStartDate(e.target.value)}></input>
        </div>
        <div id="end-date" className="flex flex-col w-full items-center gap-2">
          <div className="uppercase font-thin text-gray-600 tracking-wider">
            Last Event
          </div>
          <input
            type="date"
            className="inputBar w-1/2 text-center text-xl"
            minLength="1"
            onInput={(e) => setEndDate(e.target.value)}></input>{" "}
        </div>
      </div>
    </div>
  );
}

export default NewRecurring;
