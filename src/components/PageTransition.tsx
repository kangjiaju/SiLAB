// components/PageTransition.tsx  
import React from 'react';  
import { motion } from 'framer-motion';  

interface PageTransitionProps {  
  children: React.ReactNode;  
}  

const variants = {  
  hidden: { opacity: 0 },  
  visible: { opacity: 1 },  
};  

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {  
  return (  
    <motion.div  
      variants={variants}  
      initial="hidden"  
      animate="visible"  
      exit="hidden"  
      transition={{ duration: 0.3 }}  
      layout  
      className="w-full h-full bg-gray-100 z-50"  
    >  
      {children}  
    </motion.div>  
  );  
};  

export default PageTransition;