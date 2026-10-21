import PageHero from "@/components/PageHero";
import VehicleBrowser from "@/components/VehicleBrowser";
import RentalInfo from "@/components/RentalInfo";
import PermitSection from "@/components/PermitSection";
import { TUKTUKS } from "@/data/vehicles";
import { REAL } from "@/data/photos";

export const metadata = {
  title: "Tuk-Tuk Rental in Weligama for $28/day — Rent & Ride",
  description:
    "Rent a tuk-tuk in Weligama for $28/day. Seats three, with free helmets and help getting your Sri Lankan driving permit.",
};

export default function ThreeWheelersPage() {
  return (
    <>
      <PageHero
        title={<>Tuk-Tuk Rental<br />in Weligama</>}
        intro="The Bajaj RE 4S — seats three, shade from the sun, and the local way to get around."
        image={REAL.tuktukHillRoad}
        imagePosition="center 67%"
      />
      <VehicleBrowser id="tuktuks" title="Tuk-Tuks" vehicles={TUKTUKS} />
      <RentalInfo noun="Tuk-Tuk" />
      <PermitSection id="driving-permit" />
    </>
  );
}
