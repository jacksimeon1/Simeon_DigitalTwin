'use client';

import { Zap, Code2, Layers, Database, Cloud, Cpu, Globe, Gamepad2 } from 'lucide-react';

interface Skill {
  category: string;
  items: string[];
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'],
    icon: <Code2 size={24} />,
    color: 'blue',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'Express.js', 'PostgreSQL', 'MongoDB', 'PHP', 'Laravel', 'MySQL'],
    icon: <Layers size={24} />,
    color: 'purple',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    category: 'Game Development',
    items: ['Godot Engine', 'GDScript', 'C#', 'Game Design', 'Unity Basics'],
    icon: <Gamepad2 size={24} />,
    color: 'green',
    gradient: 'from-green-600 to-emerald-600',
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'],
    icon: <Cloud size={24} />,
    color: 'emerald',
    gradient: 'from-emerald-600 to-teal-600',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            <Zap className="text-yellow-500 animate-pulse" size={28} />
            Skills & Expertise
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical skills and areas of expertise across modern web technologies.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, idx) => (
            <div
              key={skillGroup.category}
              className="group animate-slide-up hover:translate-y-0 transition-all"
              style={{animationDelay: `${idx * 0.15}s`}}
            >
              {/* Card */}
              <div className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group-hover:border-${skillGroup.color}-300 dark:group-hover:border-${skillGroup.color}-500 overflow-hidden h-full`}>
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skillGroup.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${skillGroup.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {skillGroup.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all" style={{backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`}}>
                    {skillGroup.category}
                  </h3>

                  {/* Skills List */}
                  <ul className="space-y-3">
                    {skillGroup.items.map((item, itemIdx) => (
                      <li key={item} className="flex items-center text-slate-700 dark:text-slate-300 group/item hover:translate-x-1 transition-transform" style={{transitionDelay: `${itemIdx * 50}ms`}}>
                        <span className={`w-2 h-2 bg-gradient-to-r ${skillGroup.gradient} rounded-full mr-3 group-hover/item:scale-150 transition-transform`}></span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${skillGroup.gradient} w-0 group-hover:w-full transition-all duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional tech stack section */}
        <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-700 animate-slide-up" style={{animationDelay: '0.5s'}}>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">Other Technologies & Areas</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['AI/ML', 'APIs', 'REST/GraphQL', 'Responsive Design', 'UI/UX', 'Database Design', 'System Architecture', 'Agile'].map((tech, idx) => (
              <div
                key={tech}
                className="group p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 text-center hover:shadow-lg transition-all cursor-pointer animate-slide-up"
                style={{animationDelay: `${0.5 + idx * 0.05}s`}}
              >
                <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
