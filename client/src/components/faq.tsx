import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      question: "What types of natural stone do you offer?",
      answer: "We offer a comprehensive range of natural stones including marble, granite, limestone, travertine, quartzite, and specialized cladding materials. Each type comes in various colors, finishes, and sizes to suit different applications."
    },
    {
      question: "How long does the installation process take?",
      answer: "Installation time varies depending on the project scope. Typically, a standard bathroom renovation takes 3-5 days, while kitchen countertops can be completed in 1-2 days. We provide detailed timelines during the consultation phase."
    },
    {
      question: "Do you provide design consultation services?",
      answer: "Yes, we offer comprehensive design consultation services. Our expert designers work with you to create custom solutions that match your vision, style preferences, and budget requirements."
    },
    {
      question: "What is your warranty policy?",
      answer: "We provide a comprehensive warranty on all our natural stone products and installation services. Material defects are covered for up to 10 years, while installation workmanship is guaranteed for 5 years."
    },
    {
      question: "Can you work with existing architectural features?",
      answer: "Absolutely! Our skilled craftsmen are experienced in working with existing structures and can seamlessly integrate natural stone elements with your current architectural features."
    },
    {
      question: "Do you offer maintenance services?",
      answer: "Yes, we provide ongoing maintenance services including cleaning, sealing, polishing, and repair services to keep your natural stone looking beautiful for years to come."
    }
  ];

  return (
    <section className="py-20 bg-stone-beige">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-stone-gray">
            Find answers to common questions about our natural stone products and services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-stone-beige/30 transition-colors"
                onClick={() => setOpenItem(openItem === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-stone-dark pr-4">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`h-5 w-5 text-stone-bronze transition-transform duration-200 flex-shrink-0 ${
                    openItem === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openItem === index && (
                <div className="px-8 pb-6">
                  <div className="border-t border-stone-beige pt-4">
                    <p className="text-stone-gray leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}