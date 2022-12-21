import React, { useState, useContext } from "react";
import PageContext from "../PageContext";
import { BiAddToQueue } from "react-icons/bi";
import { IoMdExit } from "react-icons/io";

function NewRecurring({ activities }) {
  // HERE Contexts
  // Single
  const { selectedCourse } = useContext(PageContext);
  const { addEvents } = useContext(PageContext);
  const { setScreenPosition } = useContext(PageContext);
  const { setScreen } = useContext(PageContext);

  // HERE Aux Functions
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const week = 604800000;
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const difference = () => {
    let value = (endDate - startDate) / week;
    return value >= 0 ? Math.floor(value) : undefined;
  };

  const recurrenceCalc = () => {
    if (difference()) {
      for (let index = 0; index < difference() + 1; index++) {
        let newOccurrence = Number(startDate) + week * index;
        addEvents((otherCourseDates) => [
          ...otherCourseDates,
          {
            courseId: selectedCourse,
            eventId: Math.floor(Math.random() * 1000000000),
            date: new Date(newOccurrence),
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

  const repetitionText = {
    weekday: () => {
      return startDate
        ? `Every ${weekdays[startDate.getDay()]}`
        : "Select the relevant dates";
    },
    recurrence: () => {
      if (difference() >= 0) {
        return difference() > 0
          ? `for ${difference() + 1} weeks`
          : "this week only";
      }
    },
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
        </div>
      </div>
      <div className="w-full text-center mt-12">
        <span className="px-4 py-4 uppercase font-thin tracking-wider text-gray-400">
          {repetitionText.weekday()} {repetitionText.recurrence()}
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
            onInput={(e) => setStartDate(new Date(e.target.value))}></input>
        </div>
        <div id="end-date" className="flex flex-col w-full items-center gap-2">
          <div className="uppercase font-thin text-gray-600 tracking-wider">
            Last Event
          </div>
          <input
            type="date"
            className="inputBar w-1/2 text-center text-xl"
            minLength="1"
            onInput={(e) => setEndDate(new Date(e.target.value))}></input>{" "}
        </div>
      </div>
    </div>
  );
}

export default NewRecurring;
