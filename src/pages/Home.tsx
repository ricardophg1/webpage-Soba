import { Hero } from '@/components/Hero';
import { Benefits } from '@/components/Benefits';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Stats } from '@/components/Stats';
import { Gallery } from '@/components/Gallery';
import { Features } from '@/components/Features';
import { Partners } from '@/components/Partners';
import { Inspiration } from '@/components/Inspiration';
import { Testimonials } from '@/components/Testimonials';

export function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Services />
      <Process />
      <Stats />
      <Gallery />
      <Features />
      <Partners />
      <Inspiration />
      <Testimonials />
    </main>
  );
}