import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fa" : "en");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-stone-dark hover:text-stone-bronze hover:bg-stone-beige/50 transition-all duration-200"
    >
      <Globe className="h-4 w-4 mr-1" />
      <span className="text-sm font-medium">
        {language === "en" ? "فارسی" : "EN"}
      </span>
    </Button>
  );
}