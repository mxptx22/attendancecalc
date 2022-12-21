import React, { useContext, useEffect } from "react";
import PageContext from "../PageContext";
import NewCourse from "../components/NewCourse";
import EditCourse from "../components/EditCourse";
import NewRecurring from "../components/NewRecurring";

function ConfigBox() {
  const { screenPosition, setScreenPosition } = useContext(PageContext);
  const { screen, setScreen } = useContext(PageContext);

  const handleReturn = () => {
    const determineBack = () => {
      if (screen === "OneNew") {
        return "One";
      }
      if (screen === "OneEdit") {
        return "One";
      }
      if (screen === "TwoNew") {
        return "Two";
      }
    };
    setScreen(determineBack());
    setScreenPosition("full");
  };

  return (
    <div className="config-box-container">
      <div className="config-box-card">
        {screen === "OneNew" && (
          <NewCourse activities={{ return: handleReturn }} />
        )}
        {screen === "OneEdit" && (
          <EditCourse activities={{ return: handleReturn }} />
        )}
        {screen === "TwoNew" && (
          <NewRecurring activities={{ return: handleReturn }} />
        )}
      </div>
    </div>
  );
}

export default ConfigBox;
