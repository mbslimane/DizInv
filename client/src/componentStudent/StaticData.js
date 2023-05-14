// first part pic import
import Absence_Justification from "../asserts/images/Absence-justification.svg";

// second part pic import
import Progress_data from "../asserts/images/Progress-data.svg";

// third part pic import
import Rules from "../asserts/images/Rules.svg";

export const homeObjOne = {
  id: "absence",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Absence & Justification",
  headline: "View & Justify your Absence",
  discription:
    "Try no to be EXCLUDED on exams , you missed a session ? YES, provid a valid justification for that Session ",
  buttonLabel: "Justify Now",
  imgStart: false,
  img: Absence_Justification,
  alt: "AbsenceDocs",
  dark: true,
  primary: true,
  darkText: false,
};

export const homeObjTwo = {
  id: "statistics",
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "My Progress Statistics",
  headline: "View your Presence stats so far",
  discription:
    "See your progress, the ratios of you presence to you absence or vise vasal",
  buttonLabel: "View Statistics",
  imgStart: true,
  img: Progress_data,
  alt: "Statistics",
  dark: false,
  primary: false,
  darkText: true,
};

export const homeObjThree = {
  id: "rules",
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: "Rules ",
  headline: "Rules for Abesnce in a Session",
  discription:
    "Get familiar with all the rules behind been present or absent in a session",
  buttonLabel: "Learn More",
  imgStart: false,
  img: Rules,
  alt: "Rules",
  dark: true,
  primary: true,
  darkText: false,
};
