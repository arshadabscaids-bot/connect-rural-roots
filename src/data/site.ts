/**
 * Central configuration for the Digital Literacy for Rural Communication project.
 * All navigation, course, video and government-service data lives here so it can
 * be updated in one place (instead of being hard-coded across pages).
 */

export const SITE = {
  name: "Digital Literacy for Rural Communication",
  short: "Digital Literacy",
  tagline: "Empowering villages with digital skills, safety and opportunity.",
  email: "info@digitalliteracy.org.in",
  phone: "+91 98765 43210",
  address: "Digital Literacy Mission Centre, Block B, District Collectorate Road, Anantapur, Andhra Pradesh 515001",
};

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Objectives", to: "/objectives" },
  { label: "Features", to: "/features" },
  { label: "Training", to: "/training" },
  { label: "Videos", to: "/video-learning" },
  { label: "Gov Services", to: "/government-services" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

/** Official Indian government digital services — central config, easy to update. */
export const GOV_SERVICES = [
  { name: "UIDAI (Aadhaar)", url: "https://uidai.gov.in", desc: "Enrol for Aadhaar, update address, download e-Aadhaar and check status.", icon: "IdCard" },
  { name: "PAN — Income Tax", url: "https://www.incometax.gov.in", desc: "Apply for PAN, file income tax returns and link PAN with Aadhaar.", icon: "Receipt" },
  { name: "DigiLocker", url: "https://www.digilocker.gov.in", desc: "Store and share verified digital documents and certificates securely.", icon: "FolderLock" },
  { name: "UMANG", url: "https://web.umang.gov.in", desc: "Single app for hundreds of central and state government services.", icon: "LayoutGrid" },
  { name: "PM-Kisan", url: "https://pmkisan.gov.in", desc: "Income support scheme for farmer families — status, eKYC and payments.", icon: "Sprout" },
  { name: "e-Shram", url: "https://eshram.gov.in", desc: "National database of unorganised workers with social security benefits.", icon: "HardHat" },
  { name: "National Scholarship Portal", url: "https://scholarships.gov.in", desc: "Apply and track scholarships for school and college students.", icon: "GraduationCap" },
  { name: "CoWIN", url: "https://www.cowin.gov.in", desc: "Vaccination registration and downloadable vaccine certificates.", icon: "Syringe" },
  { name: "MyGov India", url: "https://www.mygov.in", desc: "Citizen engagement platform — polls, tasks, campaigns and updates.", icon: "Megaphone" },
  { name: "Government e-Marketplace (GeM)", url: "https://gem.gov.in", desc: "Sell products and services to government buyers online.", icon: "Store" },
  { name: "eDistrict Services", url: "https://edistrict.delhigovt.nic.in", desc: "Caste, income and residence certificates. Replace with your state portal.", icon: "FileText" },
  { name: "National Career Service", url: "https://www.ncs.gov.in", desc: "Free job search, career counselling and skill training listings.", icon: "Briefcase" },
  { name: "Passport Seva", url: "https://www.passportindia.gov.in", desc: "Apply for a passport, book appointments and track application status.", icon: "BookUser" },
  { name: "Ayushman Bharat PM-JAY", url: "https://beneficiary.nha.gov.in", desc: "Check eligibility and download the health cover beneficiary card.", icon: "HeartPulse" },
  { name: "PMEGP (KVIC)", url: "https://www.kviconline.gov.in", desc: "Loans and subsidy for setting up rural micro enterprises.", icon: "Factory" },
] as const;

export const FEATURES = [
  { title: "Online Learning", desc: "Self-paced lessons in local languages with quizzes and progress tracking.", icon: "MonitorSmartphone" },
  { title: "Video Learning", desc: "Short, practical video tutorials that work on low-bandwidth connections.", icon: "PlayCircle" },
  { title: "Digital Payments", desc: "Learn wallets, QR codes, and safe money transfer step by step.", icon: "Wallet" },
  { title: "UPI Services", desc: "Set up UPI, create a PIN and send or receive money confidently.", icon: "QrCode" },
  { title: "Cyber Security", desc: "Spot frauds, strong passwords, OTP safety and reporting cybercrime.", icon: "ShieldCheck" },
  { title: "Online Banking", desc: "Net banking, passbooks, balance checks and mini statements.", icon: "Landmark" },
  { title: "E-Government Services", desc: "Direct access to Aadhaar, DigiLocker, UMANG and state portals.", icon: "Building2" },
  { title: "Farmer Information", desc: "Mandi prices, weather alerts, crop advisory and scheme updates.", icon: "Tractor" },
  { title: "Employment Support", desc: "Resume building, job portals and interview preparation basics.", icon: "Briefcase" },
  { title: "Digital Certificates", desc: "Verifiable completion certificates you can download and share.", icon: "Award" },
  { title: "Mobile Literacy", desc: "Smartphone settings, apps, storage, keyboards and accessibility.", icon: "Smartphone" },
  { title: "Internet Safety", desc: "Safe browsing, privacy settings and protecting children online.", icon: "Lock" },
  { title: "Women's Digital Empowerment", desc: "Dedicated batches for self-help groups and women entrepreneurs.", icon: "Users" },
  { title: "Student Learning", desc: "Scholarship portals, exam forms and free study resources.", icon: "BookOpen" },
] as const;

export const OBJECTIVES = [
  { title: "Improve Digital Awareness", desc: "Introduce computers, smartphones and the internet to first-time users.", icon: "Lightbulb" },
  { title: "Promote Cashless Transactions", desc: "Build trust in UPI, wallets and card payments through practice sessions.", icon: "Wallet" },
  { title: "Encourage Online Education", desc: "Connect rural learners to free courses, exams and scholarship portals.", icon: "GraduationCap" },
  { title: "Support Farmers", desc: "Digital mandi prices, weather updates and scheme enrolment help.", icon: "Sprout" },
  { title: "Improve Cyber Safety", desc: "Prevent OTP fraud, phishing and fake-loan scams in villages.", icon: "ShieldCheck" },
  { title: "Access Government Services", desc: "Guide citizens through Aadhaar, DigiLocker, PM-Kisan and e-Shram.", icon: "Building2" },
  { title: "Employment Opportunities", desc: "Link trained youth to NCS jobs, gig work and self-employment schemes.", icon: "Briefcase" },
] as const;

export type Course = {
  id: number;
  title: string;
  desc: string;
  duration: string;
  trainer: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
};

export const COURSES: Course[] = [
  { id: 1, title: "Computer Basics", desc: "Parts of a computer, mouse, keyboard, files and folders.", duration: "4 weeks", trainer: "Ravi Kumar", level: "Beginner", category: "Basics" },
  { id: 2, title: "Internet Basics", desc: "Browsers, search, downloads and using Wi-Fi safely.", duration: "3 weeks", trainer: "Anita Sharma", level: "Beginner", category: "Basics" },
  { id: 3, title: "MS Office Essentials", desc: "Word, Excel and PowerPoint for everyday village office work.", duration: "6 weeks", trainer: "Suresh Patil", level: "Intermediate", category: "Productivity" },
  { id: 4, title: "Digital Payments", desc: "Wallets, QR codes, refunds and transaction records.", duration: "2 weeks", trainer: "Meena Devi", level: "Beginner", category: "Finance" },
  { id: 5, title: "UPI Mastery", desc: "UPI ID, PIN setup, limits, and resolving failed payments.", duration: "2 weeks", trainer: "Meena Devi", level: "Beginner", category: "Finance" },
  { id: 6, title: "Cyber Security Awareness", desc: "Passwords, OTP fraud, phishing links and cybercrime reporting.", duration: "3 weeks", trainer: "Dr. Imran Ali", level: "Intermediate", category: "Safety" },
  { id: 7, title: "Online Banking", desc: "Net banking, NEFT/IMPS, statements and complaint redressal.", duration: "3 weeks", trainer: "Lakshmi Rao", level: "Intermediate", category: "Finance" },
  { id: 8, title: "Government Services Online", desc: "Aadhaar, DigiLocker, UMANG, certificates and scheme forms.", duration: "4 weeks", trainer: "Vijay Menon", level: "Beginner", category: "Citizen" },
  { id: 9, title: "Smartphone Usage", desc: "Settings, storage, apps, local-language keyboards and updates.", duration: "2 weeks", trainer: "Priya Nair", level: "Beginner", category: "Basics" },
  { id: 10, title: "Email Communication", desc: "Create an email ID, attachments, spam and formal writing.", duration: "2 weeks", trainer: "Anita Sharma", level: "Beginner", category: "Communication" },
  { id: 11, title: "Online Shopping Safety", desc: "Genuine sellers, COD vs prepaid, returns and fake offers.", duration: "2 weeks", trainer: "Rohit Verma", level: "Beginner", category: "Safety" },
  { id: 12, title: "Digital Communication", desc: "WhatsApp, video calls, groups and responsible sharing.", duration: "3 weeks", trainer: "Priya Nair", level: "Beginner", category: "Communication" },
];

export type Video = {
  title: string;
  category: string;
  /** Short filter key used by the category buttons. */
  filter: string;
  duration: string;
  desc: string;
  videoId: string;
  youtubeUrl: string;
  embedUrl: string;
  thumbnail: string;
};

export const VIDEO_CATEGORIES = [
  "Computer Basics",
  "Internet Basics",
  "Digital Payments",
  "Cyber Security",
  "Online Banking",
  "Government Services",
  "Farmer Digital Services",
] as const;

/** Short filter buttons shown above the video grid. */
export const VIDEO_FILTERS = [
  { label: "All", value: "All" },
  { label: "Computer", value: "Computer" },
  { label: "Internet", value: "Internet" },
  { label: "Payments", value: "Payments" },
  { label: "Cyber Security", value: "Cyber Security" },
  { label: "Banking", value: "Banking" },
  { label: "Government", value: "Government" },
  { label: "Farmers", value: "Farmers" },
] as const;

/** Build a video entry from a verified, publicly embeddable YouTube ID. */
function video(
  videoId: string,
  title: string,
  category: string,
  filter: string,
  duration: string,
  desc: string,
): Video {
  return {
    videoId,
    title,
    category,
    filter,
    duration,
    desc,
    youtubeUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  };
}

export const VIDEOS: Video[] = [
  video("mCq8-xTH7jA", "How Computers Work", "Computer Basics", "Computer", "10:00", "What makes a computer a computer — hardware, software and everyday uses."),
  video("O5nskjZ_GoI", "Early Computing Explained", "Computer Basics", "Computer", "11:53", "A simple history of computing that helps first-time users understand machines."),
  video("AEaKrq3SpW8", "How the Internet Works", "Internet Basics", "Internet", "11:56", "Data, networks and how a village connection reaches the whole world."),
  video("3QhU9jd03a0", "Computer Networks Basics", "Internet Basics", "Internet", "12:19", "Wi-Fi, mobile data and how devices talk to each other."),
  video("g-Mfbk4j0Y8", "UPI Safety Tips (Hindi)", "Digital Payments", "Payments", "01:30", "Official UPI Chalega safety tips before you send money."),
  video("aB8j3CMBQYM", "UPI Scam Alert", "Digital Payments", "Payments", "01:44", "Common UPI payment scams and how to stay safe while paying."),
  video("inWWhr5tnEA", "What is Cyber Security?", "Cyber Security", "Cyber Security", "07:00", "Cyber threats explained in seven minutes for everyday users."),
  video("1xWPL0nBna4", "Cyber Safety & Security (NCERT)", "Cyber Security", "Cyber Security", "1:24:24", "Bilingual NCERT session on staying safe online, OTP fraud and privacy."),
  video("fZq5mBPUYF0", "Download Policy Copy from Net Banking", "Online Banking", "Banking", "02:14", "A practical net-banking walkthrough for downloading documents from SBI."),
  video("-JT8YonnD7I", "Understanding Bank Credit Messages", "Online Banking", "Banking", "02:03", "Why your bank sends a credit SMS and how to read your statement."),
  video("e-6d98g64Yk", "India Post DIGIPIN System", "Government Services", "Government", "03:10", "The new digital PIN code system and how citizens can use it."),
  video("NOGa905bRpg", "PM-Kisan New Registration", "Government Services", "Government", "05:25", "Step-by-step online registration for the PM-Kisan scheme."),
  video("SeUCTDPMd2o", "PM-Kisan Beneficiary Status", "Farmer Digital Services", "Farmers", "04:20", "Check your instalment status online without visiting an agent."),
  video("QtY-v_z8QmM", "PM-Kisan eKYC from Mobile", "Farmer Digital Services", "Farmers", "06:10", "Complete eKYC at home using the PM-Kisan mobile app."),
];


export const FAQS = [
  { q: "Who can join the digital literacy programme?", a: "Any resident aged 12 and above can enrol. Courses are free for rural learners, self-help groups and students." },
  { q: "Do I need my own computer?", a: "No. Village common service centres provide computers and tablets. Most courses can also be completed on a basic smartphone." },
  { q: "Are the courses available in local languages?", a: "Yes. Lessons and videos are available in Hindi, Telugu, Tamil, Kannada, Marathi and Bengali, with more languages being added." },
  { q: "Will I get a certificate?", a: "Yes. On completing all lessons and the final assessment you can download a verifiable digital certificate from the Certificates page." },
  { q: "Is there any fee?", a: "The core programme is free. Optional advanced modules may have a nominal fee decided by the district centre." },
  { q: "How do I report an online fraud?", a: "Call the national cybercrime helpline 1930 or report at cybercrime.gov.in. Our Cyber Security course covers the full process." },
  { q: "Can women's self-help groups get a dedicated batch?", a: "Yes. Groups of 15 or more can request a dedicated batch and a woman trainer through the Contact page." },
  { q: "How long does a course take?", a: "Most beginner courses take 2 to 4 weeks with three sessions per week of about one hour each." },
];

export const TESTIMONIALS = [
  { name: "Sunita Yadav", role: "Self-help group member, Barabanki", quote: "I used to hand my phone to my son for every payment. Now I run my tailoring shop's UPI account myself." },
  { name: "Ramesh Naidu", role: "Farmer, Anantapur", quote: "Checking mandi prices online got me a better rate for my groundnut crop. The farmer module changed my season." },
  { name: "Fatima Sheikh", role: "Student, Nanded", quote: "I applied for my scholarship on the National Scholarship Portal without paying an agent. The training made it simple." },
  { name: "Dinesh Kumar", role: "Panchayat volunteer, Sitapur", quote: "After the cyber safety class, our village has not lost a single rupee to OTP fraud this year." },
];

export const ANNOUNCEMENTS = [
  { date: "12 Aug 2026", title: "New Farmer Digital Services batch", body: "Registrations open for the monsoon batch covering mandi prices, weather alerts and PM-Kisan eKYC." },
  { date: "04 Aug 2026", title: "Women's empowerment drive", body: "Fifty dedicated batches for self-help groups launched across twelve districts this month." },
  { date: "28 Jul 2026", title: "Certificates now verifiable", body: "All completion certificates carry a unique ID that employers can verify online." },
  { date: "15 Jul 2026", title: "Cyber safety helpline camp", body: "Weekend camps explaining the 1930 cybercrime helpline in every block headquarters." },
];
