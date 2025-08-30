import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate API delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-primary">Our Service</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Learn more about our story, our mission, and the amazing team working
          behind the scenes.
        </p>
      </section>

      {/* Service Story */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="leading-relaxed text-muted-foreground">
          Our journey began with the vision to create a reliable, secure, and
          user-friendly platform that empowers people to manage their digital
          transactions with ease. Over the years, we have continuously improved
          our services, focusing on customer satisfaction, innovation, and
          transparency.
        </p>
      </section>

      {/* Mission */}
      <section className="bg-card py-12 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="leading-relaxed text-muted-foreground">
            Our mission is to provide safe, fast, and accessible financial
            solutions for everyone, regardless of their background. We aim to
            revolutionize the way people interact with money by combining
            technology with trust and innovation.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-semibold mb-8 text-center">Meet Our Team</h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {loading ? (
            // Skeleton Loading
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="rounded-2xl">
                <CardHeader className="flex flex-col items-center space-y-3">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              {/* Team Member 1 */}
              <Card className="hover:shadow-lg transition rounded-2xl bg-card text-card-foreground">
                <CardHeader>
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Team Member"
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                  <CardTitle className="text-center mt-3">Ahmed Musa</CardTitle>
                  <p className="text-center text-sm text-muted-foreground">
                    Founder & CEO
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Visionary leader passionate about technology and financial
                    inclusion.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 2 */}
              <Card className="hover:shadow-lg transition rounded-2xl bg-card text-card-foreground">
                <CardHeader>
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Team Member"
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                  <CardTitle className="text-center mt-3">Sarah Johnson</CardTitle>
                  <p className="text-center text-sm text-muted-foreground">CTO</p>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Leading the tech innovation to ensure secure and scalable
                    services.
                  </p>
                </CardContent>
              </Card>

              {/* Team Member 3 */}
              <Card className="hover:shadow-lg transition rounded-2xl bg-card text-card-foreground">
                <CardHeader>
                  <img
                    src="https://randomuser.me/api/portraits/men/56.jpg"
                    alt="Team Member"
                    className="w-24 h-24 mx-auto rounded-full object-cover"
                  />
                  <CardTitle className="text-center mt-3">David Lee</CardTitle>
                  <p className="text-center text-sm text-muted-foreground">
                    Head of Operations
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Ensuring smooth processes and customer satisfaction at every
                    step.
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default About;
