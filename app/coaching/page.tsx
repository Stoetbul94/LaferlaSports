import Image from 'next/image';
import CoachingEnquiryForm from '@/components/CoachingEnquiryForm';

export const metadata = {
  title: 'Elite Performance Coaching',
  description:
    'ISSF rifle coaching in South Africa with C-Level ISSF Rifle Coach Bernard Laferla — competitive excellence from club through national level.',
  alternates: { canonical: '/coaching' },
};

export default function CoachingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-center bg-dark">
        <div className="container-custom relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div className="text-center lg:text-left z-10 order-2 lg:order-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest leading-tight mb-4 sm:mb-6 text-text-primary">
                  Elite Performance<br />Coaching
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-6 sm:mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
                  ISSF Rifle Coaching for Competitive Excellence
                </p>
              </div>
              
              {/* Right: Coach Image - Full display without constraints, pushed further right */}
              <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2 mb-6 lg:mb-0">
                <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl aspect-[3/4] lg:aspect-auto lg:min-h-[600px] lg:ml-16 lg:mr-0">
                  <Image
                    src="/images/Coaching.png"
                    alt="Bernard Laferla - C-Level ISSF Rifle Coach"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
              {/* Coach Image */}
              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-full aspect-[3/4]">
                  <Image
                    src="/images/BernardCoach.jpg"
                    alt="Bernard Laferla"
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  />
                </div>
              </div>
              
              {/* Coach Info */}
              <div className="lg:col-span-2 text-center lg:text-left">
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest mb-2 sm:mb-3 text-text-primary">
                    Bernard Laferla
                  </h2>
                  <p className="text-lg sm:text-xl font-bold text-accent uppercase tracking-wide mb-1 sm:mb-2">
                    C-Level ISSF Rifle Coach
                  </p>
                  <p className="text-text-secondary uppercase tracking-wide text-xs sm:text-sm">
                    License Number: R1024-1703
                  </p>
                </div>
                
                <div className="space-y-3 sm:space-y-4 text-text-secondary text-base sm:text-lg leading-relaxed">
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
            <h2 className="heading-2 mb-8 sm:mb-12 text-text-primary text-center px-4 sm:px-0">Credentials & Experience</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 sm:p-8">
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-text-primary uppercase tracking-wide">ISSF Certification</h3>
                <p className="text-text-secondary leading-relaxed mb-2 sm:mb-3 text-sm sm:text-base">
                  <span className="text-accent font-semibold">C-Level ISSF Rifle Coach</span>
                </p>
                <p className="text-text-muted text-xs sm:text-sm uppercase tracking-wide">
                  License: R1024-1703
                </p>
              </div>
              
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 sm:p-8">
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-text-primary uppercase tracking-wide">Competition Experience</h3>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                  International 3P event participation at elite competitive levels, providing 
                  firsthand understanding of high-performance shooting requirements.
                </p>
              </div>
              
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 sm:p-8">
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-text-primary uppercase tracking-wide">Athlete Development</h3>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                  Extensive experience managing and coaching athletes at high-performance levels, 
                  with a focus on strategic development and competitive excellence.
                </p>
              </div>
              
              <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 sm:p-8">
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-text-primary uppercase tracking-wide">Specialization</h3>
                <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
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
            <h2 className="heading-2 mb-8 sm:mb-12 text-text-primary text-center px-4 sm:px-0">Coaching Philosophy</h2>
            
            <div className="space-y-6 sm:space-y-8 text-text-secondary text-base sm:text-lg leading-relaxed px-4 sm:px-0">
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-text-primary uppercase tracking-wide">Precision</h3>
                <p>
                  Technical excellence through systematic refinement of shooting fundamentals, 
                  equipment optimization, and consistent execution under competition conditions.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-text-primary uppercase tracking-wide">Mental Performance</h3>
                <p>
                  Development of mental resilience, focus, and strategic thinking required for 
                  elite-level competition. Building athletes who perform under pressure.
                </p>
              </div>
              
              <div>
                <h3 className="font-bold text-lg sm:text-xl mb-3 sm:mb-4 text-text-primary uppercase tracking-wide">Strategic Preparation</h3>
                <p>
                  Analytical approach to match preparation, performance analysis, and tactical 
                  development tailored to individual athlete strengths and competition requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry / Booking */}
      <section className="section-padding bg-dark" id="enquire">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto px-4 sm:px-0">
            <div className="mb-8 sm:mb-10 text-center">
              <h2 className="heading-2 mb-4 sm:mb-6 text-text-primary">Begin Your Training</h2>
              <p className="text-body text-base sm:text-lg leading-relaxed">
                Tell us about your shooting and goals and Bernard will be in touch to discuss
                availability and a programme tailored to you.
              </p>
            </div>
            <div className="bg-dark-lighter border border-dark-border rounded-lg p-6 sm:p-8">
              <CoachingEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
