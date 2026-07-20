export default function ProjectCard({ title, description, image }) {
  return (
    <div
      data-reveal
      className="group relative overflow-hidden rounded-2xl shadow-md"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-1 text-sm text-white/85">{description}</p>
      </div>
    </div>
  );
}
