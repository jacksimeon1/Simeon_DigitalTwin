/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imgBase64 = fs.readFileSync(path.join(__dirname, '../public/robert_.jpg')).toString('base64');
const imgSrc = `data:image/jpeg;base64,${imgBase64}`;

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Robert Simeon Jr. - Curriculum Vitae</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 12mm 14mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #18181b;
      background: #ffffff;
      padding: 10px 15px;
      font-size: 14px;
      -webkit-font-smoothing: antialiased;
    }
    .cv-container {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      padding: 0;
    }
    
    /* Header Section */
    .header {
      display: flex;
      align-items: center;
      gap: 22px;
      padding-bottom: 16px;
      border-bottom: 2px solid #18181b;
    }
    .profile-photo {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      object-fit: cover;
      border: 1.5px solid #d4d4d8;
      flex-shrink: 0;
      background: #f4f4f5;
    }
    .header-info {
      flex: 1;
    }
    .name {
      font-size: 28px;
      font-weight: 800;
      color: #09090b;
      letter-spacing: -0.3px;
      line-height: 1.1;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 15px;
      font-weight: 600;
      color: #4b5563;
      margin-top: 5px;
      letter-spacing: 0.3px;
    }
    .contact-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 6px 24px;
      margin-top: 10px;
      font-size: 13px;
      color: #374151;
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }
    .contact-item a {
      color: #18181b;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .contact-item.full-width,
    .contact-grid .contact-item:last-child {
      grid-column: 1 / -1;
    }
    .contact-label {
      font-weight: 700;
      color: #111827;
      display: inline-block;
      min-width: 68px;
    }

    /* Section Headings */
    h2 {
      font-size: 15px;
      font-weight: 800;
      color: #09090b;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      margin-top: 18px;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1.5px solid #18181b;
    }

    /* Content Styling */
    .about-text {
      font-size: 13.5px;
      line-height: 1.65;
      color: #27272a;
      text-align: justify;
    }

    /* Skills Grid */
    .skills-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 13px;
      color: #27272a;
    }
    .skill-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      line-height: 1.55;
    }
    .skill-label {
      width: 140px;
      font-weight: 700;
      color: #09090b;
      flex-shrink: 0;
      font-size: 13.5px;
    }
    .skill-list {
      color: #27272a;
      flex: 1;
      font-size: 13px;
    }

    /* Awards & Certifications */
    .cert-item {
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .cert-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .cert-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #09090b;
    }
    .cert-meta {
      font-size: 12.5px;
      color: #6b7280;
      font-weight: 600;
    }
    .cert-desc {
      font-size: 12.5px;
      color: #374151;
      line-height: 1.6;
      margin-top: 3px;
      text-align: justify;
    }
    .cert-link {
      color: #18181b;
      text-decoration: underline;
      font-weight: 600;
      font-size: 12.5px;
      margin-left: 4px;
    }

    /* Projects */
    .project-item {
      margin-bottom: 12px;
      page-break-inside: avoid;
    }
    .project-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #09090b;
    }
    .project-role {
      font-size: 12.5px;
      font-weight: 600;
      color: #4b5563;
      margin-left: 6px;
      font-style: italic;
    }
    .project-desc {
      font-size: 12.5px;
      color: #374151;
      line-height: 1.6;
      margin-top: 3px;
      text-align: justify;
    }

    /* Education */
    .edu-item {
      margin-bottom: 10px;
      page-break-inside: avoid;
    }
    .edu-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .edu-degree {
      font-size: 13.5px;
      font-weight: 700;
      color: #09090b;
    }
    .edu-school {
      font-size: 13px;
      color: #4b5563;
      font-weight: 500;
    }
    .edu-date {
      font-size: 12.5px;
      color: #6b7280;
      font-weight: 600;
    }
    .edu-honors {
      font-size: 12.5px;
      font-weight: 700;
      color: #18181b;
      font-style: italic;
      margin-left: 6px;
    }

    @media print {
      body {
        background: #ffffff;
        padding: 0;
      }
      .cv-container {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      a {
        text-decoration: underline;
        color: #18181b;
      }
    }
  </style>
</head>
<body>
  <div class="cv-container">
    <!-- Header -->
    <div class="header">
      <img src="${imgSrc}" alt="Robert Simeon Jr." class="profile-photo" />
      <div class="header-info">
        <h1 class="name">Robert Simeon Jr.</h1>
        <div class="subtitle">Full-Stack & Agentic AI Developer • BSIT</div>
        <div class="contact-grid">
          <div class="contact-item">
            <span class="contact-label">Phone:</span>
            <span>(+63) 9215512415</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">Email:</span>
            <a href="mailto:robertsimeon12345@gmail.com">robertsimeon12345@gmail.com</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">Portfolio:</span>
            <a href="https://simeon-digital-twin.vercel.app/" target="_blank" rel="noopener noreferrer">simeon-digital-twin.vercel.app</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">LinkedIn:</span>
            <a href="https://www.linkedin.com/in/robert-simeon-08063b214/" target="_blank" rel="noopener noreferrer">linkedin.com/in/robert-simeon-08063b214</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">GitHub:</span>
            <a href="https://github.com/jacksimeon1" target="_blank" rel="noopener noreferrer">github.com/jacksimeon1</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">Facebook:</span>
            <a href="https://www.facebook.com/jackieeeeeeeeeeeeeeee/" target="_blank" rel="noopener noreferrer">facebook.com/jackieeeeeeeeeeeeeeee</a>
          </div>
          <div class="contact-item full-width">
            <span class="contact-label">Address:</span>
            <span>Santo Niño, Cagayan, Philippines</span>
          </div>
        </div>
      </div>
    </div>

    <!-- About Me -->
    <h2>About Me</h2>
    <p class="about-text">
      I build software that makes life easier for people. With a background in full-stack development and autonomous AI systems, I enjoy taking an idea from scratch and turning it into a fast, functional, and easy-to-use digital product. Whether I'm collaborating with a team on core system architecture or experimenting with emerging tech to automate tedious workflows, I focus on clean execution and practical results. I am always learning, quick to adapt, and eager to bring my energy and problem-solving mindset to a team focused on real-world impact.
    </p>

    <!-- Education -->
    <h2>Education</h2>
    <div class="edu-item">
      <div class="edu-header">
        <div>
          <span class="edu-degree">Bachelor of Science in Information Technology (BSIT)</span>
          <span class="edu-school"> — St. Paul University Philippines</span>
        </div>
        <span class="edu-date">2022-(June 2026)</span>
      </div>
    </div>
    <div class="edu-item">
      <div class="edu-header">
        <div>
          <span class="edu-degree">STEM Strand (Science, Technology, Engineering, and Mathematics)</span>
          <span class="edu-school"> — St. Paul University Philippines</span>
          <span class="edu-honors">(WITH HONORS)</span>
        </div>
        <span class="edu-date">2021 – 2022</span>
      </div>
    </div>

    <!-- Technical Skills -->
    <h2>Technical Skills</h2>
    <div class="skills-block">
      <div class="skill-row">
        <span class="skill-label">Frontend:</span>
        <span class="skill-list">React, Next.js, TypeScript, Tailwind CSS, HTML/CSS, JavaScript, Bootstrap</span>
      </div>
      <div class="skill-row">
        <span class="skill-label">Backend:</span>
        <span class="skill-list">Node.js, Python, Express.js, PostgreSQL, MongoDB, PHP, Laravel, MySQL, NextAuth/Auth.js, Java</span>
      </div>
      <div class="skill-row">
        <span class="skill-label">Tools & Platforms:</span>
        <span class="skill-list">Git, Docker, AWS, Vercel, Figma</span>
      </div>
    </div>

    <!-- Awards and Certifications -->
    <h2>Awards & Certifications</h2>
    
    <div class="cert-item">
      <div class="cert-header">
        <span class="cert-title">Full Stack Developer — Employability Advantage Australia</span>
        <span class="cert-meta">Certificate ID: 168610825 | 2025</span>
      </div>
      <div class="cert-desc">
        Credential link: <a href="https://www.credential.net/bc9c7415-d631-4d18-b5c2-117ce7938286#acc.VWDI1UBJ" target="_blank" rel="noopener noreferrer" class="cert-link">credential.net/bc9c7415-d631-4d18-b5c2-117ce7938286</a>
      </div>
    </div>

    <div class="cert-item">
      <div class="cert-header">
        <span class="cert-title">EMPLOYABILITY ADVANTAGE | FULL-STACK AND AGENTIC AI DEVELOPER</span>
        <span class="cert-meta">Sept 2025</span>
      </div>
      <p class="cert-desc">
        Completed a 10-week industry project focused on full-stack development and Amazon Web Services (AWS) Cloud under AusBiz Consulting Pty Ltd. Gained hands-on experience in front-end and back-end development, application deployment, cloud-based solutions, and modern software development practices, further strengthening technical, analytical, and problem-solving skills in real-world project environments.
      </p>
    </div>

    <div class="cert-item">
      <div class="cert-header">
        <span class="cert-title">CERTIPORT | INFORMATION TECHNOLOGY SPECIALIST - HTML & CSS</span>
        <span class="cert-meta">Nov 2025</span>
      </div>
      <p class="cert-desc">
        Successfully passed the Information Technology Specialist (ITS) certification examination in HTML and CSS, demonstrating foundational and practical knowledge in web development, webpage styling, document structuring, accessibility, and responsive design principles.
      </p>
      <div class="cert-desc" style="margin-top: 2px;">
        Verification ID: Co7F-DwVk
      </div>
    </div>

    <div class="cert-item">
      <div class="cert-header">
        <span class="cert-title">Certificate of Membership – Junior Philippine Computer Society (JPCS) – SPUP Chapter</span>
        <span class="cert-meta">January 15, 2026</span>
      </div>
      <p class="cert-desc">
        Certified as a bona fide member of the Junior Philippine Computer Society (JPCS) – SPUP Chapter at St. Paul University Philippines for the academic year 2025–2026, entitled to the rights, benefits, and privileges associated with the organization’s membership.
      </p>
    </div>

    <div class="cert-item">
      <div class="cert-header">
        <span class="cert-title">ST. PAUL UNIVERSITY PHILIPPINES | MENTORSHIP PROGRAM</span>
        <span class="cert-meta">April 2026</span>
      </div>
      <p class="cert-desc">
        Became a lecturer during the Mentorship Program for Information Technology students by sharing tutorials, practical tips, and guidance on Capstone Development.
      </p>
    </div>

    <!-- Projects -->
    <h2>Projects</h2>

    <div class="project-item">
      <div>
        <span class="project-title">IN-OFF CAMPUS ACTIVITY SCHEDULING INFORMATION SYSTEM</span>
        <span class="project-role">— PHP, Laravel, Bootstrap, MySQL</span>
      </div>
      <p class="project-desc">
        Developed a centralized platform for managing and organizing on-campus and off-campus activity schedules, featuring a conflict detection mechanism that identifies overlapping schedules and helps prevent scheduling conflicts. The system improves activity coordination, information management, and accessibility while streamlining administrative processes.
      </p>
    </div>

    <div class="project-item">
      <div>
        <span class="project-title">SANTO NIÑO BUILDING PERMIT SYSTEM</span>
        <span class="project-role">— PHP, MySQL, Bootstrap</span>
      </div>
      <p class="project-desc">
        A specialized municipal e-governance platform designed for the Local Government Unit of Santo Niño, Cagayan. Automates citizen building permit applications, blueprint and floor plan submissions, municipal administrative evaluations, cashier payment processing, and revenue reporting.
      </p>
    </div>

    <div class="project-item">
      <div>
        <span class="project-title">CAPSTONE AI TITLE GENERATOR</span>
        <span class="project-role">— Next.js, React, TypeScript, Tailwind CSS</span>
      </div>
      <p class="project-desc">
        An open-source AI-powered academic research platform and thesis title synthesis engine with live heuristic validation sandbox and interactive title verification. Live Demo: <a href="https://jacksimeon1.github.io/capstone-title-ai/" target="_blank" rel="noopener noreferrer" class="cert-link">jacksimeon1.github.io/capstone-title-ai</a> · GitHub: <a href="https://github.com/jacksimeon1/capstone-title-ai" target="_blank" rel="noopener noreferrer" class="cert-link">github.com/jacksimeon1/capstone-title-ai</a>
      </p>
    </div>

    <div class="project-item">
      <div>
        <span class="project-title">SIP 3D – 3D BEVERAGE SHOWCASE WEBSITE</span>
        <span class="project-role">— Three.js, CSS 3D Transforms, JavaScript ES6+, HTML5 Canvas</span>
      </div>
      <p class="project-desc">
        Interactive 3D beverage showcase and animation demonstration website featuring real-time 360° can cylinder rotation physics, multi-flavor switching, dynamic kinetic typography, and canvas particle effects. Live Demo: <a href="https://jacksimeon1.github.io/3d-can-animation/" target="_blank" rel="noopener noreferrer" class="cert-link">jacksimeon1.github.io/3d-can-animation</a> · GitHub: <a href="https://github.com/jacksimeon1/3d-can-animation" target="_blank" rel="noopener noreferrer" class="cert-link">github.com/jacksimeon1/3d-can-animation</a>
      </p>
    </div>

    <div class="project-item">
      <div>
        <span class="project-title">3D ROOM – ISOMETRIC 3D ROOM & STUDIO</span>
        <span class="project-role">— CSS 3D Transforms, JavaScript ES6+, HTML5 Canvas</span>
      </div>
      <p class="project-desc">
        Interactive isometric 3D living sanctuary and studio showcase built with pure CSS 3D spatial transforms. Features real-time camera perspective rotation, dynamic ambient lighting presets, interactive room elements, animated TV display, and relaxing soundscapes. Live Demo: <a href="https://jacksimeon1.github.io/3D-Room/" target="_blank" rel="noopener noreferrer" class="cert-link">jacksimeon1.github.io/3D-Room</a> · GitHub: <a href="https://github.com/jacksimeon1/3D-Room" target="_blank" rel="noopener noreferrer" class="cert-link">github.com/jacksimeon1/3D-Room</a>
      </p>
    </div>

    <div class="project-item">
      <div>
        <span class="project-title">EMPLOYEE ATTENDANCE TRACKING SYSTEM</span>
        <span class="project-role">— PHP, MySQL, Bootstrap (Doña Alejandra, Inc.)</span>
      </div>
      <p class="project-desc">
        Developed the Employee Attendance Tracking System for Doña Alejandra, Inc. responsible for designing, developing, and implementing the system to help streamline office processes and securely manage employee daily time records, attendance, and corporate information.
      </p>
    </div>
  </div>
</body>
</html>`;

const tempHtml = path.join(__dirname, '../public/temp_resume.html');
const outputPdf = path.join(__dirname, '../public/Robert_Simeon_Jr_Resume.pdf');

fs.writeFileSync(tempHtml, htmlContent, 'utf-8');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const cmd = `"${edgePath}" --headless --disable-gpu --no-margins --print-to-pdf="${outputPdf}" "file://${tempHtml.replace(/\\/g, '/')}"`;

console.log('Generating PDF with headless Edge...');
execSync(cmd, { stdio: 'inherit' });

if (fs.existsSync(tempHtml)) {
  fs.unlinkSync(tempHtml);
}

if (fs.existsSync(outputPdf)) {
  const stats = fs.statSync(outputPdf);
  console.log(`Success! PDF generated at ${outputPdf} (${stats.size} bytes)`);
} else {
  console.error('Failed to generate PDF');
}
