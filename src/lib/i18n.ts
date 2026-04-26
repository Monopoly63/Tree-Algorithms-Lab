// i18n configuration — English + Arabic
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      brand: {
        title: "TREE ALGORITHMS LAB",
        subtitle: "Algorithms 3 · Abdulmoin Hablas",
      },
      hero: {
        badge: "Interactive Lab",
        title: "Visualize & Explore Binary Trees",
        description:
          "Build trees, run traversals, convert m-ary → BT → BST, and parse expression trees — all rendered in real-time.",
        liveBadge: "Running locally in your browser",
        ctaStart: "Start Building",
        ctaLearn: "Tutorial",
      },
      tabs: {
        builder: "Tree Builder",
        mary: "m-ary → BT → BST",
        traversal: "Traversal Visualizer",
        reconstruct: "Reconstruct Tree",
        numeric: "Numeric Expression",
        symbolic: "Symbolic Expression",
      },
      breadcrumb: {
        home: "Home",
        current: "Current",
      },
      actions: {
        exportPng: "Export PNG",
        exportSvg: "Export SVG",
        exportJson: "Export JSON",
        export: "Export",
        tutorial: "Tutorial",
        skip: "Skip",
        next: "Next",
        back: "Back",
        finish: "Finish",
      },
      theme: {
        toggleLight: "Switch to light mode",
        toggleDark: "Switch to dark mode",
      },
      language: {
        toggle: "Switch language",
        english: "English",
        arabic: "العربية",
      },
      footer: {
        about: "About",
        aboutText:
          "Every algorithm written from scratch. Python backend available as ZIP download.",
        resources: "Resources",
        followMe: "Follow Me",
        credits: "Credits",
        rights: "Tree Algorithms Lab · Built with React · TypeScript · Tailwind CSS",
        madeWith: "Made with",
        by: "by",
      },
      tutorial: {
        welcome: {
          title: "Welcome to Tree Algorithms Lab 👋",
          body: "A quick tour through the main features. You can skip anytime.",
        },
        builder: {
          title: "1. Tree Builder",
          body: "Build binary trees and BSTs by inserting values. Visualize step-by-step.",
        },
        traversal: {
          title: "2. Traversal Visualizer",
          body: "See preorder, inorder, postorder, and level-order traversals animated live.",
        },
        reconstruct: {
          title: "3. Reconstruct Tree",
          body: "Rebuild a BST from two traversals (preorder+inorder or postorder+inorder).",
        },
        export: {
          title: "4. Export your work",
          body: "Export any tree as PNG, SVG, or JSON using the toolbar.",
        },
        done: {
          title: "You're all set! 🎉",
          body: "Explore, experiment, and enjoy the algorithms.",
        },
      },
      misc: {
        features: "Features",
        learnMore: "Learn more",
      },
    },
  },
  ar: {
    translation: {
      brand: {
        title: "مختبر خوارزميات الأشجار",
        subtitle: "الخوارزميات 3 · عبدالمعين حبلص",
      },
      hero: {
        badge: "مختبر تفاعلي",
        title: "تصوّر واستكشف الأشجار الثنائية",
        description:
          "ابنِ الأشجار، شغّل التنقلات، حوّل m-ary → BT → BST، وحلّل أشجار التعابير — كل ذلك في الزمن الحقيقي.",
        liveBadge: "يعمل محلياً في متصفحك",
        ctaStart: "ابدأ البناء",
        ctaLearn: "جولة تعليمية",
      },
      tabs: {
        builder: "بناء الشجرة",
        mary: "m-ary → BT → BST",
        traversal: "عارض التنقلات",
        reconstruct: "إعادة بناء الشجرة",
        numeric: "تعبير رقمي",
        symbolic: "تعبير رمزي",
      },
      breadcrumb: {
        home: "الرئيسية",
        current: "الحالي",
      },
      actions: {
        exportPng: "تصدير PNG",
        exportSvg: "تصدير SVG",
        exportJson: "تصدير JSON",
        export: "تصدير",
        tutorial: "جولة تعليمية",
        skip: "تخطي",
        next: "التالي",
        back: "السابق",
        finish: "إنهاء",
      },
      theme: {
        toggleLight: "التبديل للوضع النهاري",
        toggleDark: "التبديل للوضع الليلي",
      },
      language: {
        toggle: "تبديل اللغة",
        english: "English",
        arabic: "العربية",
      },
      footer: {
        about: "عن المشروع",
        aboutText:
          "كل الخوارزميات مكتوبة من الصفر. يتوفر Backend بـ Python قابل للتنزيل كـ ZIP.",
        resources: "مصادر",
        followMe: "تابعني",
        credits: "اعتمادات",
        rights: "مختبر خوارزميات الأشجار · مبني بـ React · TypeScript · Tailwind CSS",
        madeWith: "صُنع بـ",
        by: "بواسطة",
      },
      tutorial: {
        welcome: {
          title: "أهلاً بك في مختبر خوارزميات الأشجار 👋",
          body: "جولة سريعة بالمميزات الأساسية. يمكنك التخطي في أي وقت.",
        },
        builder: {
          title: "1. بناء الشجرة",
          body: "ابنِ أشجار ثنائية و BSTs بإدراج القيم. شاهد الخطوات مباشرة.",
        },
        traversal: {
          title: "2. عارض التنقلات",
          body: "شاهد preorder و inorder و postorder و level-order متحركة.",
        },
        reconstruct: {
          title: "3. إعادة بناء الشجرة",
          body: "أعد بناء BST من تنقلين (preorder+inorder أو postorder+inorder).",
        },
        export: {
          title: "4. تصدير عملك",
          body: "يمكنك تصدير أي شجرة كـ PNG أو SVG أو JSON من شريط الأدوات.",
        },
        done: {
          title: "جاهز! 🎉",
          body: "استكشف، جرّب، واستمتع بالخوارزميات.",
        },
      },
      misc: {
        features: "المميزات",
        learnMore: "المزيد",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "tal.lang",
    },
  });

// Keep <html> dir/lang in sync with i18n language
const applyDir = (lng: string) => {
  if (typeof document === "undefined") return;
  const html = document.documentElement;
  html.lang = lng;
  html.dir = lng === "ar" ? "rtl" : "ltr";
};

applyDir(i18n.language || "en");
i18n.on("languageChanged", applyDir);

export default i18n;