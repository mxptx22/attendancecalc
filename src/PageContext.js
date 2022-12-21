import React from "react";
import { createContext } from "react";
import { useState } from "react";

const PageContext = createContext();

export function PageProvider({ children }) {
  const [screen, setScreen] = useState("One");
  const [screenPosition, setScreenPosition] = useState("full");
  const [courses, addCourses] = useState([]);
  const [events, addEvents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [savingStatus, setSavingStatus] = useState("nay");

  return (
    <PageContext.Provider
      value={{
        screen,
        setScreen,
        screenPosition,
        setScreenPosition,
        courses,
        addCourses,
        selectedCourse,
        setSelectedCourse,
        events,
        addEvents,
        savingStatus,
        setSavingStatus,
      }}>
      {children}
    </PageContext.Provider>
  );
}

export default PageContext;
