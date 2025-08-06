import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChat from "@/components/live-chat";
import AppointmentBooking from "@/components/appointment-booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Linkedin, MessageCircle, Calendar } from "lucide-react";
import { insertContactInquirySchema } from "@shared/schema";
import { EditableContent } from "@/components/cms/editable-content";

const formSchema = insertContactInquirySchema.extend({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Address",
      info: "123 Stone Avenue\nNatural Valley, NY 12345"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      info: "+1 (555) 123-4567"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      info: "info@elegancestone.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      info: "Mon - Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 4:00 PM\nSun: Closed"
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
              pageName="contact"
              sectionKey="hero_title"
              defaultContent="Contact Us"
              className="text-4xl md:text-6xl font-bold text-stone-dark mb-6"
              as="h1"
              multiline={false}
            />
            <EditableContent
              pageName="contact"
              sectionKey="hero_subtitle"
              defaultContent="Ready to start your natural stone project? Get in touch with our expert team for a consultation and personalized quote."
              className="text-xl text-stone-gray max-w-2xl mx-auto"
              as="p"
              multiline={true}
            />
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-stone-dark">Get in Touch</CardTitle>
                <CardDescription>
                  Choose how you'd like to connect with us - send a message, chat live, or book a consultation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="contact" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contact Form
                    </TabsTrigger>
                    <TabsTrigger value="chat" className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Live Chat
                    </TabsTrigger>
                    <TabsTrigger value="appointment" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Book Meeting
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="contact" className="space-y-4">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 (555) 123-4567" type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bathroom">Bathroom Renovation</SelectItem>
                              <SelectItem value="kitchen">Kitchen Countertops</SelectItem>
                              <SelectItem value="flooring">Flooring Installation</SelectItem>
                              <SelectItem value="cladding">Wall Cladding</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                        <Button 
                          type="submit" 
                          className="w-full bg-stone-bronze hover:bg-orange-600 text-white"
                          disabled={mutation.isPending}
                        >
                          {mutation.isPending ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  <TabsContent value="chat" className="space-y-4">
                    <LiveChat />
                  </TabsContent>
                  
                  <TabsContent value="appointment" className="space-y-4">
                    <AppointmentBooking />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-stone-dark mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-stone-bronze rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-stone-dark mb-1">{item.title}</h4>
                        <p className="text-stone-gray whitespace-pre-line">{item.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-stone-dark mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-stone-bronze rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                    <Facebook className="h-5 w-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-stone-bronze rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                    <Instagram className="h-5 w-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-stone-bronze rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                    <Twitter className="h-5 w-5 text-white" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-stone-bronze rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors">
                    <Linkedin className="h-5 w-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-dark mb-4">Visit Our Showroom</h2>
            <p className="text-xl text-stone-gray">
              Come see our natural stone collections in person and speak with our experts
            </p>
          </div>
          <div className="bg-gray-300 rounded-xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-stone-gray mx-auto mb-4" />
              <p className="text-stone-gray">Interactive map would be integrated here</p>
              <p className="text-sm text-stone-gray mt-2">123 Stone Avenue, Natural Valley, NY 12345</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
