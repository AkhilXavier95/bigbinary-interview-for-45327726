export const filterOptions = [
  { label: "All Launches", value: "" },
  { label: "Upcoming Launches", value: "upcoming" },
  { label: "Successful Launches", value: "launchSuccess" },
  { label: "Failed Launches", value: "launchFailed" },
];

export const getPath = (value) => {
  switch (value) {
    case "upcoming":
      return "/upcoming?";
    case "launchSuccess":
      return "?launch_success=true&";
    case "launchFailed":
      return "?launch_success=false&";
    default:
      return null;
  }
};
