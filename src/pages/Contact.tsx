import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-hot-toast";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API submission delay
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section className="min-h-screen bg-background px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Contact <span className="text-blue-600 dark:text-blue-400">Us</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Have a question or inquiry? Fill out the form below and we will get back to you promptly.
        </p>
      </div>

      <form
        className="w-full max-w-xl bg-card p-8 rounded-2xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-10 w-full rounded" />
            <Skeleton className="h-24 w-full rounded" />
            <Skeleton className="h-12 w-full rounded" />
          </div>
        ) : (
          <>
            <Input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
            />
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </>
        )}
      </form>
    </section>
  );
}

export default Contact;
