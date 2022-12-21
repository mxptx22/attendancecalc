import React, { useContext } from "react";
import PageContext from "../PageContext";
import NewCourse from "../components/NewCourse";
import EditCourse from "../components/EditCourse";
import NewRecurring from "../components/NewRecurring";

function ConfigBox() {
  // HERE Contexts
  // Single
  const { setScreenPosition } = useContext(PageContext);
  // Duplets
  const { screen, setScreen } = useContext(PageContext);

  // HERE Aux Functions
  const handleReturn = () => {
    const determineBack = () => {
      switch (screen) {
        case "OneNew":
          return "One";
        case "OneEdit":
          return "One";
        case "TwoNew":
          return "Two";
        default:
          throw new Error("Invalid screen selection...");
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
