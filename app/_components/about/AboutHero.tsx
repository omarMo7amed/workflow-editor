import Image from "next/image";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative h-[calc(100vh-73px)] flex items-center justify-center overflow-hidden gradient-subtle mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-3xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Automate Your
              <span className="text-slate-600 block">Workflows</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
              Transform your business processes with our intuitive workflow
              automation platform. Design, execute, and optimize your workflows
              with AI-powered insights and beautiful visual tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/auth/signin"
                className="px-8 py-2 text-md cursor-pointer transition-colors duration-200 focus:ring-2 focus:ring-slate-400  bg-slate-900 font-semibold text-white hover:bg-slate-700 rounded-full"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-in-delay flex justify-end ">
            <div className="absolute inset-0 gradient-primary rounded-md blur-3xl opacity-20 animate-float" />
            <Image
              width={500}
              height={500}
              src="/images/about-hero.webp"
              alt=""
              className="relative rounded-3xl shadow-elegant hover-lift  h-auto"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
