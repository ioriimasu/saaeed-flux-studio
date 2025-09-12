import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChatCircle,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  PaperPlaneTilt
} from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section animation
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      // Form animation
      gsap.fromTo(formRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          }
        }
      );

      // Social icons animation
      gsap.fromTo(socialRef.current?.children || [],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 80%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const onSubmit = async (_data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: GithubLogo,
      href: 'https://github.com',
      color: 'hover:text-primary'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinLogo,
      href: 'https://linkedin.com',
      color: 'hover:text-accent'
    },
    {
      name: 'Email',
      icon: EnvelopeSimple,
      href: 'mailto:sayedimam.fahim@gmail.com',
      color: 'hover:text-secondary'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="section-margin section-padding relative"
      role="region"
      aria-label="Contact section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-1 w-36 h-36 top-1/4 right-1/4 opacity-20" />
        <div className="floating-orb floating-orb-2 w-28 h-28 bottom-1/4 left-1/4 opacity-20" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Let's build what moves the <span className="text-neon-primary">factory forward</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Available for advisory, architecture, and select build partnerships. 
            Let's discuss your RFID/IoT systems, SaaS platforms, and industrial analytics needs.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-light mb-8 text-neon-accent">
              Send a Message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6" role="form" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="input-glass"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-destructive text-sm mt-2" role="alert">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  className="input-glass"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-destructive text-sm mt-2" role="alert">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  id="message"
                  placeholder="Your Message"
                  rows={6}
                  className="input-glass resize-none"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-destructive text-sm mt-2" role="alert">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-neon w-full group inline-flex items-center justify-center space-x-3 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label={isSubmitting ? "Sending message" : "Send message"}
                aria-describedby="submit-status"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <PaperPlaneTilt 
                      size={20} 
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>

              {/* Status Messages */}
              <div id="submit-status" role="status" aria-live="polite">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-center">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-center">
                    Something went wrong. Please try again.
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            {/* Chat Bot Suggestion */}
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <ChatCircle size={32} className="text-primary-foreground" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-medium mb-3">Direct Email</h3>
              <p className="text-muted-foreground mb-6">
                For immediate response, reach out directly via email.
              </p>
              <a 
                href="mailto:sayedimam.fahim@gmail.com"
                className="btn-neon inline-block"
                aria-label="Send email to sayedimam.fahim@gmail.com"
              >
                Email Me
              </a>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-medium mb-6 text-center">
                Connect & Follow
              </h3>
              <div ref={socialRef} className="flex justify-center space-x-6" role="list" aria-label="Social media links">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 glass-card hover:scale-110 transition-all duration-300 ${social.color}`}
                    role="listitem"
                    aria-label={`Visit ${social.name} profile`}
                  >
                    <social.icon size={32} className="group-hover:animate-pulse" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>📧 sayedimam.fahim@gmail.com</p>
                <p>📍 Based in Bangladesh (UTC+6)</p>
                <p>🌐 Languages: English, Bangla</p>
                <p className="text-accent font-medium mt-4">
                  Available for advisory & architecture
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;