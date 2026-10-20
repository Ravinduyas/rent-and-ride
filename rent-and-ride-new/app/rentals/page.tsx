import PageHero from "@/components/PageHero";
import SectionTabs from "@/components/SectionTabs";
import VehicleBrowser from "@/components/VehicleBrowser";
import RentalInfo from "@/components/RentalInfo";
import PermitSection from "@/components/PermitSection";
import { SCOOTERS, BIKES, TUKTUKS } from "@/data/vehicles";
import type { SectionLink } from "@/lib/sections";
import { REAL } from "@/data/photos";

// The old /scooters, /bikes, /three-wheelers and /driving-permit pages
// forward to these ids, so keep them stable.
const SECTIONS: SectionLink[] = [
  { id: "scooters", label: "Scooters", icon: "scooter" },
  { id: "bikes", label: "Bikes", icon: "bike" },
  { id: "tuktuks", label: "Tuk-Tuks", icon: "tuktuk" },
  { id: "driving-permit", label: "Driving Permit", short: "Permit", icon: "permit" },
];

export const metadata = {
  title: "Scooter, Bike & Tuk-Tuk Rental in Weligama — Rent & Ride",
  description:
    "Rent a scooter from $4/day, a motorbike from $10/day or a tuk-tuk from $26/day in Weligama, with free helmets and help getting your Sri Lankan driving permit.",
};

export default function RentalsPage() {
  return (
    <>
      <PageHero
        title={<>Scooter, Bike &amp; Tuk-Tuk<br />Rental in Weligama</>}
        intro="Explore Weligama, Mirissa and the South Coast on a reliable scooter, bike or tuk-tuk — and we'll sort out your driving permit too."
        image={REAL.shopSignScooter}
        imagePosition="center 38%"
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
      <VehicleBrowser
        id="tuktuks"
        title="Tuk-Tuks"
        intro="Sri Lanka's three-wheelers — seats three, shade from the sun, and the local way to get around."
        vehicles={TUKTUKS}
      />
      <RentalInfo noun="Ride" />
      <PermitSection id="driving-permit" />
    </>
  );
}
