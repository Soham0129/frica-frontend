import { useRouter } from "next/router";
import { styled } from "@mui/material";
import CustomImageContainer from "../CustomImageContainer";
import NextImage from "components/NextImage";
import { useSettings } from "../../contexts/use-settings";
import { useEffect } from "react";

export const Logo = styled("div")(({ height, width }) => ({
  maxWidth: width,
  height: height,

  position: "relative",
  cursor: "pointer",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));
const CustomLogo = ({ logoImg, atlText, height, width, objectFit }) => {
  const router = useRouter();
  const { settings } = useSettings(); // Get theme state
  
  // Set data-theme on body for alternative selector
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.setAttribute('data-theme', settings.theme);
    }
  }, [settings.theme]);
  
  let location = undefined;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
  }
  const handleClick = () => {
    if (router.pathname === "/") {
      if (location) {
        router.replace("/home", undefined, { shallow: true });
      } else {
        router.push("/", undefined, { shallow: true });
      }
    } else {
      router.replace("/home", undefined, { shallow: true }).then();
    }
  };
  return (

    <Logo height={height} width={width} onClick={() => handleClick()}>
      <NextImage
        src={logoImg}
        alt={atlText}
        objectFit={objectFit ? objectFit : "contain"}
        loading="eager"
        width={150}
        height={100}
        data-theme={settings.theme}
        className="logo-light"
      />
      <NextImage
        src="/images/darkmode-frica-logo.png"
        alt={atlText}
        objectFit={objectFit ? objectFit : "contain"}
        loading="eager"
        width={150}
        height={100}
        className="logo-dark"
        style={{ display: 'none' }}
      />
    </Logo>
  );
};
export default CustomLogo;
