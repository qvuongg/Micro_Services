import React, { useState } from "react";
import Navbar from "../../layout/Navabr/Navbar";
import ChartLinePriceWeek from "../../components/TimePriceChart/WeeklyPriceChart"
import ChartLinePriceMonth from "../../components/TimePriceChart/MonthlyPriceChart"
import ChartLinePriceDay from "../../components/Test/LivePriceChart"
import "./style.css"; // Import file CSS

const index = () => {
  const [activeTab, setActiveTab] = useState("day");

  const renderContent = () => {
    switch (activeTab) {
      case "day":
        return <ChartLinePriceDay />;
      case "week":
        return <ChartLinePriceWeek />;
      case "month":
        return <ChartLinePriceMonth />;
      default:
        return <ChartLinePriceDay />;
    }
  };

  return (
    <div>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default index;
