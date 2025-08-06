import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Team from "@/components/team";
import Statistics from "@/components/statistics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Award, Heart, Shield, Star } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { EditableContent } from "@/components/cms/editable-content";

export default function About() {
  const { t, language } = useLanguage();
  
  const values = [
    {
      icon: <Star className="h-8 w-8" />,
      title: t("features.premium"),
      description: t("features.premiumDesc")
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Customer Focus",
      description: "Our clients are at the heart of everything we do. We listen, understand, and deliver solutions that exceed expectations."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Integrity",
      description: "We conduct business with honesty, transparency, and reliability, building lasting relationships based on trust and mutual respect."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Innovation",
      description: "We embrace new technologies and techniques while respecting traditional craftsmanship to create stunning natural stone installations."
    }
  ];

  const milestones = [
    {
      year: "2010",
      title: "Company Founded",
      description: "Started as a small family business with a passion for natural stone."
    },
    {
      year: "2015",
      title: "Major Expansion",
      description: "Expanded operations and opened our first showroom."
    },
    {
      year: "2018",
      title: "Award Recognition",
      description: "Received industry recognition for outstanding craftsmanship."
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Launched online catalog and virtual consultation services."
    },
    {
      year: "2024",
      title: "Market Leadership",
      description: "Became a leading provider of natural stone solutions in the region."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <EditableContent
              pageName="about"
              sectionKey="hero_title"
              defaultContent="About Shafaf Sang"
              className={`text-4xl md:text-6xl font-bold text-stone-dark mb-6 ${language === 'fa' ? 'font-vazir' : ''}`}
              as="h1"
              multiline={false}
            />
            <EditableContent
              pageName="about"
              sectionKey="hero_subtitle"
              defaultContent="Leading Iranian supplier of premium natural stone solutions from Fars Province"
              className={`text-xl text-stone-gray max-w-2xl mx-auto ${language === 'fa' ? 'font-vazir' : ''}`}
              as="p"
              multiline={true}
            />
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableContent
                pageName="about"
                sectionKey="story_title"
                defaultContent="Our Story"
                className="text-4xl md:text-5xl font-bold text-stone-dark mb-6"
                as="h2"
                multiline={false}
              />
              <EditableContent
                pageName="about"
                sectionKey="story_paragraph_1"
                defaultContent="Founded with a vision to bring the natural beauty of stone into modern living spaces, Elegance Stone has grown from a small local business into a trusted name in the industry. Our journey began with a simple belief: that natural stone has the power to transform ordinary spaces into extraordinary experiences."
                className="text-lg text-stone-gray mb-6 leading-relaxed"
                as="p"
                multiline={true}
              />
              <EditableContent
                pageName="about"
                sectionKey="story_paragraph_2"
                defaultContent="Over the years, we have built our reputation on three core principles: exceptional quality, personalized service, and innovative design solutions. Every project we undertake reflects our commitment to these values, ensuring that our clients receive not just a product, but a complete experience."
                className="text-lg text-stone-gray mb-6 leading-relaxed"
                as="p"
                multiline={true}
              />
              <EditableContent
                pageName="about"
                sectionKey="story_paragraph_3"
                defaultContent="Today, we continue to push the boundaries of what's possible with natural stone, combining traditional craftsmanship with cutting-edge technology to create stunning installations that stand the test of time."
                className="text-lg text-stone-gray mb-8 leading-relaxed"
                as="p"
                multiline={true}
              />
              <Button asChild size="lg" className="bg-stone-bronze hover:bg-orange-600 text-white">
                <Link href="/contact">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Work With Us
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Natural stone craftsmanship"
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <EditableContent
              pageName="about"
              sectionKey="values_title"
              defaultContent="Our Values"
              className="text-4xl md:text-5xl font-bold text-stone-dark mb-4"
              as="h2"
              multiline={false}
            />
            <EditableContent
              pageName="about"
              sectionKey="values_subtitle"
              defaultContent="The principles that guide everything we do"
              className="text-xl text-stone-gray"
              as="p"
              multiline={true}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-stone-bronze rounded-lg flex items-center justify-center text-white mx-auto mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl text-stone-dark">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-stone-gray">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Statistics />

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-dark mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-stone-gray">
              Key milestones in our growth and development
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-stone-bronze"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-stone-bronze mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-stone-dark mb-2">{milestone.title}</h3>
                      <p className="text-stone-gray">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-stone-bronze rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Team />

      {/* CTA Section */}
      <section className="py-20 bg-stone-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who have trusted us to bring their natural stone vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-stone-bronze hover:bg-orange-600 text-white">
              <Link href="/contact">
                <ArrowRight className="mr-2 h-5 w-5" />
                Get Started Today
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-stone-dark">
              <Link href="/gallery">
                View Our Work
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
