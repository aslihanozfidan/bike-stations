import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    const loadTranslations = async () => {
      const localeFiles = import.meta.glob("../locales/*.json");

      for (const path in localeFiles) {
        const match = path.match(/main\.(\w+)(?:\.src)?\.json$/);
        if (match) {
          const langCode = match[1];
          const module = (await localeFiles[path]()) as { default: any };
          i18n.addResourceBundle(langCode, "translation", module.default);
        }
      }
    };

    loadTranslations();
  }, []);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
