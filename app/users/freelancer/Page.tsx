"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { FaLanguage } from "react-icons/fa";
import clsx from "clsx";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const t = {
    en: {
      findTalent: "Find Talent Your Way",
      subtitle: "Hire experienced freelancers for your project needs.",
      searchPlaceholder: "Search by skills or keywords",
      search: "Search",
      postJob: "Post a Job",
      viewProjects: "View Projects",
      recentJobs: "Recent Job Postings",
      browseAll: "Browse All Jobs",
      popular: "Popular Projects",
      browseMore: "Browse More Projects",
    },
    ar: {
      findTalent: "ابحث عن مواهب بطريقتك",
      subtitle: "وظف محترفين لحاجات مشروعك.",
      searchPlaceholder: "بحث بالمهارات أو الكلمات",
      search: "بحث",
      postJob: "نشر وظيفة",
      viewProjects: "عرض مشروع",
      recentJobs: "أحدث الوظائف",
      browseAll: "عرض الكل",
      popular: "المشاريع الشائعة",
      browseMore: "عرض المزيد",
    },
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-creamWhite text-neutralBlack dark:bg-neutralBlack dark:text-creamWhite font-body">
      <header className="flex justify-between items-center mb-10">
        <h1 className="font-heading text-2xl">Freelanco</h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="save language preference"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaLanguage size={18} />
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>
      </header>

      <main className="text-center">
        <h2 className="text-4xl font-heading mb-3">{t[lang].findTalent}</h2>
        <p className="text-lg font-subtitle mb-8">{t[lang].subtitle}</p>
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder={t[lang].searchPlaceholder}
            className="p-3 w-1/2 border rounded-l-lg border-gray-300"
          />
          <button className="bg-accentTeal text-white px-6 py-3 rounded-r-lg">
            {t[lang].search}
          </button>
        </div>

        <div className="flex gap-4 justify-center mb-6">
          <button className="bg-primary-purple text-white px-5 py-2 rounded-lg hover:bg-bright-magenta transition">
            {t[lang].postJob}
          </button>
          <button className="border border-accentTeal text-accentTeal px-5 py-2 rounded-lg hover:bg-soft-orange hover:text-white transition">
            {t[lang].viewProjects}
          </button>
        </div>
      </main>
    </div>
  );
}
