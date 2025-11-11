'use client';

interface Skill {
  category: string;
  items: string[];
}

const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'Express.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
          Skills & Expertise
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          A comprehensive overview of my technical skills and areas of expertise.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillGroup) => (
            <div key={skillGroup.category} className="bg-white rounded-xl p-6 shadow-md border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 mr-3 rounded-full"></div>
                {skillGroup.category}
              </h3>
              <ul className="space-y-3">
                {skillGroup.items.map((item) => (
                  <li key={item} className="flex items-center text-slate-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
