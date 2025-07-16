import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Palette, 
  Layers, 
  Contrast, 
  Sun, 
  Moon, 
  Type, 
  ZoomIn, 
  ZoomOut,
  RotateCcw,
  Settings,
  Eye,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

interface EnhancedUIProps {
  onStyleChange?: (styles: UIStyles) => void;
}

interface UIStyles {
  theme: 'light' | 'dark' | 'auto';
  fontSize: number;
  contrast: number;
  colorScheme: string;
  animations: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
}

export default function EnhancedUI({ onStyleChange }: EnhancedUIProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [styles, setStyles] = useState<UIStyles>({
    theme: 'light',
    fontSize: 16,
    contrast: 100,
    colorScheme: 'stone',
    animations: true,
    reducedMotion: false,
    highContrast: false,
  });

  useEffect(() => {
    // Load saved preferences
    const saved = localStorage.getItem('elegance-ui-preferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStyles(parsed);
      } catch (error) {
        console.log('Error loading UI preferences:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save preferences
    localStorage.setItem('elegance-ui-preferences', JSON.stringify(styles));
    
    // Apply styles to document
    applyStyles(styles);
    
    // Callback to parent
    onStyleChange?.(styles);
  }, [styles, onStyleChange]);

  const applyStyles = (newStyles: UIStyles) => {
    const root = document.documentElement;
    
    // Theme
    if (newStyles.theme === 'dark') {
      root.classList.add('dark');
    } else if (newStyles.theme === 'light') {
      root.classList.remove('dark');
    } else {
      // Auto theme based on system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
    }
    
    // Font size
    root.style.setProperty('--base-font-size', `${newStyles.fontSize}px`);
    
    // Contrast
    root.style.setProperty('--contrast-level', `${newStyles.contrast}%`);
    
    // High contrast mode
    root.classList.toggle('high-contrast', newStyles.highContrast);
    
    // Reduced motion
    root.classList.toggle('reduce-motion', newStyles.reducedMotion);
    
    // Animations
    root.classList.toggle('no-animations', !newStyles.animations);
    
    // Color scheme
    root.setAttribute('data-color-scheme', newStyles.colorScheme);
  };

  const updateStyle = (key: keyof UIStyles, value: any) => {
    setStyles(prev => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    const defaults: UIStyles = {
      theme: 'light',
      fontSize: 16,
      contrast: 100,
      colorScheme: 'stone',
      animations: true,
      reducedMotion: false,
      highContrast: false,
    };
    setStyles(defaults);
  };

  const colorSchemes = [
    { id: 'stone', name: 'Stone Bronze', color: '#8B6914' },
    { id: 'marble', name: 'Marble White', color: '#F8F9FA' },
    { id: 'slate', name: 'Slate Gray', color: '#475569' },
    { id: 'travertine', name: 'Travertine Cream', color: '#F5F5DC' },
    { id: 'granite', name: 'Granite Black', color: '#1F2937' },
  ];

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-6 h-12 w-12 rounded-full bg-gradient-stone hover:opacity-90 shadow-lg magnetic z-40"
        size="icon"
        title="Accessibility & UI Settings"
      >
        <Settings className="h-5 w-5 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed top-6 right-6 w-80 max-h-[80vh] overflow-y-auto z-50 glass-morph shadow-2xl animate-fade-in-up">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-stone-bronze" />
            <CardTitle className="text-lg">UI Settings</CardTitle>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6"
          >
            ×
          </Button>
        </div>
        <CardDescription>
          Customize your viewing experience
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Theme</span>
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {(['light', 'dark', 'auto'] as const).map((theme) => (
              <Button
                key={theme}
                variant={styles.theme === theme ? "default" : "outline"}
                size="sm"
                onClick={() => updateStyle('theme', theme)}
                className="flex items-center space-x-1"
              >
                {theme === 'light' && <Sun className="h-3 w-3" />}
                {theme === 'dark' && <Moon className="h-3 w-3" />}
                {theme === 'auto' && <Sparkles className="h-3 w-3" />}
                <span className="capitalize">{theme}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="space-y-3">
          <Label className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Type className="h-4 w-4" />
              <span>Font Size</span>
            </div>
            <span className="text-sm">{styles.fontSize}px</span>
          </Label>
          <Slider
            value={[styles.fontSize]}
            onValueChange={([value]) => updateStyle('fontSize', value)}
            min={12}
            max={24}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Small</span>
            <span>Large</span>
          </div>
        </div>

        {/* Contrast */}
        <div className="space-y-3">
          <Label className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Contrast className="h-4 w-4" />
              <span>Contrast</span>
            </div>
            <span className="text-sm">{styles.contrast}%</span>
          </Label>
          <Slider
            value={[styles.contrast]}
            onValueChange={([value]) => updateStyle('contrast', value)}
            min={50}
            max={150}
            step={5}
            className="w-full"
          />
        </div>

        {/* Color Scheme */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <Layers className="h-4 w-4" />
            <span>Color Scheme</span>
          </Label>
          <div className="grid grid-cols-1 gap-2">
            {colorSchemes.map((scheme) => (
              <Button
                key={scheme.id}
                variant={styles.colorScheme === scheme.id ? "default" : "outline"}
                size="sm"
                onClick={() => updateStyle('colorScheme', scheme.id)}
                className="flex items-center justify-between"
              >
                <span>{scheme.name}</span>
                <div 
                  className="w-4 h-4 rounded-full border" 
                  style={{ backgroundColor: scheme.color }}
                />
              </Button>
            ))}
          </div>
        </div>

        {/* Accessibility Options */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Accessibility</h3>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="animations" className="text-sm">
              Enable Animations
            </Label>
            <Switch
              id="animations"
              checked={styles.animations}
              onCheckedChange={(checked) => updateStyle('animations', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="reduced-motion" className="text-sm">
              Reduced Motion
            </Label>
            <Switch
              id="reduced-motion"
              checked={styles.reducedMotion}
              onCheckedChange={(checked) => updateStyle('reducedMotion', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="high-contrast" className="text-sm">
              High Contrast
            </Label>
            <Switch
              id="high-contrast"
              checked={styles.highContrast}
              onCheckedChange={(checked) => updateStyle('highContrast', checked)}
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={resetToDefaults}
            variant="outline"
            className="w-full flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset to Defaults</span>
          </Button>
        </div>

        {/* Current Settings Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Theme:</span>
              <Badge variant="secondary" className="text-xs">
                {styles.theme}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Font:</span>
              <Badge variant="secondary" className="text-xs">
                {styles.fontSize}px
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Scheme:</span>
              <Badge variant="secondary" className="text-xs">
                {colorSchemes.find(s => s.id === styles.colorScheme)?.name}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}