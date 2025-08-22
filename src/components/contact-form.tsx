import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        description: "First name, last name, email, and message are required.",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // For GitHub Pages deployment, you'll need to integrate with a form service
    // Options include: Formspree, Netlify Forms, EmailJS, etc.
    
    // Example with mailto (opens email client)
    const subject = `Lead Generation Inquiry from ${formData.firstName} ${formData.lastName}`;
    const body = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message}
    `;
    
    const mailtoLink = `mailto:hello@centralautomations.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    toast({
      title: "Email client opened!",
      description: "Your email client should open with the message pre-filled. Send the email to complete your inquiry.",
    });
    
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    });
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div data-testid="contact-form">
      <h3 className="text-2xl font-bold text-brand-primary mb-6">Get Started Today</h3>
      <p className="text-gray-600 mb-8">
        Ready to discuss your lead generation needs? Fill out the form and we'll get back to you within 24 hours.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name *
            </Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              placeholder="John"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
              data-testid="input-first-name"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name *
            </Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              placeholder="Smith"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
              data-testid="input-last-name"
              required
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="john@recruitmentcompany.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
            data-testid="input-email"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company
          </Label>
          <Input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Your Recruitment Agency"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
            data-testid="input-company"
          />
        </div>
        
        <div>
          <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </Label>
          <Textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder="Tell us about your current lead generation challenges..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-transparent"
            data-testid="textarea-message"
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary text-white px-8 py-3 rounded-lg font-semibold w-full disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-submit-contact"
        >
          {isSubmitting ? (
            "Opening Email Client..."
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Note:</strong> This form will open your email client. For integration with form services like Formspree or EmailJS, 
          additional configuration is required.
        </p>
      </div>
    </div>
  );
}