# Portfolio Customization Guide

This guide provides the exact file paths and code locations where you need to replace placeholder data with your own personal and professional information.

---

## 📋 Table of Contents
1. [Personal Identity](#1-personal-identity)
2. [Skills & Tech Stack](#2-skills--tech-stack)
3. [Projects Section](#3-projects-section)
4. [Experience/Employment](#4-experienceemployment)
5. [Education](#5-education)
6. [Configuration & SEO](#6-configuration--seo)
7. [Images & Assets](#7-images--assets)
8. [Environment Variables](#8-environment-variables)

---

## 1. Personal Identity

### File: `utils/data/personal-data.js`
**Location:** Lines 1-18

This is the PRIMARY file containing all your personal information. Replace all values:

```javascript
// CURRENT (Placeholder):
export const personalData = {
  name: "ABU SAID",
  profile: '/profile.png',
  designation: "Software Developer",
  description: "My name is ABU SAID. I am a professional and enthusiastic programmer...",
  email: 'abusaid7388@gmail.com',
  phone: '+8801608797655',
  address: 'Middle Badda, Dhaka, Bangladesh - 1212 ',
  github: 'https://github.com/said7388',
  facebook: 'https://www.facebook.com/abusaid.riyaz/',
  linkedIn: 'https://www.linkedin.com/in/abu-said-bd/',
  twitter: 'https://twitter.com/said7388',
  stackOverflow: 'https://stackoverflow.com/users/16840768/abu-said',
  leetcode: "https://leetcode.com/said3812/",
  devUsername: "said7388",  // Dev.to username for fetching blog posts
  resume: "https://drive.google.com/file/d/1eyutpKFFhJ9X-qpQGKhUNnVRkB5Wer00/view?usp=sharing"
}

// REPLACE WITH YOUR INFO:
export const personalData = {
  name: "YOUR NAME",
  profile: '/profile.png',  // See Section 7 for image setup
  designation: "Your Job Title",  // e.g., "Full Stack Developer"
  description: "Write your professional bio here. Include your skills, interests, and what you're looking for...",
  email: 'your.email@gmail.com',
  phone: '+1234567890',
  address: 'Your City, Your Country - Postal Code',
  github: 'https://github.com/your-username',
  facebook: 'https://www.facebook.com/your-profile/',
  linkedIn: 'https://www.linkedin.com/in/your-profile/',
  twitter: 'https://twitter.com/your-username',
  stackOverflow: 'https://stackoverflow.com/users/YOUR_ID/your-username',
  leetcode: "https://leetcode.com/your-username/",
  devUsername: "your-dev-to-username",  // Used to fetch your blog posts
  resume: "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"  // Your resume link
}
```

### File: `utils/data/contactsData.js`
**Location:** Lines 1-10

This mirrors the contact info from `personal-data.js`:

```javascript
// CURRENT:
export const contactsData = {
    email: 'abusaid7388@gmail.com',
    phone: '+8801608797655',
    address: 'Middle Badda, Dhaka, Bangladesh - 1212 ',
    github: 'https://github.com/said7388',
    facebook: 'https://www.facebook.com/abusaid.riyaz/',
    linkedIn: 'https://www.linkedin.com/in/abu-said-bd/',
    twitter: 'https://twitter.com/said7388',
    stackOverflow: 'https://stackoverflow.com/users/16840768/abu-said',
    devUsername: "said7388"
}

// REPLACE WITH YOUR INFO (same as personal-data.js):
export const contactsData = {
    email: 'your.email@gmail.com',
    phone: '+1234567890',
    address: 'Your City, Your Country - Postal Code',
    github: 'https://github.com/your-username',
    facebook: 'https://www.facebook.com/your-profile/',
    linkedIn: 'https://www.linkedin.com/in/your-profile/',
    twitter: 'https://twitter.com/your-username',
    stackOverflow: 'https://stackoverflow.com/users/YOUR_ID/your-username',
    devUsername: "your-dev-to-username"
}
```

### Where Personal Data is Used:
- **About Section**: `app/components/homepage/about/index.jsx` - Displays your profile image and description
- **Hero Section**: `app/components/homepage/hero-section/index.jsx` - Shows name and designation
- **Footer**: `app/components/footer.jsx` - Displays contact links and social media
- **Contact Form**: `app/components/homepage/contact/contact-form.jsx` - Pre-fills email field

---

## 2. Skills & Tech Stack

### File: `utils/data/skills.js`
**Location:** Lines 1-21

This is a simple array of your skills. Replace with your technologies:

```javascript
// CURRENT:
export const skillsData = [
  'HTML',
  'CSS',
  'Javascript',
  'Typescript',
  'React',
  'Next JS',
  'Tailwind',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Git',
  'AWS',
  'Bootstrap',
  'Docker',
  'Go',
  'Figma',
  'Firebase',
  'MaterialUI',
  'Nginx',
  'Strapi'
]

// REPLACE WITH YOUR SKILLS:
export const skillsData = [
  'HTML',
  'CSS',
  'Javascript',
  'React',
  // ... add your actual skills
  // Available skills are listed in comments below (lines 22-100)
]
```

### Available Skills (from lines 22-100):
The file contains a commented list of all supported skills with icons. Choose from:
- **Frontend:** HTML, CSS, React, Vue, Angular, Next JS, Nuxt JS, Svelte
- **Backend:** Node JS, Django, PHP
- **Languages:** JavaScript, TypeScript, Python, Java, C++, Go, Kotlin, etc.
- **Databases:** MongoDB, MySQL, PostgreSQL, MemSQL
- **Tools:** Docker, Git, AWS, Azure, GCP, Firebase, Figma
- **Styling:** Tailwind, Bootstrap, SCSS, MaterialUI
- **Design:** Photoshop, Illustrator, Adobe XD, Figma, Canva

⚠️ **Important:** Spellings must match exactly. Copy directly from the available list.

---

## 3. Projects Section

### File: `utils/data/projects-data.js`
**Location:** Lines 1-55

This array contains your projects. Replace the 4 example projects with yours:

```javascript
// CURRENT STRUCTURE:
export const projectsData = [
    {
        id: 1,
        name: 'AI Powered Financial App',
        description: "Description of the project...",
        tools: ['Express', 'MongoDB', 'OpenAI API', 'AWS SES', 'AWS S3'],
        role: 'Backend Developer',
        code: '',  // GitHub repo link
        demo: '',  // Live demo link
    },
    // ... more projects
];

// YOUR PROJECT TEMPLATE:
export const projectsData = [
    {
        id: 1,
        name: 'Project Title',
        description: "Detailed description of what the project does, technologies used, and your role.",
        tools: ['React', 'Node.js', 'MongoDB'],  // Technologies used
        role: 'Full Stack Developer',  // Your role in the project
        code: 'https://github.com/your-username/repo-name',  // GitHub link
        demo: 'https://project-live-link.com',  // Live demo link
    },
    {
        id: 2,
        name: 'Project 2 Title',
        description: "Description...",
        tools: ['Next.js', 'Tailwind CSS', 'Firebase'],
        role: 'Frontend Developer',
        code: 'https://github.com/your-username/repo-name',
        demo: 'https://project-link.com',
    },
    // Add more projects (keep the same structure)
];
```

### Important Notes:
- **id:** Must be unique incrementing numbers (1, 2, 3, 4...)
- **code & demo:** Leave empty strings `''` if not available
- **tools:** Must match exactly with available tech stack
- **Do not remove any property** - leave empty strings instead

---

## 4. Experience/Employment

### File: `utils/data/experience.js`
**Location:** Lines 1-14

Update your work experience:

```javascript
// CURRENT:
export const experiences = [
  {
    id: 1,
    title: 'Software Engineer I',
    company: "Teton Private Ltd.",
    duration: "(Jan 2022 - Present)"
  },
  {
    id: 2,
    title: "FullStack Developer",
    company: "Fiverr (freelance)",
    duration: "(Jun 2021 - Jan 2022)"
  },
  {
    id: 3,
    title: "Self Employed",
    company: "Code and build something in everyday.",
    duration: "(Jan 2018 - Present)"
  }
]

// REPLACE WITH YOUR EXPERIENCE:
export const experiences = [
  {
    id: 1,
    title: 'Your Job Title',
    company: "Company Name",
    duration: "(Month Year - Present)"  // or end date
  },
  {
    id: 2,
    title: "Another Job Title",
    company: "Another Company",
    duration: "(Month Year - Month Year)"
  },
  // Add more experiences as needed
]
```

---

## 5. Education

### File: `utils/data/educations.js`
**Location:** Lines 1-16

Update your education details:

```javascript
// CURRENT:
export const educations = [
  {
    id: 1,
    title: "Bachelor Degree",
    duration: "2020 - Present",
    institution: "National University of Bangladesh",
  },
  {
    id: 2,
    title: "Higher Secondary Certificate",
    duration: "2018 - 2020",
    institution: "Noakhali Islamia Kamil Madrasah",
  },
  {
    id: 3,
    title: "Secondary School Certificate",
    duration: "2008 - 2018",
    institution: "Baitus Saif Islamia Madrasah",
  }
]

// REPLACE WITH YOUR EDUCATION:
export const educations = [
  {
    id: 1,
    title: "Bachelor of Science in Computer Science",
    duration: "2020 - 2024",
    institution: "University Name",
  },
  {
    id: 2,
    title: "High School Diploma",
    duration: "2018 - 2020",
    institution: "School Name",
  },
  // Add more education as needed
]
```

---

## 6. Configuration & SEO

### File: `app/layout.js`
**Location:** Lines 12-18

Update the metadata for SEO and page title:

```javascript
// CURRENT:
export const metadata = {
  title: "Portfolio of Abu Said - Software Developer",
  description:
    "This is the portfolio of Abu Said. I am a full stack developer and a self taught developer. I love to learn new things and I am always open to collaborating with others. I am a quick learner and I am always looking for new challenges.",
};

// REPLACE WITH YOUR INFO:
export const metadata = {
  title: "Portfolio of YOUR NAME - Your Job Title",
  description:
    "Professional portfolio of YOUR NAME. I am a [your profession] with expertise in [your skills]. [Add a compelling description of who you are and what you do].",
};
```

### File: `package.json`
**Location:** Lines 1-3

Update package metadata (optional but recommended):

```json
// CURRENT:
{
  "name": "developer-portfolio",
  "description": "Portfolio of Abu Said",
  "version": "0.1.0",
  ...
}

// UPDATE TO:
{
  "name": "your-portfolio",
  "description": "Portfolio of YOUR NAME",
  "version": "0.1.0",
  ...
}
```

### File: `.env.example` (then create `.env.local`)
**Location:** Lines 1-6

These are optional integrations for enhanced functionality:

```bash
# CURRENT (.env.example):
NEXT_PUBLIC_GTM =                          # Google Tag Manager ID (optional)
NEXT_PUBLIC_APP_URL = 
TELEGRAM_BOT_TOKEN =                       # Telegram bot for contact form (optional)
TELEGRAM_CHAT_ID = 
GMAIL_PASSKEY =                            # Gmail App Password for contact form
EMAIL_ADDRESS =

# TO USE CONTACT FORM, CREATE .env.local WITH:
NEXT_PUBLIC_GTM = G-XXXXXXXXXXXX           # Optional: Your GTM ID
NEXT_PUBLIC_APP_URL = https://your-domain.com
TELEGRAM_BOT_TOKEN = your_bot_token        # Optional: For Telegram notifications
TELEGRAM_CHAT_ID = your_chat_id
GMAIL_PASSKEY = your_gmail_app_password    # Required for contact form
EMAIL_ADDRESS = your.email@gmail.com       # Where contact form submissions go
```

---

## 7. Images & Assets

### Profile Picture
**File:** `public/profile.png`

Replace the placeholder profile image:
1. Save your profile picture as `profile.png`
2. Place it in the `public/` folder
3. **Recommended:** 280x280px, square crop, professional appearance

### Project Screenshots/Images
**Files:** `public/image/` directory

Add project screenshots if needed:
1. Create folders for each project
2. Update the project data file to reference images (if your components support it)

### Logo & Icons
**Files:** `app/assets/svg/` directories

Replace SVG icons if desired:
- `skills/` - Technology icons
- `experience/` - Company logos
- `education/` - School logos
- `projects/` - Project icons

---

## 8. Environment Variables

### Setup Contact Form (Optional)

The contact form sends messages via:
1. **Email** (using Gmail)
2. **Telegram** (optional notifications)

#### Step 1: Gmail Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Create an App Password: https://myaccount.google.com/apppasswords
3. Copy the 16-character password

#### Step 2: Create `.env.local` File
Create a new file: `d:\my_PROJECTS\PORTFOLIO\developer-portfolio\.env.local`

```bash
NEXT_PUBLIC_GTM = 
NEXT_PUBLIC_APP_URL = https://your-domain.com
TELEGRAM_BOT_TOKEN = 
TELEGRAM_CHAT_ID = 
GMAIL_PASSKEY = your-16-char-app-password
EMAIL_ADDRESS = your.email@gmail.com
```

#### Step 3: Telegram Setup (Optional)
To receive notifications when someone submits the contact form:
1. Create a bot with [@BotFather](https://t.me/botfather) on Telegram
2. Get your Chat ID from [@userinfobot](https://t.me/userinfobot)
3. Add to `.env.local`

---

## 📝 Quick Checklist

Use this checklist to ensure you've customized everything:

### Personal Information
- [ ] `utils/data/personal-data.js` - Updated name, bio, contact info
- [ ] `utils/data/contactsData.js` - Updated contact details
- [ ] `public/profile.png` - Replaced with your profile picture

### Skills & Content
- [ ] `utils/data/skills.js` - Updated with your skills
- [ ] `utils/data/projects-data.js` - Added your projects
- [ ] `utils/data/experience.js` - Updated work experience
- [ ] `utils/data/educations.js` - Updated education

### SEO & Configuration
- [ ] `app/layout.js` - Updated page title and description
- [ ] `package.json` - Updated project name and description
- [ ] `.env.local` - Created with your Gmail credentials (for contact form)

### Optional
- [ ] Google Tag Manager ID added to `.env.local`
- [ ] Telegram bot setup for notifications
- [ ] Project screenshots added to `public/image/`

---

## 🔗 References

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **React Icons:** https://react-icons.github.io/react-icons/
- **Gmail App Passwords:** https://myaccount.google.com/apppasswords
- **Telegram Bot Setup:** https://core.telegram.org/bots#botfather

---

## ✅ Testing Your Changes

1. **Run development server:**
   ```bash
   npm run dev
   ```

2. **Visit:** http://localhost:3000

3. **Check each section:**
   - Hero section shows your name ✓
   - About section shows your profile image and bio ✓
   - Skills section displays your technologies ✓
   - Projects section shows your projects ✓
   - Experience/Education sections are updated ✓
   - Footer shows your social media links ✓
   - Contact form receives submissions ✓

---

## 🚀 Deployment

Once customized, deploy to:
- **Vercel** (recommended for Next.js): https://vercel.com
- **Netlify:** https://netlify.com
- **GitHub Pages:** https://pages.github.com

See `README.md` for deployment instructions.

---

**Last Updated:** June 17, 2026
**Portfolio Version:** 0.1.0
