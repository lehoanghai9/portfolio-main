import { Inter, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const FiraCode = localFont({
  src: "../../public/fonts/fira-code.woff2",
});

const DepartureMono = localFont({
  src: "../../public/fonts/DepartureMono-Regular.woff2",
});

export { inter, instrument, FiraCode as firaCode, DepartureMono as departureMono };
