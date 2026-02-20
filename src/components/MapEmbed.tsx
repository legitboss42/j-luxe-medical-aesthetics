type MapEmbedProps = {
  src: string;
  title?: string;
  className?: string;
};

export default function MapEmbed({
  src,
  title = "Business location on Google Maps",
  className = "",
}: MapEmbedProps) {
  return (
    <div className={`w-full max-w-full overflow-hidden rounded-2xl aspect-[16/9] min-h-[260px] ${className}`.trim()}>
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        className="block h-full w-full border-0"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
