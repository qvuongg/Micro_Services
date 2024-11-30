import React from "react";

const Navbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "day", label: "Chart Day" },
    { id: "week", label: "Chart Week" },
    { id: "month", label: "Chart Month" },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={`navbar-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
