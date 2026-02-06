'use client'

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import FloatingTitle from '@/components/FloatingTitle';
import emailjs from '@emailjs/browser';

const COOLDOWN_SECONDS = 60; // change this if you want a longer/shorter cooldown

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [isSending, setIsSending] = useState(false);
  const [cooldown, setCooldown] = useState<number>(0);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // read last sent time from localStorage on mount to enforce cooldown across reloads
  useEffect(() => {
    const last = localStorage.getItem('contactLastSent');
    if (last) {
      const elapsed = Math.floor((Date.now() - Number(last)) / 1000);
      const remaining = Math.max(0, COOLDOWN_SECONDS - elapsed);
      if (remaining > 0) setCooldown(remaining);
    }
  }, []);

  // tick down cooldown
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(id);
          localStorage.removeItem('contactLastSent');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  // auto-hide toast after a few seconds
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(id);
  }, [toast]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    if (cooldown > 0) {
      setToast({ type: 'error', text: `Please wait ${cooldown}s before sending another message.` });
      return;
    }

    // add/update a hidden time field so your template can show send time
    let timeInput = formRef.current.querySelector<HTMLInputElement>('input[name="time"]');
    if (!timeInput) {
      timeInput = document.createElement('input');
      timeInput.type = 'hidden';
      timeInput.name = 'time';
      formRef.current.appendChild(timeInput);
    }
    timeInput.value = new Date().toLocaleString();

    setIsSending(true);

    emailjs
      .sendForm(
        'service_jdgyemi',       // your Service ID
        'template_16ekljf',      // your Template ID
        formRef.current,
        'JXZ-smLQSzHigC1s6'      // your Public Key (frontend-safe)
      )
      .then(
        () => {
          // success
          setToast({ type: 'success', text: 'Message sent successfully — thank you!' });
          formRef.current?.reset();
          setIsSending(false);
          // start cooldown and persist timestamp
          setCooldown(COOLDOWN_SECONDS);
          localStorage.setItem('contactLastSent', String(Date.now()));
        },
        (error) => {
          console.error('Email send failed:', error);
          setToast({ type: 'error', text: 'Failed to send message — please try again later.' });
          setIsSending(false);
        }
      );
  };

  const disabled = isSending || cooldown > 0;

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="space-y-12"
        >
          {/* Contact Info */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-center space-y-4"
          >
            <FloatingTitle className="cursor-target text-4xl md:text-6xl font-bold">
              Get In <span className="highlight">Touch</span>
            </FloatingTitle>
            <div className="w-24 h-px bg-white mx-auto"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Have a project in mind or just want to chat? Feel free to reach out.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid md:grid-cols-3 gap-8 text-left"
          >
            {/* Email */}
            <motion.div className="cursor-target bg-black border border-gray-800 p-8 rounded-lg space-y-4 transition-all duration-300 hover:border-white">
              <Mail className="text-white w-10 h-10" />
              <h3 className="text-xl font-semibold">Email Me</h3>
              <p className="text-gray-400">I&apos;ll get back to you as soon as possible.</p>
              <a href="mailto:rishinamansingh@gmail.com" className="cursor-target text-white flex items-center gap-2 hover:text-highlight transition-colors">
                rishinamansingh@gmail.com <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Phone */}
            <motion.div className="cursor-target bg-black border border-gray-800 p-8 rounded-lg space-y-4 transition-all duration-300 hover:border-white">
              <Phone className="text-white w-10 h-10" />
              <h3 className="text-xl font-semibold">Call Me</h3>
              <p className="text-gray-400">Feel free to call during business hours.</p>
              <a href="tel:+917389118161" className="cursor-target text-white flex items-center gap-2 hover:text-highlight transition-colors">
                +91 7389118161 <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Location */}
            <motion.div className="cursor-target bg-black border border-gray-800 p-8 rounded-lg space-y-4 transition-all duration-300 hover:border-white">
              <MapPin className="text-white w-10 h-10" />
              <h3 className="text-xl font-semibold">Find Me</h3>
              <p className="text-gray-400">Based in Bangalore, India. Open to remote opportunities.</p>
              <a href="https://maps.google.com/?q=Bangalore,India" target="_blank" rel="noopener noreferrer" className="cursor-target text-white flex items-center gap-2 hover:text-highlight transition-colors">
                Bangalore, India <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            className="cursor-target bg-black border border-gray-800 p-8 rounded-lg space-y-6 max-w-3xl mx-auto mt-12 transition-all duration-300 hover:border-white"
          >
            <h3 className="text-2xl font-bold">Send a Message</h3>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4 text-left">
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={disabled}
                  className={`cursor-target w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : 'focus:border-white'}`}
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={disabled}
                  className={`cursor-target w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : 'focus:border-white'}`}
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  disabled={disabled}
                  className={`cursor-target w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none transition-colors ${disabled ? 'opacity-60 cursor-not-allowed' : 'focus:border-white'}`}
                  placeholder="Your Message"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={disabled}
                  aria-disabled={disabled}
                  className={`cursor-target button-primary px-6 py-3 rounded-md inline-flex items-center gap-2 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {isSending ? 'Sending...' : cooldown > 0 ? `Sent — try again in ${cooldown}s` : 'Send Message'}
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </button>

                {/* small note about cooldown */}
                {cooldown > 0 && (
                  <div className="text-sm text-gray-400">
                    Please wait {cooldown}s before sending again.
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast / Notification */}
      {toast && (
        <div
          className={`fixed right-6 bottom-6 z-50 max-w-xs rounded-md px-4 py-3 shadow-lg ${
            toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="text-sm">{toast.text}</div>
        </div>
      )}
    </section>
  );
};

export default Contact;
