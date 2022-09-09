// Tabs from material UI for index page, will separate into popular, new, upcoming, and now playing.
import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      centered
      aria-label="Tabs to decide between now playing, popular, coming soon, and top rated"
      className="tabs"
    >
      <Tab label="Now Playing" />
      <Tab label="Popular" />
      <Tab label="Coming Soon" />
      <Tab label="Top Rated" />
    </Tabs>
  );
}
