import React from "react";
import { useLanguage } from "../../context/LanguageContext.js";
import { LANGUAGE_LIST } from "../../types/language.js";
import "./LanguageSelector.css";

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="language-select-wrapper">
      <select
        id="language-select"
        className="language-select"
        value={language}
        onChange={handleLanguageChange}
      >
        {LANGUAGE_LIST.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
