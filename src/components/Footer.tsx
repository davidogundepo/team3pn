import { useState } from "react";
import { Mail, Linkedin, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/3pn-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subEmail, setSubEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const footerLinks = {
    resources: [
      { label: "Core Scan", href: "/assessment" },
      { label: "Resource Hub", href: "/resources" },
      { label: "Events", href: "/events" },
      { label: "Mentors", href: "/mentors" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQs", href: "/contact" },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/company/3pn-network", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/3pn_network", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/3pn_network", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@3pngroup.com", label: "Email" },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    setSubscribing(true);
    // Simulate — replace with real API later
    await new Promise((r) => setTimeout(r, 800));
    toast.success("You're subscribed! 🎉", {
      description: "We'll keep you updated with the latest from 3PN.",
    });
    setSubEmail("");
    setSubscribing(false);
  };

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="3PN" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Empowering the next generation of Black professionals with clarity, skills, and access to leadership.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-primary-foreground/70 text-sm mb-4">Get the latest opportunities and insights.</p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                required
                className="px-4 py-2.5 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {subscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} 3PN. All rights reserved.
          </p>
          <div className="flex gap-4 text-primary-foreground/60 text-sm">
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;