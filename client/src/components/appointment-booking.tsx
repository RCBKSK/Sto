import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AppointmentFormData {
  customerName: string;
  email: string;
  phone: string;
  projectType: string;
  preferredDate: string;
  message: string;
}

export default function AppointmentBooking() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState<AppointmentFormData>({
    customerName: "",
    email: "",
    phone: "",
    projectType: "",
    preferredDate: "",
    message: "",
  });

  const bookAppointment = useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      return await apiRequest("/api/appointments", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          preferredDate: new Date(data.preferredDate).toISOString(),
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Appointment Requested",
        description: "We'll contact you soon to confirm your appointment.",
      });
      setFormData({
        customerName: "",
        email: "",
        phone: "",
        projectType: "",
        preferredDate: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment.mutate(formData);
  };

  const handleInputChange = (field: keyof AppointmentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-2xl mx-auto glass-morph">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Calendar className="h-6 w-6 text-stone-bronze" />
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-stone-bronze to-stone-gold bg-clip-text text-transparent">
            Book Consultation
          </CardTitle>
        </div>
        <CardDescription>
          Schedule a free consultation with our stone experts
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Name */}
          <div className="space-y-2">
            <Label htmlFor="customerName" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Full Name *</span>
            </Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              placeholder="Enter your full name"
              required
              className="fluid-hover"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>Email Address *</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email address"
              required
              className="fluid-hover"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Phone Number</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              className="fluid-hover"
            />
          </div>

          {/* Project Type */}
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type *</Label>
            <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
              <SelectTrigger className="fluid-hover">
                <SelectValue placeholder="Select your project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kitchen">Kitchen Renovation</SelectItem>
                <SelectItem value="bathroom">Bathroom Renovation</SelectItem>
                <SelectItem value="flooring">Flooring Project</SelectItem>
                <SelectItem value="wall-cladding">Wall Cladding</SelectItem>
                <SelectItem value="fireplace">Fireplace Design</SelectItem>
                <SelectItem value="outdoor">Outdoor/Landscaping</SelectItem>
                <SelectItem value="commercial">Commercial Project</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Preferred Date */}
          <div className="space-y-2">
            <Label htmlFor="preferredDate" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Preferred Date *</span>
            </Label>
            <Input
              id="preferredDate"
              type="datetime-local"
              value={formData.preferredDate}
              onChange={(e) => handleInputChange("preferredDate", e.target.value)}
              min={today}
              required
              className="fluid-hover"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Project Details</span>
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Tell us about your project, timeline, and any specific requirements..."
              rows={4}
              className="fluid-hover"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-stone hover:opacity-90 text-white font-semibold py-3 magnetic"
            disabled={bookAppointment.isPending || !formData.customerName || !formData.email || !formData.projectType || !formData.preferredDate}
          >
            {bookAppointment.isPending ? "Booking..." : "Book Consultation"}
          </Button>

          <div className="text-sm text-gray-600 text-center">
            * We'll contact you within 24 hours to confirm your appointment
          </div>
        </form>
      </CardContent>
    </Card>
  );
}