import CustomLogo from "./CustomLogo";
import { Stack } from "@mui/system";

const LogoSide = ({ configData, width, height, objectFit, aspectRatio = "3:1" }) => {
  // Calculate height based on aspect ratio if not provided
  const calculateHeight = () => {
    if (height) return height;
    
    const [ratioWidth, ratioHeight] = aspectRatio.split(':').map(Number);
    return width ? `${(parseInt(width) * ratioHeight / ratioWidth)}px` : '50px';
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      width="150px"
      justifyContent="flex-start"
    >
      <CustomLogo
        atlText="logo"
        logoImg={configData?.logo_full_url}        
        width={width}
        height={calculateHeight()}
        objectFit={objectFit}
      />
    </Stack>
  );
};

LogoSide.propTypes = {};

export default LogoSide;
