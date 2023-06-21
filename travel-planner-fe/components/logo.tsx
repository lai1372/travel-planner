import Image from "next/image";
import logo from "../public/logo.png";

interface LogoProps {
  style: React.CSSProperties;
}

function Logo(props: LogoProps) {
  return <Image alt="logo" src={logo} style={props.style} />;
}

export default Logo;
