'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Sparkles, Heart, Star, Send, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CustomJewelryForm {
  name: string;
  email: string;
  phone: string;
  jewelryType: string;
  material: string;
  budget: string;
  description: string;
  occasion: string;
  timeline: string;
}

const CustomJewelryPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CustomJewelryForm>();

  const onSubmit = async (data: CustomJewelryForm) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/send-custom-jewelry-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const jewelryTypes = [
    'Necklace',
    'Bracelet',
    'Earrings',
    'Ring',
    'Anklet',
    'Hair Accessories',
    'Custom Set'
  ];

  const materials = [
    'Sterling Silver',
    'Gold Plated',
    'Rose Gold',
    'White Gold',
    'Mixed Metals',
    'Titanium',
    'Stainless Steel'
  ];

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <section className="py-8 bg-[#FEFCF9]">
        <div className="container">
          <Link href="/jewelry" className="inline-flex items-center space-x-2 text-[#8B7355] hover:text-[#D4AF37] transition-colors duration-300">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Jewelry</span>
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-[#F9F1E7] to-[#FEFCF9]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-6xl font-playfair font-bold text-[#2C1810] mb-6">
              Custom <span className="text-gradient">Jewelry</span>
            </h1>
            <p className="text-xl text-[#5D4E37] leading-relaxed">
              Create a one-of-a-kind piece that tells your unique story. Our master craftsmen 
              will bring your vision to life with meticulous attention to detail.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Custom Form */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {!isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-playfair font-bold text-[#2C1810] mb-4">
                    Design Your Perfect Piece
                  </h2>
                  <p className="text-[#5D4E37] leading-relaxed">
                    Share your vision with us and we'll create a custom jewelry piece that exceeds your expectations.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Phone Number
                      </label>
                      <input
                        {...register('phone')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Jewelry Type *
                      </label>
                      <select
                        {...register('jewelryType', { required: 'Please select a jewelry type' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select jewelry type</option>
                        {jewelryTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.jewelryType && (
                        <p className="mt-1 text-sm text-red-600">{errors.jewelryType.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Preferred Material *
                      </label>
                      <select
                        {...register('material', { required: 'Please select a material' })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select material</option>
                        {materials.map(material => (
                          <option key={material} value={material}>{material}</option>
                        ))}
                      </select>
                      {errors.material && (
                        <p className="mt-1 text-sm text-red-600">{errors.material.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Budget Range
                      </label>
                      <select
                        {...register('budget')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select budget range</option>
                        <option value="$50-$100">$50 - $100</option>
                        <option value="$100-$250">$100 - $250</option>
                        <option value="$250-$500">$250 - $500</option>
                        <option value="$500-$1000">$500 - $1000</option>
                        <option value="$1000+">$1000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Occasion
                      </label>
                      <select
                        {...register('occasion')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select occasion</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Valentine's Day">Valentine's Day</option>
                        <option value="Mother's Day">Mother's Day</option>
                        <option value="Christmas">Christmas</option>
                        <option value="Just Because">Just Because</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#2C1810] mb-2">
                        Timeline
                      </label>
                      <select
                        {...register('timeline')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        <option value="Rush (1-2 weeks)">Rush (1-2 weeks)</option>
                        <option value="Standard (3-4 weeks)">Standard (3-4 weeks)</option>
                        <option value="Extended (5-6 weeks)">Extended (5-6 weeks)</option>
                        <option value="No Rush (6+ weeks)">No Rush (6+ weeks)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2C1810] mb-2">
                      Design Description *
                    </label>
                    <textarea
                      {...register('description', { required: 'Please describe your design vision' })}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all duration-300"
                      placeholder="Describe your vision in detail. Include any specific design elements, inspirations, engravings, or special requirements..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Custom Request</span>
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-green-50 rounded-2xl border border-green-200"
              >
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-playfair font-bold text-green-800 mb-2">
                  Request Submitted Successfully!
                </h3>
                <p className="text-green-700 leading-relaxed">
                  Thank you for your custom jewelry request. Our master craftsmen will review your requirements 
                  and get back to you within 24 hours with a detailed proposal and timeline.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-green-600 hover:text-green-800 font-medium transition-colors duration-300"
                >
                  Submit Another Request
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-[#FEFCF9]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl font-playfair font-bold text-[#2C1810] mb-6">
              Our <span className="text-gradient">Process</span>
            </h2>
            <p className="text-xl text-[#5D4E37] leading-relaxed">
              From concept to creation, we guide you through every step of bringing your vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'Share your vision and requirements with our design team'
              },
              {
                step: '02',
                title: 'Design',
                description: 'We create detailed sketches and 3D renderings for approval'
              },
              {
                step: '03',
                title: 'Crafting',
                description: 'Our master jewelers handcraft your piece with precision'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Your custom jewelry is carefully packaged and delivered'
              }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-[#2C1810] mb-2">
                  {process.title}
                </h3>
                <p className="text-[#5D4E37] leading-relaxed">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomJewelryPage;