import { useRef } from "react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useCms } from "../../context/CmsContext";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {
  const { projects } = useCms();
  const scope = useRef(null);
  useScrollReveal(scope, { stagger: 0.06 });

  return (
    <section id="projects" ref={scope} className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div data-reveal className="mb-16 text-center">
          <p className="eyebrow mb-3 text-xs text-primary">Portofolio</p>
          <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
            Karya <span className="text-primary">Terbaru Kami</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Lihatlah beberapa karya terbaru kami dan dapatkan inspirasi untuk proyek busana khusus
            Anda berikutnya.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        <div data-reveal className="mt-12 text-center">
          <Link
            to="/order"
            className="inline-block rounded-full bg-primary px-8 py-3 font-medium text-primary-ink transition-transform hover:-translate-y-0.5"
          >
            Mulai Project Mu
          </Link>
        </div>
      </div>
    </section>
  );
}
