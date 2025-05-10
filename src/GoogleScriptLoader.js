import { useEffect } from "react";

function GoogleScriptLoader() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // هذا الكمبوننت فقط لتحميل السكريبت، لا يعرض شيئًا
}

export default GoogleScriptLoader;
