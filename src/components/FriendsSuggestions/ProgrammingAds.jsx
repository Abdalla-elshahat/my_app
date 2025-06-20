import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ProgrammingAds.css";

const ads = [
  {
    id: 1,
    title: "تعلم JavaScript من الصفر",
    image: "https://cdn-icons-png.flaticon.com/512/919/919828.png",
    description: "ابدأ رحلتك في عالم البرمجة مع أقوى لغة Frontend!",
  },
  {
    id: 2,
    title: "كورس React احترافي",
    image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
    description: "تعلم بناء تطبيقات واجهة تفاعلية بمرونة عالية.",
  },
  {
    id: 3,
    title: "احترف Node.js وExpress",
    image: "https://cdn-icons-png.flaticon.com/512/919/919825.png",
    description: "ادخل عالم السيرفرات و APIs مع Node وExpress.",
  },
  {
    id: 4,
    title: "مشاريع تطبيقية كاملة",
    image: "https://cdn-icons-png.flaticon.com/512/3022/3022163.png",
    description: "طبق اللي اتعلمته في مشاريع حقيقية خطوة بخطوة.",
  },
  {
    id: 5,
    title: "تعلم Git و GitHub باحتراف",
    image: "https://cdn-icons-png.flaticon.com/512/733/733553.png",
    description: "سيطر على إدارة الأكواد وتعاون مع المطورين بسهولة.",
  },
  {
    id: 6,
    title: "أساسيات تصميم الواجهات UI/UX",
    image: "data:image/jpeg;base64,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",
    description: "افهم كيفية تقديم تجربة مستخدم ممتازة.",
  },
  {
    id: 7,
    title: "تعلم TypeScript بسهولة",
    image: "https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
    description: "اجعل مشاريعك أكثر تنظيمًا وأمانًا باستخدام TS.",
  },
  {
    id: 8,
    title: "كورس MongoDB شامل",
    image: "https://cdn-icons-png.flaticon.com/512/919/919836.png",
    description: "تعلم قاعدة البيانات الأقوى في المشاريع الحديثة.",
  },
  {
    id: 9,
    title: "ابدأ طريقك في Next.js",
    image: "https://cdn-icons-png.flaticon.com/512/1183/1183672.png",
    description: "خلي تطبيقاتك أسرع وأسهل في التوزيع.",
  },
  {
    id: 10,
    title: "برمجة تطبيقات موبايل بـ React Native",
    image: "https://cdn-icons-png.flaticon.com/512/919/919851.png",
    description: "ابني تطبيقات Android و iOS من كود واحد.",
  },
  {
    id: 11,
    title: "تعلم API Integration",
    image: "https://cdn-icons-png.flaticon.com/512/4248/4248443.png",
    description: "اربط تطبيقاتك بخدمات خارجية بكل احترافية.",
  },
  {
    id: 12,
    title: "إزاي تشتغل Freelancer كمطور؟",
    image: "https://cdn-icons-png.flaticon.com/512/3063/3063825.png",
    description: "نصائح وخطوات لتبدأ شغلك الحر كمبرمج محترف.",
  },
];


const ProgrammingAds = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 4000); // تتغير كل 4 ثواني

    return () => clearInterval(interval);
  }, []);

  const currentAd = ads[currentAdIndex];

  return (
    <div className="programming-ads hidden md:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAd.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="ad-card"
        >
          <img src={currentAd.image} alt={currentAd.title} className="ad-image" />
          <h4 className="ad-title">{currentAd.title}</h4>
          <p className="ad-description">{currentAd.description}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProgrammingAds;
