// Import images directly
import tedx2025Image from "../../assets/project-thumb-tedx.png";
import tedx2023Image from "../../assets/project-thumb-tedx.png";
import skyImage from "../../assets/project-thumb-sky.png";
import dialinkImage from "../../assets/project-thumb-dialink.png";
import anizoneImage from "../../assets/project-thumb-anizone.png";
import seekrImage from "../../assets/project-thumb-seekr.png";

// Update projects array with imported images
export const projects = [
  {
    name: "TEDxUniversitasBrawijaya 2025",
    image: tedx2025Image,
    url: null,
  },
  {
    name: "TEDxUniversitasBrawijaya 2023",
    image: tedx2023Image,
    url: null,
  },
  {
    name: "Sky",
    image: skyImage,
    url: "https://sky-weather.vercel.app/",
  },
  {
    name: "DiaLink",
    image: dialinkImage,
    url: "https://dialink.vercel.app/",
  },
  {
    name: "AniZone",
    image: anizoneImage,
    url: "https://anizone.netlify.app/",
  },
  {
    name: "Seekr",
    image: seekrImage,
    url: "https://seekrco.netlify.app/",
  },
];
