import React from 'react';
import { FaGraduationCap, FaComments, FaClipboardCheck, FaUserFriends, FaFileAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const programs = [
  {
    title: "Foundation",
    subtitle: "ONLINE SELF STUDY",
    description: "Perfect for self-motivated learners who want structured guidance",
    features: [
      {
        icon: <FaGraduationCap />,
        text: "Course structure - The five pillars"
      },
      {
        icon: <FaComments />,
        text: "1-hour expert chat on your application"
      },
      {
        icon: <FaClipboardCheck />,
        text: "Comments and suggestions on the built-in activity"
      }
    ],
    highlight: "Opt-in Online course!"
  },
  {
    title: "Advanced",
    subtitle: "ONLINE SELF STUDY PLUS ON-DEMAND SESSIONS",
    description: "Enhanced support with expert guidance when you need it",
    features: [
      {
        icon: <FaGraduationCap />,
        text: "Opt-in Online Course"
      },
      {
        icon: <FaUserFriends />,
        text: "On-demand discussion with experts in your field of application"
      }
    ],
    highlight: "1:1 on-demand Mentors!"
  },
  {
    title: "Exclusive",
    subtitle: "START-TO-FINISH SUPPORT",
    description: "Comprehensive support throughout your application journey",
    features: [
      {
        icon: <FaGraduationCap />,
        text: "Opt-in Online Course"
      },
      {
        icon: <FaUserFriends />,
        text: "On-demand discussion with experts in your field of application"
      },
      {
        icon: <FaComments />,
        text: "Personalized core mentors support at all stages until admission is granted"
      },
      {
        icon: <FaFileAlt />,
        text: "Templates to work with"
      }
    ],
    highlight: "Start-to-Finish Support!"
  }
];

const Programs = ({ toggleModal }) => {
  return (
    <section id="programs" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">3 Ways to Get Our Help!</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect support level for your scholarship journey. Each program is designed to maximize your chances of success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="text-primary font-semibold mb-3">{program.highlight}</div>
                <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                <p className="text-sm font-medium text-gray-500 mb-4">{program.subtitle}</p>
                <p className="text-gray-600 mb-6">{program.description}</p>
                
                <ul className="space-y-4 mb-8">
                  {program.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-primary text-lg mt-1">{feature.icon}</span>
                      <span className="text-gray-700">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={toggleModal}
                  className="w-full py-3 px-6 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Check Eligibility & Pricing
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">
            We are happy to help students with exceptional interests. Contact us to learn more about our flexible pricing options.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Programs; 