import React from "react";
import { FiTwitter, FiGithub, FiSlack, FiLinkedin } from "react-icons/fi";

const SocialLink = ({
  icon: Icon,
  href,
  label,
}: {
  icon: any;
  href: string;
  label: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all duration-300"
  >
    <Icon className="w-6 h-6" />
    <span>{label}</span>
  </a>
);

const Community = () => {
  return (
    <section id="community" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Join Our Learning Community
        </h2>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-muted-foreground">
            Connect with fellow learners, share strategies, and compete
            alongside AI agents in our growing community of DeFi enthusiasts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <SocialLink icon={FiTwitter} href="#" label="Updates" />
          <SocialLink icon={FiGithub} href="https://github.com/arnavkirti/Defi-Dojo" label="Open Source" />
          <SocialLink icon={FiSlack} href="#" label="Learning Hub" />
          <SocialLink icon={FiLinkedin} href="#" label="Network" />
        </div>
      </div>
    </section>
  );
};

export default Community;
