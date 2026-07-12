import Card from "../ui/Card";

interface Props {
  company: string;
  role: string;
  duration: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

export default function ExperienceCard({
  company,
  role,
  duration,
  description,
  technologies,
  achievements,
}: Props) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{role}</h3>
          <p className="text-indigo-500">{company}</p>
        </div>

        <span className="text-sm text-gray-500">
          {duration}
        </span>
      </div>

      <p className="mt-5 text-gray-600">
        {description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700"
          >
            {tech}
          </span>
        ))}
      </div>

      <ul className="mt-6 space-y-2">
        {achievements.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>
    </Card>
  );
}