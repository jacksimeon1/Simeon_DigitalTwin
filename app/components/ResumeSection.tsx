'use client';

import { Download, FileText, Award, Briefcase, GraduationCap, Calendar } from 'lucide-react';

export default function ResumeSection() {
  const handleDownload = (format: 'pdf' | 'txt') => {
    const resumeContent = `
ROBERT SIMEON JR.
4th Year IT Student @ SPUP

CONTACT
📧 robertsimeon12345@gmail.com
📱 +63 912 345 6789
🔗 linkedin.com/in/robert-simeon
🐙 github.com/jacksimeon1

EDUCATION
St. Paul University Philippines
Bachelor of Science in Information Technology
Expected Graduation: 2025

SKILLS
• Programming: JavaScript, Python, Java, C++
• Web Development: React, Next.js, Node.js, HTML/CSS
• Database: MySQL, MongoDB, PostgreSQL
• Tools: Git, VS Code, Figma, Docker
• Soft Skills: Problem-solving, Teamwork, Communication

CERTIFICATIONS
• HTML and CSS Certification - Professional Web Development
  ✅ PASSED - Demonstrated proficiency in HTML5, CSS3, responsive design, and modern web standards

PROJECTS
1. In-Off Campus Activity Scheduling Information System
   - Comprehensive event management system
   - Technologies: React, Node.js, MongoDB

2. E-Bayo E-commerce Platform
   - Full-stack online shopping platform
   - Technologies: React, Node.js, Payment Gateway

3. AI-Powered Student Assistant Chatbot
   - NLP-based academic support system
   - Technologies: Python, TensorFlow, NLP

4. Student Grade Calculator
   - Academic progress tracking tool
   - Technologies: HTML, CSS, JavaScript

ACHIEVEMENTS
• Dean's List - 3 consecutive semesters
• Best IT Project Award - SPUP Tech Fair 2024
• Active member - IT Student Society
• Community Service Volunteer - 200+ hours

LANGUAGES
• English (Fluent)
• Filipino (Native)
• Basic Japanese

INTERESTS
Web Development, AI/ML, Game Development, UI/UX Design
    `;

    if (format === 'pdf') {
      // Create PDF using jsPDF-like approach (simplified version)
      createPDF(resumeContent);
    } else {
      // Create TXT file
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

  const createPDF = (content: string) => {
    // Create a simple PDF-like HTML document
    const pdfContent = `
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          margin: 40px;
          color: #333;
        }
        h1 { 
          color: #1e40af; 
          border-bottom: 2px solid #1e40af;
          padding-bottom: 10px;
        }
        h2 { 
          color: #3730a3; 
          margin-top: 30px;
          border-left: 4px solid #3730a3;
          padding-left: 10px;
        }
        .contact { 
          background: #f8fafc; 
          padding: 15px; 
          border-radius: 5px;
          margin: 20px 0;
        }
        .project { 
          margin: 15px 0; 
          padding: 10px;
          border-left: 3px solid #10b981;
        }
        ul { 
          margin: 10px 0; 
        }
        li { 
          margin: 5px 0; 
        }
      </style>
    </head>
    <body>
      <h1>ROBERT SIMEON JR.</h1>
      <p><strong>4th Year IT Student @ SPUP</strong></p>
      
      <div class="contact">
        <h2>CONTACT</h2>
        <p>📧 robertsimeon12345@gmail.com</p>
        <p>📱 +63 912 345 6789</p>
        <p>🔗 linkedin.com/in/robert-simeon</p>
        <p>🐙 github.com/jacksimeon1</p>
      </div>

      <h2>EDUCATION</h2>
      <p><strong>St. Paul University Philippines</strong><br>
      Bachelor of Science in Information Technology<br>
      Expected Graduation: 2025</p>

      <h2>SKILLS</h2>
      <ul>
        <li><strong>Programming:</strong> JavaScript, Python, Java, C++</li>
        <li><strong>Web Development:</strong> React, Next.js, Node.js, HTML/CSS</li>
        <li><strong>Database:</strong> MySQL, MongoDB, PostgreSQL</li>
        <li><strong>Tools:</strong> Git, VS Code, Figma, Docker</li>
        <li><strong>Soft Skills:</strong> Problem-solving, Teamwork, Communication</li>
      </ul>

      <h2>CERTIFICATIONS</h2>
      <div class="project">
        <p><strong>HTML and CSS Certification - Professional Web Development</strong><br>
        ✅ <strong>PASSED</strong> - Demonstrated proficiency in HTML5, CSS3, responsive design, and modern web standards</p>
      </div>

      <h2>PROJECTS</h2>
      <div class="project">
        <p><strong>1. In-Off Campus Activity Scheduling Information System</strong><br>
        Comprehensive event management system<br>
        <em>Technologies: React, Node.js, MongoDB</em></p>
      </div>
      <div class="project">
        <p><strong>2. E-Bayo E-commerce Platform</strong><br>
        Full-stack online shopping platform<br>
        <em>Technologies: React, Node.js, Payment Gateway</em></p>
      </div>
      <div class="project">
        <p><strong>3. AI-Powered Student Assistant Chatbot</strong><br>
        NLP-based academic support system<br>
        <em>Technologies: Python, TensorFlow, NLP</em></p>
      </div>
      <div class="project">
        <p><strong>4. Student Grade Calculator</strong><br>
        Academic progress tracking tool<br>
        <em>Technologies: HTML, CSS, JavaScript</em></p>
      </div>

      <h2>ACHIEVEMENTS</h2>
      <ul>
        <li>Dean's List - 3 consecutive semesters</li>
        <li>Best IT Project Award - SPUP Tech Fair 2024</li>
        <li>Active member - IT Student Society</li>
        <li>Community Service Volunteer - 200+ hours</li>
      </ul>

      <h2>LANGUAGES</h2>
      <ul>
        <li>English (Fluent)</li>
        <li>Filipino (Native)</li>
        <li>Basic Japanese</li>
      </ul>

      <h2>INTERESTS</h2>
      <p>Web Development, AI/ML, Game Development, UI/UX Design</p>
    </body>
    </html>
    `;

    // Create a new window and print to PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print dialog
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }
  };

  const resumeHighlights = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: "Education",
      value: "BS IT @ SPUP",
      color: "blue"
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Experience",
      value: "4+ Projects",
      color: "purple"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Certified",
      value: "HTML/CSS",
      color: "pink"
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Availability",
      value: "Open to Work",
      color: "green"
    }
  ];

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Resume & CV
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Download my comprehensive resume to learn more about my skills, experience, and qualifications.
          </p>
        </div>

        {/* Resume Preview Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Resume Preview */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-slide-in-left border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Resume Preview</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Updated November 2024</p>
              </div>
            </div>

            {/* Resume Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {resumeHighlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className="group bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`flex items-center gap-2 text-${highlight.color}-600 dark:text-${highlight.color}-400 mb-2`}>
                    {highlight.icon}
                    <span className="text-sm font-medium">{highlight.title}</span>
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:scale-105 transition-transform">
                    {highlight.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills Preview */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
              <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Key Skills</h4>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'Git'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full hover:scale-105 transition-transform"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Download Section */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-slide-in-right border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 animate-bounce-3d">
                <Download className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Download Resume
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm">
                Download my professional resume in PDF format with detailed project descriptions, skills, and certifications.
              </p>

              {/* Download Button */}
              <div className="w-full">
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 group"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  Download Resume (PDF)
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  📄 Professional PDF format with Education, Projects, Skills, Certifications, and Contact Information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up">
          {[
            { label: 'Projects Completed', value: '10+', icon: '🚀' },
            { label: 'Technologies', value: '15+', icon: '💻' },
            { label: 'Years Experience', value: '2+', icon: '⏰' },
            { label: 'GPA', value: '3.8', icon: '📚' }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-lg hover:shadow-lg dark:hover:shadow-blue-500/20 transition-all cursor-pointer transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                {stat.value}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
