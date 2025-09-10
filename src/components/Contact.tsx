import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PaperPlaneTilt, 
  GithubLogo, 
  LinkedinLogo, 
  EnvelopeSimple,
  ChatCircle 
} from 'phosphor-react';

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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      reset();
    } catch (error) {
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
      href: 'mailto:saaed@example.com',
      color: 'hover:text-secondary'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="section-margin section-padding relative"
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
            Let's <span className="text-neon-primary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Let's collaborate to build something immersive and modern. I'm always open to 
            exciting opportunities, freelance projects, and creative partnerships.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="text-2xl font-light mb-8 text-neon-accent">
              Send a Message
            </h3>
            
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  placeholder="Your Name"
                  className="input-glass"
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="Your Email"
                  className="input-glass"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              <div>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  placeholder="Your Message"
                  rows={6}
                  className="input-glass resize-none"
                />
                {errors.message && (
                  <p className="text-destructive text-sm mt-2">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-neon w-full group inline-flex items-center justify-center space-x-3 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <PaperPlaneTilt 
                      size={20} 
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
                    />
                  </>
                )}
              </button>

              {/* Status Messages */}
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
            </form>
          </div>

          {/* Contact Info & Socials */}
          <div className="space-y-8">
            {/* Chat Bot Suggestion */}
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                <ChatCircle size={32} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-3">Quick Response</h3>
              <p className="text-muted-foreground mb-6">
                Need a faster response? Let's chat directly!
              </p>
              <button className="btn-neon">
                Start Chat
              </button>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-medium mb-6 text-center">
                Connect on Social
              </h3>
              <div ref={socialRef} className="flex justify-center space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-4 glass-card hover:scale-110 transition-all duration-300 ${social.color}`}
                  >
                    <social.icon size={32} className="group-hover:animate-pulse" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>📧 saaed@example.com</p>
                <p>📱 +1 (555) 123-4567</p>
                <p>📍 San Francisco, CA</p>
                <p className="text-accent font-medium mt-4">
                  Available for freelance work
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