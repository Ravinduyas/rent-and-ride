import PageHero from "@/components/PageHero";
import SectionTabs from "@/components/SectionTabs";
import VehicleBrowser from "@/components/VehicleBrowser";
import RentalInfo from "@/components/RentalInfo";
import PermitSection from "@/components/PermitSection";
import { SCOOTERS, BIKES } from "@/data/vehicles";
import type { SectionLink } from "@/lib/sections";
import { REAL } from "@/data/photos";

// The old /bikes page forwards to #bikes here, so keep the ids stable.
const SECTIONS: SectionLink[] = [
  { id: "scooters", label: "Scooters", icon: "scooter" },
  { id: "bikes", label: "Bikes", icon: "bike" },
  { id: "driving-permit", label: "Driving Permit", short: "Permit", icon: "permit" },
];

export const metadata = {
  title: "Scooter & Motorbike Rental in Weligama from $4/day — Rent & Ride",
  description:
    "Rent a scooter from $4/day or a motorbike from $10/day in Weligama, with free helmets and help getting your Sri Lankan driving permit.",
};

export default function ScootersAndBikesPage() {
  return (
    <>
      <PageHero
        title={<>Scooter &amp; Bike Rental<br />in Weligama</>}
        intro="Explore Weligama, Mirissa and the South Coast on a reliable scooter or bike — and we'll sort out your driving permit too."
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
      <RentalInfo noun="Ride" />
      <PermitSection id="driving-permit" />
    </>
  );
}
