import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqData = [
  {
    question: "How secure is my money in DigitalWallet?",
    answer:
      "Your funds are protected using enterprise-grade encryption and multi-factor authentication. We follow industry best practices for security.",
  },
  {
    question: "How do I transfer money?",
    answer:
      "You can send money instantly to other users using their registered email or phone number. Transfers are completed within seconds.",
  },
  {
    question: "Are there any transaction fees?",
    answer:
      "Basic transactions are free, but some premium services or instant transfers may incur small fees. Check our Pricing page for details.",
  },
  {
    question: "Can I access my wallet on mobile?",
    answer:
      "Yes! Our platform is fully mobile-friendly and works seamlessly on smartphones and tablets.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team through the Contact page or by emailing support@digitalwallet.com.",
  },
];


function FAQ() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_loading, _setLoading] = useState(false); // For future API fetching

  return (
    <section className="min-h-screen px-6 py-16 bg-background text-foreground">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Frequently Asked <span className="text-blue-600 dark:text-blue-400">Questions</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Find answers to common questions about DigitalWallet.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {_loading ? (
          <p className="text-center text-gray-400">Loading FAQs...</p>
        ) : (
          <Accordion type="single" collapsible>
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200 dark:border-gray-700">
                <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}

export default FAQ;
