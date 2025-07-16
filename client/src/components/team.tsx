import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Alex Valdemir",
      role: "Senior Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "John Harris",
      role: "Project Manager",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "Amine Jazouli",
      role: "Designer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    },
    {
      name: "Aleen Valzac",
      role: "CEO",
      image: "https://pixabay.com/get/gc704528750fdceca3fa45acbf2a9339958bc760c02c06b7c6daa2831e3b4dbdab0dae7c675c3c71f127eb84a9e9490ab1db2d038c0d9d1a8488790a3e6f7e349_1280.jpg",
      social: {
        facebook: "#",
        instagram: "#",
        twitter: "#"
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">Our Expert Team</h2>
          <p className="text-xl text-stone-gray">Meet the professionals who bring your natural stone dreams to life</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
              <img 
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-stone-dark mb-2">{member.name}</h3>
                <p className="text-stone-bronze font-medium mb-4">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.social.facebook} className="text-stone-gray hover:text-stone-bronze transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={member.social.instagram} className="text-stone-gray hover:text-stone-bronze transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href={member.social.twitter} className="text-stone-gray hover:text-stone-bronze transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
