'use client';

import {
  Download,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
  Globe,
  MapPin,
  Mail,
} from 'lucide-react';
import HydrationSafeButton from './HydrationSafeButton';
import ScrollReveal from './ScrollReveal';

export default function ResumeSection() {

  const handleDownload = (format: 'pdf' | 'txt') => {
    const resumeContent = `
ROBERT SIMEON JR.
Full-Stack & Agentic AI Developer
================================================================================
CONTACT INFORMATION
--------------------------------------------------------------------------------
Phone:     (+63) 9215512415
Address:   Santo Niño, Cagayan, Philippines
E-Mail:    robertsimeon12345@gmail.com
Portfolio: https://simeon-digital-twin.vercel.app/
LinkedIn:  https://www.linkedin.com/in/robert-simeon-08063b214/
Facebook:  https://www.facebook.com/jackieeeeeeeeeeeeeeee/
GitHub:    https://github.com/jacksimeon1

================================================================================
ABOUT ME
--------------------------------------------------------------------------------
I build software that makes life easier for people. With a background in full-stack development and autonomous AI systems, I enjoy taking an idea from scratch and turning it into a fast, functional, and easy-to-use digital product. Whether I'm collaborating with a team on core system architecture or experimenting with emerging tech to automate tedious workflows, I focus on clean execution and practical results. I am always learning, quick to adapt, and eager to bring my energy and problem-solving mindset to a team focused on real-world impact.

================================================================================
EDUCATION
--------------------------------------------------------------------------------
Bachelor of Science in Information Technology (BSIT)
St. Paul University Philippines
2022-(June 2026)

STEM Strand (Science, Technology, Engineering, and Mathematics)
St. Paul University Philippines
2021 – 2022 (WITH HONORS)

================================================================================
TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Frontend: React, Next.js, TypeScript, Tailwind CSS, HTML/CSS, JavaScript, Bootstrap
• Backend: Node.js, Python, Express.js, PostgreSQL, MongoDB, PHP, Laravel, MySQL, NextAuth/Auth.js, Java
• Tools & Platforms: Git, Docker, AWS, Vercel, Figma

================================================================================
AWARDS AND CERTIFICATIONS
--------------------------------------------------------------------------------
1. Full Stack Developer - Employability Advantage Australia
   Certificate ID: 168610825 | 2025
   Credential Link: https://www.credential.net/bc9c7415-d631-4d18-b5c2-117ce7938286#acc.VWDI1UBJ

2. EMPLOYABILITY ADVANTAGE | FULL-STACK AND AGENTIC AI DEVELOPER
   Sept 2025
   Completed a 10-week industry project focused on full-stack development and Amazon Web Services (AWS) Cloud under AusBiz Consulting Pty Ltd. Gained hands-on experience in front-end and back-end development, application deployment, cloud-based solutions, and modern software development practices, further strengthening technical, analytical, and problem-solving skills in real-world project environments.

3. CERTIPORT | INFORMATION TECHNOLOGY SPECIALIST - HTML & CSS
   Nov 2025
   Successfully passed the Information Technology Specialist (ITS) certification examination in HTML and CSS, demonstrating foundational and practical knowledge in web development, webpage styling, document structuring, accessibility, and responsive design principles. Strengthened technical skills in creating and designing user-friendly web interfaces using modern HTML and CSS practices.
   Verification ID: Co7F-DwVk

4. Certificate of Membership – Junior Philippine Computer Society (JPCS) – SPUP Chapter
   January 15, 2026
   Certified as a bona fide member of the Junior Philippine Computer Society (JPCS) – SPUP Chapter at St. Paul University Philippines for the academic year 2025–2026, entitled to the rights, benefits, and privileges associated with the organization’s membership.

5. ST. PAUL UNIVERSITY PHILIPPINES | MENTORSHIP PROGRAM
   April 2026
   Became a lecturer during the Mentorship Program for Information Technology students by sharing tutorials, practical tips, and guidance on Capstone Development.

================================================================================
PROJECTS
--------------------------------------------------------------------------------
1. IN-OFF CAMPUS ACTIVITY SCHEDULING INFORMATION SYSTEM
   Technologies: PHP, Laravel, Bootstrap, MySQL
   Description: Developed a centralized platform for managing and organizing on-campus and off-campus activity schedules, featuring a conflict detection mechanism that identifies overlapping schedules and helps prevent scheduling conflicts. The system improves activity coordination, information management, and accessibility while streamlining administrative processes.

2. SANTO NIÑO BUILDING PERMIT SYSTEM
   Technologies: PHP, MySQL, Bootstrap
   Description: A specialized municipal e-governance platform designed for the Local Government Unit of Santo Niño, Cagayan. Automates citizen building permit applications, blueprint and floor plan submissions, municipal administrative evaluations, cashier payment processing, and revenue reporting.

3. CAPSTONE AI TITLE GENERATOR
   Technologies: Next.js, React, TypeScript, Tailwind CSS
   Live Demo: https://jacksimeon1.github.io/capstone-title-ai/
   Source Code: https://github.com/jacksimeon1/capstone-title-ai
   Description: An open-source AI-powered academic research platform and thesis title synthesis engine with live heuristic validation and interactive verification sandbox tailored by academic program.

4. SIP 3D – 3D BEVERAGE SHOWCASE WEBSITE
   Technologies: Three.js, CSS 3D Transforms, JavaScript ES6+, HTML5 Canvas
   Live Demo: https://jacksimeon1.github.io/3d-can-animation/
   Source Code: https://github.com/jacksimeon1/3d-can-animation
   Description: Interactive 3D beverage showcase and animation demonstration website featuring real-time 360° can cylinder rotation physics, multi-flavor switching, dynamic kinetic typography, and canvas particle effects.

5. 3D ROOM – ISOMETRIC 3D ROOM & STUDIO
   Technologies: CSS 3D Transforms, JavaScript ES6+, HTML5 Canvas
   Live Demo: https://jacksimeon1.github.io/3D-Room/
   Source Code: https://github.com/jacksimeon1/3D-Room
   Description: Interactive isometric 3D living sanctuary and studio showcase built with pure CSS 3D transforms, JavaScript, and HTML5. Features real-time camera perspective rotation, dynamic ambient lighting presets, interactive room elements, multi-channel animated TV display, and relaxing soundscapes.

6. EMPLOYEE ATTENDANCE TRACKING SYSTEM
   Technologies: PHP, MySQL, Bootstrap (Doña Alejandra, Inc.)
   Description: Developed the Employee Attendance Tracking System for Doña Alejandra, Inc. responsible for designing, developing, and implementing the system to help streamline office processes and securely manage employee daily time records, attendance, and corporate information.
    `;

    if (format === 'pdf') {
      const link = document.createElement('a');
      link.href = '/Robert_Simeon_Jr_Resume.pdf';
      link.download = 'Robert_Simeon_Jr_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Robert_Simeon_Jr_Resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

  const resumeHighlights = [
    {
      icon: <GraduationCap className="w-4 h-4 text-purple-500 dark:text-purple-400" />,
      title: "Education",
      value: "BSIT & STEM Honors",
      subtitle: "SPUP • 2022-(June 2026)",
    },
    {
      icon: <Building2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />,
      title: "Experience",
      value: "Full-Stack & AI Dev",
      subtitle: "AusBiz & Doña Alejandra",
    },
    {
      icon: <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
      title: "Global License",
      value: "Certiport Pearson",
      subtitle: "ITS HTML/CSS • EA Aus",
    },
    {
      icon: <MapPin className="w-4 h-4 text-amber-500 dark:text-amber-400" />,
      title: "Location & Status",
      value: "Santo Niño, Cagayan, Philippines",
      subtitle: "Open for Opportunities",
    },
  ];

  return (
    <section id="resume" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal animation="fade-up">
        <div className="text-center mb-7 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-purple-500/25 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[11px] sm:text-xs font-bold mb-2 tracking-wide shadow-xs">
            <ShieldCheck size={13} className="text-emerald-500 dark:text-emerald-400" />
            <span>VERIFIED CREDENTIALS & INDUSTRY EXPERIENCE</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
            Curriculum Vitae & Verified Qualifications
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-xs leading-relaxed">
            Full-Stack and Autonomous AI Developer · BS Information Technology (2022–June 2026, SPUP) & STEM with Honors (2021–2022) with industry project credentials from Employability Advantage Australia (AusBiz Consulting) and Certiport Pearson.
          </p>
        </div>
        </ScrollReveal>

        {/* Top Verified Highlights Grid */}
        <ScrollReveal animation="scale-in" duration={0.65} delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-5">
          {resumeHighlights.map((highlight) => (
            <div
              key={highlight.title}
              className="p-3 sm:p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111116] hover:border-purple-500/40 dark:hover:border-purple-500/40 transition-all hover:-translate-y-0.5 shadow-xs"
            >
              <div className="flex items-center gap-1.5 mb-1">
                {highlight.icon}
                <span className="text-[10.5px] sm:text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">{highlight.title}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-0.5">{highlight.value}</p>
              <p className="text-[11px] sm:text-xs text-purple-600 dark:text-purple-400 font-medium">{highlight.subtitle}</p>
            </div>
          ))}
        </div>
        </ScrollReveal>

        {/* Main Content Grid: Preview & Experience Showcase */}
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-5 mb-5">
          {/* Left Column: Official License & Industry Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {/* Global License Spotlight Card: Certiport */}
            <ScrollReveal animation="stamp-in" duration={0.7} delay={0.15}>
            <div className="p-3.5 sm:p-4.5 rounded-xl border border-emerald-500/30 bg-white dark:bg-[#111116] relative overflow-hidden shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                        IT Specialist - HTML and CSS
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 rounded-full shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                        Active License
                      </span>
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400/90 font-semibold">
                      Certiport - A Pearson VUE Business
                    </p>
                  </div>
                </div>

                <a
                  href="/credentials/it.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all hover:scale-[1.01] active:scale-95 shrink-0 w-full sm:w-auto"
                  title="View IT Specialist HTML and CSS Credential (PDF)"
                >
                  <ExternalLink size={12} />
                  <span>View Credential</span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-neutral-200 dark:border-neutral-800 my-2 text-xs">
                <div>
                  <span className="text-[10.5px] text-neutral-500 dark:text-neutral-400 block font-medium">Issued</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-200">November 2025</span>
                </div>
                <div>
                  <span className="text-[10.5px] text-neutral-500 dark:text-neutral-400 block font-medium">Expires</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-200">November 2030</span>
                </div>
                <div>
                  <span className="text-[10.5px] text-neutral-500 dark:text-neutral-400 block font-medium">Credential ID</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">Co7F-DwVk</span>
                </div>
              </div>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Foundational and practical knowledge in web development, webpage styling, document structuring, accessibility, and responsive design principles.
              </p>
            </div>
            </ScrollReveal>

            {/* Experience & Certifications Card */}
            <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="p-3.5 sm:p-4.5 rounded-xl border border-purple-500/20 dark:border-purple-500/25 bg-white dark:bg-[#111116] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Briefcase size={15} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                    Industry Projects & Experience
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-500/15 border border-purple-200 dark:border-purple-500/30 px-2 py-0.5 rounded-full shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse" />
                  Verified Track Record
                </span>
              </div>

              {/* Experience 1: Employability Advantage Australia */}
              <div className="p-3 sm:p-3.5 rounded-lg bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">Full-Stack and Agentic AI Developer</h4>
                    <p className="text-[11px] sm:text-xs text-purple-600 dark:text-purple-400 font-semibold">Employability Advantage · AusBiz Consulting Pty Ltd</p>
                    <span className="text-[10.5px] text-neutral-500 dark:text-neutral-400 font-mono">Certificate ID: 168610825 · Sept 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.credential.net/bc9c7415-d631-4d18-b5c2-117ce7938286#acc.VWDI1UBJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-xs shadow-purple-600/25 hover:shadow-purple-600/40 transition-all shrink-0 w-full sm:w-auto"
                      title="View Verified Credential on Credential.net"
                    >
                      <ExternalLink size={11} />
                      <span>View Credential</span>
                    </a>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Completed a 10-week industry project focused on full-stack development and Amazon Web Services (AWS) Cloud under AusBiz Consulting Pty Ltd. Gained hands-on experience in front-end and back-end development, application deployment, and cloud solutions.
                </p>
              </div>

              {/* Experience 2: DOÑA ALEJANDRA INC */}
              <div className="p-3 sm:p-3.5 rounded-lg bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">Employee Attendance Tracking System</h4>
                    <p className="text-[11px] sm:text-xs text-purple-600 dark:text-purple-400 font-semibold">Doña Alejandra, Inc.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/credentials/dona.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-xs shadow-purple-600/25 hover:shadow-purple-600/40 transition-all shrink-0 w-full sm:w-auto"
                      title="View Certificate of Completion (DOÑA ALEJANDRA INC)"
                    >
                      <ExternalLink size={11} />
                      <span>View Credential</span>
                    </a>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Responsible for designing, developing, and implementing the system to streamline office processes and securely manage employee daily time records, attendance, and corporate information.
                </p>
              </div>

              {/* Leadership & Academic Affiliations */}
              <div className="p-3 sm:p-3.5 rounded-lg bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">Junior Philippine Computer Society (JPCS) – SPUP Chapter</h4>
                    <span className="text-[11px] sm:text-xs text-purple-600 dark:text-purple-400 font-semibold">Certificate of Membership · Academic Year 2025–2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/credentials/jpcs.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-xs shadow-purple-600/25 hover:shadow-purple-600/40 transition-all shrink-0 w-full sm:w-auto"
                      title="View Certificate of Membership (JPCS)"
                    >
                      <ExternalLink size={11} />
                      <span>View Credential</span>
                    </a>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  Certified bona fide member for the academic year 2025–2026. Also served as Lecturer during the SPUP Mentorship Program (April 2026), sharing tutorials, practical tips, and guidance on Capstone Development.
                </p>
              </div>
            </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Download Action & Minimal CV Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Download Action Box with Minimal CV Preview */}
            <ScrollReveal animation="slide-left" delay={0.2} className="h-full">
            <div className="relative p-3.5 sm:p-5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#111116] shadow-sm dark:shadow-none flex-1 flex flex-col justify-between h-full">
              <div className="relative z-10">
                {/* Minimal CV Header Preview */}
                <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/40 mb-4 text-left flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3">
                  <img
                    src="/robert_.jpg"
                    alt="Robert Simeon Jr."
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-neutral-300 dark:border-neutral-700 shadow-xs shrink-0"
                  />
                  <div className="min-w-0 w-full">
                    <h5 className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white truncate">
                      Robert Simeon Jr.
                    </h5>
                    <p className="text-xs text-neutral-700 dark:text-neutral-300 font-semibold truncate">
                      Full-Stack & Agentic AI Developer
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate mt-0.5">
                      Santo Niño, Cagayan, Philippines · (+63) 9215512415
                    </p>
                    <div className="flex items-center gap-1.5 mt-1 text-[11px] text-neutral-600 dark:text-neutral-400 flex-wrap justify-center sm:justify-start">
                      <a
                        href="mailto:robertsimeon12345@gmail.com"
                        className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors break-all"
                        title="robertsimeon12345@gmail.com"
                      >
                        <Mail size={11} className="shrink-0" />
                        <span className="break-all">robertsimeon12345@gmail.com</span>
                      </a>
                      <span>•</span>
                      <a
                        href="https://simeon-digital-twin.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-900 dark:hover:text-white transition-colors font-semibold text-purple-600 dark:text-purple-400"
                      >
                        Portfolio
                      </a>
                      <span>•</span>
                      <a
                        href="https://www.linkedin.com/in/robert-simeon-08063b214/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        LinkedIn
                      </a>
                      <span>•</span>
                      <a
                        href="https://github.com/jacksimeon1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1 tracking-tight">
                    Professional Curriculum Vitae
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                    Clean, minimal, monochromatic print-ready format including photo, contact details, verified credentials, and software projects.
                  </p>
                </div>

                <div className="space-y-2">
                  <a
                    href="/Robert_Simeon_Jr_Resume.pdf"
                    download="Robert_Simeon_Jr_Resume.pdf"
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg transition-all duration-200 shadow-sm shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-purple-100" />
                    <span>Download Resume (PDF)</span>
                    <span className="ml-1 text-[10px] font-normal py-0.5 px-1.5 rounded bg-white/20 text-white">PDF</span>
                  </a>

                  <HydrationSafeButton
                    onClick={() => handleDownload('txt')}
                    className="w-full flex items-center justify-center gap-2 px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                    <span>Export Plain Text (.txt)</span>
                  </HydrationSafeButton>
                </div>

                {/* Trust badges */}
                <div className="mt-3.5 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Minimal & ATS-Ready</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-3 h-3" />
                    <span>Photo Included</span>
                  </span>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Call to Action for Clients */}
        <ScrollReveal animation="fade-up" delay={0.15}>
        <div className="p-3.5 sm:p-4.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#111116] text-center flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <div className="text-center sm:text-left">
            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Ready to work on your next project?</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100 animate-ping" />
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
              Available for full-time engineering positions, contract development, and client projects.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
            <a
              href="#contact"
              className="px-3.5 py-2 bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-xs font-semibold rounded-lg transition-all shadow-xs text-center justify-center"
            >
              Contact Me Directly
            </a>
            <a
              href="#chat"
              className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 transition-colors text-center justify-center"
            >
              Ask My Digital Twin
            </a>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
