import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-BBKMW9SB0X");
};

export const logPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
};