import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Elite Performance Coaching - Laferla Sports',
  description: 'ISSF Rifle Coaching for Competitive Excellence with C-Level ISSF Rifle Coach Bernard Laferla.',
};

export default function CoachingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden min-h-[80vh] flex items-center bg-dark">
        <div className="container-custom relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left z-10">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest leading-tight mb-6 text-text-primary">
                  Elite Performance<br />Coaching
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  ISSF Rifle Coaching for Competitive Excellence
                </p>
              </div>
              
              {/* Right: Coach Image - Full display without constraints, pushed further right */}
              <div className="flex items-center justify-end">
                <div className="relative w-full max-w-xl aspect-[3/4] lg:aspect-auto lg:min-h-[600px] lg:ml-16 lg:mr-0">
                  <Image
                    src="/images/Coaching.png"
                    alt="Bernard Laferla - C-Level ISSF Rifle Coach"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coach Introduction */}
      <section className="section-padding bg-dark-lighter border-y border-dark-border">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Coach Image */}
              <div className="lg:col-span-1">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src="/images/BernardCoach.jpg"
                    alt="Bernard Laferla"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 1024px) 100vw, 384px"
                  />
                </div>
              </div>
              
              {/* Coach Info */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-3 text-text-primary">
                    Bernard Laferla
                  </h2>
                  <p className="text-xl font-bold text-accent uppercase tracking-wide mb-2">
                    C-Level ISSF Rifle Coach
                  </p>
                  <p className="text-text-secondary uppercase tracking-wide text-sm">
                    License Number: R1024-1703
                  </p>
                </div>
                
                <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
                  <p>
                    Bernard Laferla brings extensive experience in international ISSF competition, 
                    having participated in 3P events at the highest level. His coaching approach 
                    combines technical precision with strategic performance management, developed 
                    through years of managing and coaching athletes at high-performance levels.
                  </p>
                  <p>
                    As a C-Level ISSF Rifle Coach, Bernard specializes in ISSF Rifle disciplines, 
                    including 3P events, delivering coaching that emphasizes precision, mental 
                    performance, and technical excellence. His methodology is strategic, analytical, 
                    and performance-driven—focused on developing athletes who excel under pressure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials & Authority */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <h2 className="heading-2 mb-12 text-text-primary text-center">Credentials & Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-8">
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">ISSF Certification</h3>
                <p className="text-text-secondary leading-relaxed mb-3">
                  <span className="text-accent font-semibold">C-Level ISSF Rifle Coach</span>
                </p>
                <p className="text-text-muted text-sm uppercase tracking-wide">
                  License: R1024-1703
                </p>
              </div>
              
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-8">
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Competition Experience</h3>
                <p className="text-text-secondary leading-relaxed">
                  International 3P event participation at elite competitive levels, providing 
                  firsthand understanding of high-performance shooting requirements.
                </p>
              </div>
              
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-8">
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Athlete Development</h3>
                <p className="text-text-secondary leading-relaxed">
                  Extensive experience managing and coaching athletes at high-performance levels, 
                  with a focus on strategic development and competitive excellence.
                </p>
              </div>
              
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-8">
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Specialization</h3>
                <p className="text-text-secondary leading-relaxed">
                  ISSF Rifle disciplines, including 3P events, with expertise in technical 
                  precision, mental performance, and strategic match preparation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Philosophy */}
      <section className="section-padding bg-dark-lighter border-y border-dark-border">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 mb-12 text-text-primary text-center">Coaching Philosophy</h2>
            
            <div className="space-y-8 text-text-secondary text-lg leading-relaxed">
              <div>
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Precision</h3>
                <p>
                  Technical excellence through systematic refinement of shooting fundamentals, 
                  equipment optimization, and consistent execution under competition conditions.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Mental Performance</h3>
                <p>
                  Development of mental resilience, focus, and strategic thinking required for 
                  elite-level competition. Building athletes who perform under pressure.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-xl mb-4 text-text-primary uppercase tracking-wide">Strategic Preparation</h3>
                <p>
                  Analytical approach to match preparation, performance analysis, and tactical 
                  development tailored to individual athlete strengths and competition requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-dark">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6 text-text-primary">Begin Your Training</h2>
            <p className="text-body mb-10 text-lg leading-relaxed">
              Contact us to discuss coaching availability and training programs tailored to your 
              competitive goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary">
                Book Coaching
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact for Availability
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
