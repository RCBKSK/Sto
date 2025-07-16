import { useEffect, useState } from "react";

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    clients: 0,
    products: 0,
    materials: 0,
    experience: 0
  });

  const targets = {
    clients: 362,
    products: 55,
    materials: 400,
    experience: 15
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('statistics');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      Object.entries(targets).forEach(([key, target]) => {
        let current = 0;
        const increment = target / steps;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCounts(prev => ({ ...prev, [key]: target }));
            clearInterval(timer);
          } else {
            setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
          }
        }, stepTime);
      });
    }
  }, [isVisible]);

  return (
    <section id="statistics" className="py-20 bg-stone-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="group">
            <div className="text-5xl font-bold text-stone-cream mb-4">{counts.clients}</div>
            <div className="text-xl text-gray-300">Happy Clients</div>
          </div>
          <div className="group">
            <div className="text-5xl font-bold text-stone-cream mb-4">{counts.products}</div>
            <div className="text-xl text-gray-300">Product Lines</div>
          </div>
          <div className="group">
            <div className="text-5xl font-bold text-stone-cream mb-4">{counts.materials}</div>
            <div className="text-xl text-gray-300">Material References</div>
          </div>
          <div className="group">
            <div className="text-5xl font-bold text-stone-cream mb-4">{counts.experience}</div>
            <div className="text-xl text-gray-300">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
