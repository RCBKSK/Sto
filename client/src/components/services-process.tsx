export default function ServicesProcess() {
  const steps = [
    {
      number: "01",
      title: "Design and Consultation",
      description: "We collaborate with you to understand your vision and create a customized design plan that suits your style, budget, and timeline."
    },
    {
      number: "02", 
      title: "Material Selection",
      description: "We guide you in choosing the perfect materials and our skilled craftsmen bring your project to life with meticulous attention to detail."
    },
    {
      number: "03",
      title: "Customer Satisfaction", 
      description: "We conduct thorough quality checks to ensure the final result meets our high standards, and we prioritize your satisfaction every step of the way."
    }
  ];

  return (
    <section className="py-20 bg-stone-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">Our Process</h2>
          <p className="text-xl text-stone-gray max-w-2xl mx-auto">
            From initial consultation to final installation, we guide you through every step of your natural stone journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-6xl font-bold text-stone-bronze mb-4">{step.number}</div>
              <h3 className="text-2xl font-semibold mb-4 text-stone-dark">
                {step.title.split(' ').map((word, i) => (
                  <span key={i}>
                    {word}
                    {i < step.title.split(' ').length - 1 && <br />}
                  </span>
                ))}
              </h3>
              <p className="text-stone-gray leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
