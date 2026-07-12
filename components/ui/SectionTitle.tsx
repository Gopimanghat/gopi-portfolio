interface Props {
  title: string;
  subtitle: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-20 text-center">
      <h2 className="text-4xl font-bold md:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}