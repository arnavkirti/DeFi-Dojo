import React from "react";
import { FiTwitter, FiGithub, FiSlack, FiLinkedin } from "react-icons/fi";
import { motion } from "framer-motion";

const SocialLink = ({
  icon: Icon,
  href,
  label,
  index,
}: {
  icon: any;
  href: string;
  label: string;
  index: number;
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 p-4 rounded-lg transition-all duration-300"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, x: 10 }}
    viewport={{ once: true }}
  >
    <Icon className="w-6 h-6" />
    <span>{label}</span>
  </motion.a>
);

const Community = () => {
  return (
    <section id="community" className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Join Our Learning Community
        </motion.h2>
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            Connect with fellow learners, share strategies, and compete
            alongside AI agents in our growing community of DeFi enthusiasts.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { icon: FiTwitter, href: "#", label: "Updates" },
            {
              icon: FiGithub,
              href: "https://github.com/arnavkirti/Defi-Dojo",
              label: "Open Source",
            },
            { icon: FiSlack, href: "#", label: "Learning Hub" },
            { icon: FiLinkedin, href: "#", label: "Network" },
          ].map((link, index) => (
            <SocialLink key={index} {...link} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Community;
