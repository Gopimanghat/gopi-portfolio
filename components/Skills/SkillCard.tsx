import Card from "../ui/Card";

interface SkillCardProps {
  title: string;
  skills: string[];
}

export default function SkillCard({
  title,
  skills,
}: SkillCardProps) {
  return (
    <Card>
      <h3 className="mb-6 text-2xl font-semibold">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              rounded-full
              border
              border-gray-700
              px-4
              py-2
              text-sm
              transition-all
              duration-300
              hover:border-indigo-500
              hover:bg-indigo-500/10
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </Card>
  );
}