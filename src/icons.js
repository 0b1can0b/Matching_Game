import * as biIcons from "react-icons/bi";

const biIconsList = Object.keys(biIcons);

const iconsList = biIconsList
  .map((e) => {
    return { icon: e, random: Math.random() };
  })
  .sort((a, b) => a.random - b.random)
  .map((e) => e.icon)
  .splice(0, 3);

export default iconsList;
