import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      company: "Chicago, IL",
      content: "Elegance Stone transformed our bathroom into a luxurious spa-like retreat. The quality of their marble is exceptional, and their team was professional throughout the entire process.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b587?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Interior Designer",
      company: "Chen Design Studio",
      content: "I've worked with many stone suppliers, but Elegance Stone stands out for their attention to detail and innovative designs. Their limestone collection is absolutely stunning.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      id: 3,
      name: "Jennifer Williams",
      role: "Business Owner",
      company: "Williams Boutique Hotel",
      content: "We chose Elegance Stone for our hotel lobby renovation. The result exceeded our expectations - the natural stone cladding creates an impressive first impression for our guests.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-stone-beige to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-stone-gray">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-white rounded-xl p-8 shadow-stone hover:shadow-stone-lg transition-all duration-300 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-stone-gold fill-current" />
                ))}
              </div>
              
              <p className="text-stone-gray mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-stone-dark">{testimonial.name}</h4>
                  <p className="text-sm text-stone-gray">{testimonial.role}</p>
                  <p className="text-sm text-stone-bronze">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}