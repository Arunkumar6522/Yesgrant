import { IoIosArrowForward } from "react-icons/io"
import HeroImg from '../../assets/images/hero2.svg'
import { motion } from "framer-motion"

export const FadeUp = (delay) => {

    return {
        initial: {
            opacity: 0,
            y: 50,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stifness: 100,
                duration: 0.5,
                delay: delay,
                ease: "easeInOut"
            }
        }
    }
}

const Hero = ({ openModal }) => {
  return (
    <section className="bg-light overflow-hidden relative">
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[650px]">
            <div className="flex flex-col justify-center py-8 md:py-14 lg:py-0 relative z-20">
                <div className="text-center md:text-left space-y-6 md:space-y-10 lg:max-w-2xl">
                    <motion.h1 variants={FadeUp(0.6)} initial="initial" animate="animate" className="text-3xl lg:text-[45px] font-bold !leading-snug">
                        Achieve Your Dream of Studying Abroad – With <span className="text-primary">Zero Tuition & Fully Funded</span> Scholarships
                    </motion.h1>
                    <motion.p variants={FadeUp(0.7)} initial="initial" animate="animate" >
                        Welcome to YESGrant – your path to top global universities with fully funded scholarships and zero-tuition admissions for UG, PG, and PhD programs.
                    </motion.p>
                    <motion.div variants={FadeUp(0.8)} initial="initial" animate="animate" className="flex justify-center md:justify-start">
                        <button onClick={() => openModal('eligibility', 'resume')} className="primaryBtn flex items-center gap-2 group">
                            Check Eligibility <IoIosArrowForward className="text-xl group-hover:translate-x-2 duration-300" />
                        </button>
                    </motion.div>
                </div>
            </div>
            <div className="hidden md:flex justify-center items-center">
                <motion.img 
                    initial={{ x: 50, opacity: 0}} 
                    animate={{ x: 0, opacity: 1}} 
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                    src={HeroImg} 
                    alt="" 
                    className="w-[400px] xl:w-[600px] relative z-10 drop-shadow-xl" 
                />
            </div>
        </div>
    </section>
  )
}

export default Hero