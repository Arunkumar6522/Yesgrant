import { motion } from "framer-motion"
import './ScholarshipInfo.css'
import { FaCheck, FaTimes, FaMoneyBillWave, FaClock, FaUserFriends, FaNetworkWired } from 'react-icons/fa';
import ThinkingImage from '../../assets/images/new full thinking.svg';

const ScholarshipInfo = () => {
    return (
        <section className="bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* What is a Fully Funded Scholarship Section */}
                <div className="max-w-6xl mx-auto mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            What is a Fully Funded Scholarship?
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto">
                            A fully funded scholarship means your entire tuition is covered, and you receive 
                            a stipend for living, travel, and visa expenses. For example:
                        </p>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                        {/* SVG Illustration */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-5/12 flex items-center justify-center lg:sticky lg:top-24 h-[300px] lg:h-[400px] lg:min-h-[700px]"
                        >
                            <div className="w-full h-full overflow-hidden relative flex items-center justify-center">
                                <img 
                                    src={ThinkingImage} 
                                    alt="Student thinking about scholarship opportunities"
                                    className="w-full h-full object-contain max-h-[280px] lg:max-h-none" 
                                />
                            </div>
                        </motion.div>

                        {/* Content Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="w-full lg:w-7/12 pt-0 lg:pt-0"
                        >
                            <div className="max-w-xl mx-auto">
                                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-6 text-center">
                                    If you're applying for a Master's in France, selected students may receive:
                                </h3>

                                <div className="space-y-3">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-white p-4 lg:p-5 rounded-xl shadow-sm text-center"
                                    >
                                        <p className="text-lg lg:text-xl text-gray-800">
                                            €10,000–€14,017/year for living expenses
                                        </p>
                                    </motion.div>

                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-white p-4 lg:p-5 rounded-xl shadow-sm text-center"
                                    >
                                        <p className="text-lg lg:text-xl text-gray-800">
                                            Up to €1,000 for travel and visa costs
                                        </p>
                                    </motion.div>

                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white p-4 lg:p-5 rounded-xl shadow-sm text-center"
                                    >
                                        <p className="text-lg lg:text-xl text-gray-800">
                                            Full tuition waiver at top public universities
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Get into your top-choice of school Section */}
                <div className="max-w-6xl mx-auto mb-24">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            Get into your top-choice of school
                        </h2>
                        <p className="text-lg text-gray-600">
                            See how YESGrant transforms your graduate education journey
                        </p>
                    </motion.div>

                    <div className="flex flex-row gap-4">
                        {/* Conventional Approach */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl p-4 shadow-lg flex-1"
                        >
                            <h3 className="text-base md:text-lg font-bold mb-3 text-gray-800 text-center">Conventional approach</h3>
                            <div className="space-y-2 text-xs md:text-base">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaClock className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Time consuming</h4>
                                        <p className="text-gray-600">Searching and applying without guidance</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaUserFriends className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">No expert support</h4>
                                        <p className="text-gray-600">Missing crucial application insights</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaMoneyBillWave className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Expensive education</h4>
                                        <p className="text-gray-600">Missing out on scholarship opportunities</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* YESGrant Approach */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl p-4 shadow-lg flex-1"
                        >
                            <h3 className="text-base md:text-lg font-bold mb-3 text-primary text-center">YESGrant approach</h3>
                            <div className="space-y-2 text-xs md:text-base">
                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaClock className="text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Save time</h4>
                                        <p className="text-gray-600">Step-by-step guidance by experts</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaUserFriends className="text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Expert mentorship</h4>
                                        <p className="text-gray-600">Mentorship for zero-cost education!</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaMoneyBillWave className="text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Save money</h4>
                                        <p className="text-gray-600">Templates and resources for success!</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-2 text-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                        <FaNetworkWired className="text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Build your career</h4>
                                        <p className="text-gray-600">With the right network</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default ScholarshipInfo;