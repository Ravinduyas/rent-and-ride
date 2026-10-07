import PageHero from "@/components/PageHero";
import SectionTabs from "@/components/SectionTabs";
import VehicleBrowser from "@/components/VehicleBrowser";
import RentalInfo from "@/components/RentalInfo";
import PermitSection from "@/components/PermitSection";
import { SCOOTERS, BIKES } from "@/data/vehicles";
import type { SectionLink } from "@/lib/sections";

// The old /scooters, /bikes and /driving-permit pages forward to these ids,
// so keep them stable.
const SECTIONS: SectionLink[] = [
  { id: "scooters", label: "Scooters", icon: "scooter" },
  { id: "bikes", label: "Bikes", icon: "bike" },
  { id: "driving-permit", label: "Driving Permit", short: "Permit", icon: "permit" },
];

export const metadata = {
  title: "Scooter & Bike Rental in Weligama — Rent & Ride",
  description:
    "Rent a scooter from $4/day or a motorbike from $10/day in Weligama, with free helmets, free delivery and help getting your Sri Lankan driving permit.",
};

export default function RentalsPage() {
  return (
    <>
      <PageHero
        title={<>Scooter &amp; Bike Rental<br />in Weligama</>}
        intro="Explore Weligama, Mirissa and the South Coast on a reliable scooter or bike — and we'll sort out your driving permit too."
      />

      <SectionTabs sections={SECTIONS} />

      <VehicleBrowser
        id="scooters"
        title="Scooters"
        intro="Automatic, easy to ride, and perfect for the coast road."
        vehicles={SCOOTERS}
      />
      <VehicleBrowser
        id="bikes"
        title="Bikes"
        intro="More power for longer rides — Galle, the hill country, Yala."
        vehicles={BIKES}
      />
      <RentalInfo noun="Scooter or Bike" />
      <PermitSection id="driving-permit" />
    </>
  );
}
