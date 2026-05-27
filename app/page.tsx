import Hero from "@/components/Hero";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Services from "@/components/Services";
import Weligama from "@/components/Weligama";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <Weligama />
      <Services />
      <Testimonials />
      <Newsletter />
    </>
  );
}
