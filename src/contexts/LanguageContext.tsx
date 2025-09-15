import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'th' | 'es';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Default translations
const translations: Record<string, { en: string; th: string; es: string }> = {
  // Main page translations
  'mainTitle': {
    en: 'MADRID CASTING PORN AUDITION',
    th: 'การคัดเลือกนักแสดงหนังโป๊มาดริด',
    es: 'AUDICIÓN DE PELÍCULAS PARA ADULTOS EN MADRID'
  },
  'mainSubtitle': {
    en: 'Join the most exclusive adult entertainment opportunities in Spain',
    th: 'ร่วมเป็นส่วนหนึ่งในโอกาสด้านความบันเทิงสำหรับผู้ใหญ่ที่พิเศษที่สุดในสเปน',
    es: 'Únete a las oportunidades más exclusivas en entretenimiento para adultos en España'
  },
  'welcomeText': {
    en: 'Welcome to Madrid\'s premier adult entertainment casting platform. We connect talented individuals with top production companies in Spain\'s adult industry.',
    th: 'ยินดีต้อนรับสู่แพลตฟอร์มการคัดเลือกนักแสดงสำหรับวงการบันเทิงสำหรับผู้ใหญ่ชั้นนำของมาดริด เราเป็นตัวกลางระหว่างผู้มีความสามารถกับบริษัทผลิตภาพยนตร์ชั้นนำในวงการผู้ใหญ่ของสเปน',
    es: 'Bienvenido a la principal plataforma de casting para el entretenimiento para adultos en Madrid. Conectamos a personas talentosas con las mejores productoras de la industria para adultos en España.'
  },
  'findYourPerfectJob': {
    en: 'Find Your Perfect Job',
    th: 'ค้นหางานที่เหมาะกับคุณ',
    es: 'Encuentra el trabajo perfecto para ti'
  },
  'whyChooseUs': {
    en: 'Why Choose Us',
    th: 'ทำไมต้องเลือกเรา',
    es: '¿Por qué elegirnos?'
  },
  'dontWait': {
    en: 'Don\'t Wait - Start Your New Career Today',
    th: 'อย่ารอช้า - เริ่มต้นอาชีพใหม่ของคุณวันนี้',
    es: 'No esperes más - Comienza tu nueva carrera hoy'
  },
  'browseListings': {
    en: 'Browse our current job listings and take the first step towards an exciting new career in Madrid\'s adult entertainment industry.',
    th: 'ดูรายการงานของเราและเริ่มต้นก้าวแรกสู่อาชีพใหม่ที่น่าตื่นเต้นในอุตสาหกรรมบันเทิงสำหรับผู้ใหญ่ของมาดริด',
    es: 'Explora nuestras ofertas de trabajo actuales y da el primer paso hacia una emocionante nueva carrera en la industria del entretenimiento para adultos de Madrid.'
  },
  'nowHiring': {
    en: 'Now Hiring in Madrid',
    th: 'เปิดรับสมัครงานที่มาดริด',
    es: 'Contratando ahora en Madrid'
  },
  
  // Job listings
  'job1': {
    en: 'Adult Film Talent: Various roles available in Madrid',
    th: 'นักแสดงภาพยนตร์ผู้ใหญ่: รับสมัครหลายบทบาทในมาดริด',
    es: 'Talento para cine para adultos: varios papeles disponibles en Madrid'
  },
  'job2': {
    en: 'Webcam Models: Work from home or our studio',
    th: 'นางแบบเว็บแคม: ทำงานจากที่บ้านหรือสตูดิโอของเรา',
    es: 'Modelos webcam: trabaja desde casa o en nuestro estudio'
  },
  'job3': {
    en: 'Escort Services: High-end clientele in Madrid',
    th: 'บริการเอสคอร์ต: ลูกค้าระดับไฮเอนด์ในมาดริด',
    es: 'Servicios de acompañantes: clientes exclusivos en Madrid'
  },
  'job4': {
    en: 'Exotic Dancers: Perform at top venues across Spain',
    th: 'นักเต้นเอ็กโซติก: โชว์ในสถานที่ท็อปๆ ทั่วสเปน',
    es: 'Bailarinas exóticas: actúa en los mejores locales de España'
  },
  
  // Benefits
  'benefit1': {
    en: 'Competitive pay and flexible schedules',
    th: 'ค่าตอบแทนสูงและตารางงานยืดหยุ่น',
    es: 'Pagos competitivos y horarios flexibles'
  },
  'benefit2': {
    en: 'Safe and professional working environment',
    th: 'สภาพแวดล้อมการทำงานที่ปลอดภัยและเป็นมืออาชีพ',
    es: 'Ambiente de trabajo seguro y profesional'
  },
  'benefit3': {
    en: 'Opportunities for career growth',
    th: 'โอกาสในการเติบโตในอาชีพ',
    es: 'Oportunidades de crecimiento profesional'
  },
  'benefit4': {
    en: 'Supportive and experienced team',
    th: 'ทีมงานที่มีประสบการณ์และพร้อมสนับสนุน',
    es: 'Equipo experimentado y de apoyo'
  },
  
  // Form translations
  'applyNow': {
    en: 'Apply Now Madrid Porn Audition',
    th: 'สมัครตอนนี้ การออดิชั่นหนังโป๊มาดริด',
    es: 'Aplique ahora para la audición de porno en Madrid'
  },
  'submitted': {
    en: 'Application Submitted!',
    th: 'ส่งใบสมัครแล้ว!',
    es: '¡Solicitud enviada!'
  },
  'namePlaceholder': {
    en: 'Your Full Name',
    th: 'ชื่อ-นามสกุลของคุณ',
    es: 'Tu nombre completo'
  },
  'agePlaceholder': {
    en: 'Your Age',
    th: 'อายุของคุณ',
    es: 'Tu edad'
  },
  'cityPlaceholder': {
    en: 'Your City in Spain',
    th: 'เมืองที่คุณอยู่ในสเปน',
    es: 'Tu ciudad en España'
  },
  'emailPlaceholder': {
    en: 'Your Email Address',
    th: 'ที่อยู่อีเมลของคุณ',
    es: 'Tu dirección de correo electrónico'
  },
  'socialMediaPlaceholder': {
    en: 'Social Media (Instagram, Twitter, etc.)',
    th: 'โซเชียลมีเดีย (อินสตาแกรม ทวิตเตอร์ ฯลฯ)',
    es: 'Redes sociales (Instagram, Twitter, etc.)'
  },
  'messagePlaceholder': {
    en: 'Tell us about yourself and your experience',
    th: 'บอกเราเกี่ยวกับตัวคุณและประสบการณ์ของคุณ',
    es: 'Cuéntanos sobre ti y tu experiencia'
  },
  'submitting': {
    en: 'Submitting...',
    th: 'กำลังส่ง...',
    es: 'Enviando...'
  },
  'submitButton': {
    en: 'Submit Application',
    th: 'ส่งใบสมัคร',
    es: 'Enviar solicitud'
  },
  'successStories': {
    en: 'Success Stories from Our Talent in Madrid',
    th: 'เรื่องราวความสำเร็จของนักแสดงของเราในมาดริด',
    es: 'Historias de éxito de nuestro talento en Madrid'
  },
  'successStoriesTitle': {
    en: 'Check out the success stories of the girls who have worked with us in Madrid',
    th: 'ดูเรื่องราวความสำเร็จของสาวๆ ที่ทำงานกับเราในมาดริด',
    es: 'Conoce las historias de éxito de las chicas que han trabajado con nosotros en Madrid'
  },
  'faq': {
    en: 'Frequently Asked Questions',
    th: 'คำถามที่พบบ่อย',
    es: 'Preguntas Frecuentes'
  },
  'contactUs': {
    en: 'Contact Us Now in Madrid',
    th: 'ติดต่อเราเดี๋ยวนี้ในมาดริด',
    es: 'Contáctanos ahora en Madrid'
  },
  'startYourJourney': {
    en: 'Start Your Career in Madrid Today',
    th: 'เริ่มต้นอาชีพของคุณในมาดริดวันนี้',
    es: 'Comienza tu carrera en Madrid hoy'
  },
  'applyNowMadrid': {
    en: 'Apply Now Madrid Porn Audition',
    th: 'สมัครตอนนี้ การออดิชั่นหนังโป๊มาดริด',
    es: 'Aplica ahora a la audición de películas para adultos en Madrid'
  },
  
  // FAQ
  'faqQuestion1': {
    en: 'I have no experience. Can I still apply in Madrid?',
    th: 'ฉันไม่มีประสบการณ์ ฉันยังสามารถสมัครที่มาดริดได้ไหม?',
    es: 'No tengo experiencia. ¿Aún puedo postularme en Madrid?'
  },
  'faqAnswer1': {
    en: 'Absolutely! Many of our most successful talents in Madrid started with no prior experience. We provide all necessary training and guidance to help you succeed in the adult entertainment industry. Our team will work with you to identify your strengths and help you develop the skills needed for success.',
    th: 'แน่นอน! นักแสดงที่ประสบความสำเร็จหลายคนของเราในมาดริดเริ่มต้นจากไม่มีประสบการณ์มาก่อน เราให้การฝึกอบรมและคำแนะนำที่จำเป็นทั้งหมดเพื่อช่วยให้คุณประสบความสำเร็จในอุตสาหกรรมบันเทิงสำหรับผู้ใหญ่ ทีมงานของเราจะทำงานร่วมกับคุณเพื่อระบุจุดแข็งและช่วยพัฒนาทักษะที่จำเป็นสำหรับความสำเร็จ',
    es: '¡Por supuesto! Muchos de nuestros talentos más exitosos en Madrid comenzaron sin experiencia previa. Proporcionamos toda la capacitación y orientación necesarias para ayudarte a triunfar en la industria del entretenimiento para adultos. Nuestro equipo trabajará contigo para identificar tus fortalezas y ayudarte a desarrollar las habilidades necesarias para el éxito.'
  },
  'faqQuestion2': {
    en: 'What if I don\'t have the "perfect" body type?',
    th: 'ถ้าฉันไม่มีรูปร่างที่ "สมบูรณ์แบบ" ล่ะ?',
    es: '¿Qué pasa si no tengo el tipo de cuerpo "perfecto"?'
  },
  'faqAnswer2': {
    en: 'The adult entertainment industry in Madrid values diversity! There is demand for all body types, ages, and looks. What matters most is your confidence, professionalism, and enthusiasm. Whether you\'re curvy, slim, tall, or petite, there are opportunities for you. Your unique qualities are what make you stand out.',
    th: 'วงการบันเทิงสำหรับผู้ใหญ่ในมาดริดให้คุณค่ากับความหลากหลาย! มีความต้องการทุกรูปร่าง ทุกวัย และทุกรูปลักษณ์ สิ่งสำคัญที่สุดคือความมั่นใจ ความเป็นมืออาชีพ และความกระตือรือร้นของคุณ ไม่ว่าคุณจะรูปร่างแบบไหน มีโอกาสสำหรับคุณทั้งนั้น คุณสมบัติเฉพาะตัวของคุณคือสิ่งที่ทำให้คุณโดดเด่น',
    es: '¡La industria del entretenimiento para adultos en Madrid valora la diversidad! Hay demanda para todo tipo de cuerpos, edades y apariencias. Lo más importante es tu confianza, profesionalismo y entusiasmo. Ya seas curvilínea, delgada, alta o menuda, hay oportunidades para ti. Tus cualidades únicas son lo que te hacen destacar.'
  },
  'faqQuestion3': {
    en: 'How much can I earn?',
    th: 'ฉันจะหารายได้เท่าไหร่?',
    es: '¿Cuánto puedo ganar?'
  },
  'faqAnswer3': {
    en: 'Earnings in Madrid\'s adult entertainment industry can be very lucrative, often far exceeding traditional job opportunities. Your income will depend on various factors including the type of work, your experience level, and your dedication. Many of our talents earn significantly more than they could in conventional jobs, with the potential for six-figure annual incomes for top performers.',
    th: 'รายได้ในวงการบันเทิงสำหรับผู้ใหญ่ของมาดริดอาจทำเงินได้มาก มักจะสูงกว่างานทั่วไปหลายเท่า รายได้ของคุณจะขึ้นอยู่กับหลายปัจจัยรวมถึงประเภทของงาน ระดับประสบการณ์ และความทุ่มเท ของเราหลายคนมีรายได้มากกว่าการทำงานทั่วไปอย่างมาก โดยมีศักยภาพในการสร้างรายได้หลักล้านต่อปีสำหรับนักแสดงที่ประสบความสำเร็จสูงสุด',
    es: 'Las ganancias en la industria del entretenimiento para adultos en Madrid pueden ser muy lucrativas, a menudo superando con creces las oportunidades laborales tradicionales. Tus ingresos dependerán de varios factores, incluido el tipo de trabajo, tu nivel de experiencia y tu dedicación. Muchos de nuestros talentos ganan significativamente más de lo que podrían en trabajos convencionales, con el potencial de ingresos anuales de seis cifras para los artistas más destacados.'
  },
  'faqQuestion4': {
    en: 'Can I work part-time or choose my own hours?',
    th: 'ฉันสามารถทำงานพาร์ทไทม์หรือเลือกเวลาทำงานเองได้ไหม?',
    es: '¿Puedo trabajar a tiempo parcial o elegir mis propios horarios?'
  },
  'faqAnswer4': {
    en: 'We offer flexible scheduling to accommodate your needs in Madrid. Many of our talents work part-time or choose their own hours. Whether you\'re looking for full-time work or just want to supplement your income, we can help find opportunities that fit your schedule. Some projects may require specific time commitments, but we\'ll always be upfront about expectations.',
    th: 'เรามีตารางเวลาที่ยืดหยุ่นเพื่อตอบสนองความต้องการของคุณในมาดริด นักแสดงหลายคนของเราทำงานพาร์ทไทม์หรือเลือกชั่วโมงทำงานของตัวเอง ไม่ว่าคุณกำลังมองหางานเต็มเวลาหรือเพียงแค่อยากหารายได้เสริม เราสามารถช่วยหาส่วนที่เหมาะกับตารางเวลาของคุณได้ โครงการบางโครงการอาจต้องใช้เวลาเฉพาะ แต่เราจะบอกความคาดหวังล่วงหน้าเสมอ',
    es: 'Ofrecemos horarios flexibles para adaptarnos a tus necesidades en Madrid. Muchos de nuestros talentos trabajan a tiempo parcial o eligen sus propias horas. Ya sea que busques un trabajo a tiempo completo o solo quieras complementar tus ingresos, podemos ayudarte a encontrar oportunidades que se ajusten a tu horario. Algunos proyectos pueden requerir compromisos de tiempo específicos, pero siempre seremos claros sobre las expectativas.'
  },
  'faqQuestion5': {
    en: 'Is it safe?',
    th: 'ปลอดภัยไหม?',
    es: '¿Es seguro?'
  },
  'faqAnswer5': {
    en: 'Your safety is our top priority in Madrid\'s regulated adult entertainment industry. We work exclusively with licensed, professional production companies that maintain the highest European standards of safety and discretion. All our partners are thoroughly vetted to ensure they provide safe working conditions and strictly respect performers\' boundaries. We also provide comprehensive guidance on best practices for maintaining privacy and security in this industry.',
    th: 'ความปลอดภัยของคุณคือสิ่งสำคัญที่สุดของเราในอุตสาหกรรมบันเทิงสำหรับผู้ใหญ่ที่ได้รับการควบคุมของมาดริด เราทำงานกับบริษัทผลิตที่มีใบอนุญาตและเป็นมืออาชีพเท่านั้น ซึ่งรักษามาตรฐานความปลอดภัยและความรอบคอบสูงสุดของยุโรป',
    es: 'Tu seguridad es nuestra máxima prioridad en la industria del entretenimiento para adultos regulada de Madrid. Trabajamos exclusivamente con productoras profesionales con licencia que mantienen los más altos estándares europeos de seguridad y discreción. Todos nuestros socios son minuciosamente evaluados para garantizar que ofrecen condiciones de trabajo seguras y respetan estrictamente los límites de los artistas. También ofrecemos orientación completa sobre las mejores prácticas para mantener la privacidad y seguridad en esta industria.'
  },
  'faqQuestion6': {
    en: 'What\'s it like working in Madrid?',
    th: 'การทำงานในมาดริดเป็นอย่างไร?',
    es: '¿Cómo es trabajar en Madrid?'
  },
  'faqAnswer6': {
    en: 'Working in Madrid\'s adult entertainment industry offers an exciting European lifestyle with a perfect work-life balance. Many of our talents enjoy flexible schedules that allow them to explore Spain\'s rich cultural heritage, beautiful cities, and stunning Mediterranean coastline during their free time. You\'ll be part of a professional community of like-minded individuals in one of Europe\'s most vibrant capitals. The work can be demanding but is also incredibly rewarding both personally and financially, with opportunities to travel throughout Spain and Europe.',
    th: 'การทำงานในอุตสาหกรรมบันเทิงสำหรับผู้ใหญ่ของมาดริดนำเสนอไลฟ์สไตล์แบบยุโรปที่น่าตื่นเต้นด้วยสมดุลชีวิตการทำงานที่สมบูรณ์แบบ',
    es: 'Trabajar en la industria del entretenimiento para adultos en Madrid ofrece un emocionante estilo de vida europeo con un perfecto equilibrio entre trabajo y vida personal. Muchos de nuestros artistas disfrutan de horarios flexibles que les permiten explorar la rica herencia cultural de España, sus hermosas ciudades y la impresionante costa mediterránea durante su tiempo libre. Formarás parte de una comunidad profesional de personas con intereses similares en una de las capitales más vibrantes de Europa. El trabajo puede ser exigente, pero también es increíblemente gratificante tanto a nivel personal como económico, con oportunidades para viajar por toda España y Europa.'
  },
  'faqQuestion7': {
    en: 'How do I get started?',
    th: 'ฉันจะเริ่มต้นได้อย่างไร?',
    es: '¿Cómo puedo empezar?'
  },
  'faqAnswer7': {
    en: 'The process is quick and straightforward. Once you contact us, we will guide you through every step, from preparing for your audition to connecting you with production companies looking for talent like yours. Our goal is to get you ready for your first shift as soon as possible, so you can start enjoying the benefits of your new career without delay.',
    th: 'กระบวนการนี้รวดเร็วและตรงไปตรงมา เมื่อคุณติดต่อเรา เราจะแนะนำคุณในทุกขั้นตอน ตั้งแต่การเตรียมตัวสำหรับการออดิชัน ไปจนถึงการเชื่อมต่อคุณกับบริษัทผลิตที่กำลังมองหาคนที่มีความสามารถแบบคุณ',
    es: 'El proceso es rápido y sencillo. Una vez que nos contactes, te guiaremos en cada paso, desde la preparación para tu audición hasta la conexión con productoras que buscan talento como el tuyo. Nuestro objetivo es prepararte para tu primer turno lo antes posible, para que puedas comenzar a disfrutar de los beneficios de tu nueva carrera sin demora.'
  },
  
  // Testimonials
  'mariaReview': {
    en: 'Working with this agency changed my life. The opportunities in Madrid are incredible, and the team is so supportive. I\'ve never felt more empowered in my career.',
    th: 'การทำงานกับเอเจนซี่นี้เปลี่ยนชีวิตของฉัน โอกาสในมาดริดนั้นยอดเยี่ยมมาก และทีมงานก็ให้การสนับสนุนเป็นอย่างดี ฉันไม่เคยรู้สึกมีพลังในอาชีพการงานมาก่อนเลย',
    es: 'Trabajar con esta agencia cambió mi vida. Las oportunidades en Madrid son increíbles y el equipo es muy solidario. Nunca me había sentido tan empoderada en mi carrera.'
  },
  'nokReview': {
    en: 'Working in the adult industry in Madrid has completely transformed my life. The financial freedom is incredible - I can support my family back in Andalusia and still have plenty left for myself.',
    th: 'การทำงานในอุตสาหกรรมสำหรับผู้ใหญ่ที่มาดริดได้เปลี่ยนชีวิตฉันไปอย่างสิ้นเชิง เสรีภาพทางการเงินนั้นเหลือเชื่อ ฉันสามารถสนับสนุนครอบครัวที่อันดาลูเซียและยังเหลือเงินเก็บส่วนตัวอีกมาก',
    es: 'Trabajar en la industria para adultos en Madrid ha transformado completamente mi vida. La libertad financiera es increíble: puedo mantener a mi familia en Andalucía y aún me sobra para mí.'
  },
  'carmenReview': {
    en: 'Working in Madrid\'s adult entertainment industry has been an incredibly empowering experience. The financial rewards have allowed me to achieve goals I never thought possible in Spain.',
    th: 'การทำงานในอุตสาหกรรมบันเทิงสำหรับผู้ใหญ่ที่มาดริดเป็นประสบการณ์ที่ให้พลังอย่างไม่น่าเชื่อ รางวัลทางการเงินทำให้ฉันบรรลุเป้าหมายที่คิดไม่ถึงว่าจะเป็นไปได้ในสเปน',
    es: 'Trabajar en la industria del entretenimiento para adultos en Madrid ha sido una experiencia increíblemente enriquecedora. Las recompensas económicas me han permitido alcanzar metas que nunca creí posibles en España.'
  },
  'yingReview': {
    en: 'I was hesitant at first about working in Spain\'s adult industry, but joining was the best decision I ever made. The financial stability has allowed me to pursue my dreams in Madrid.',
    th: 'ตอนแรกฉันลังเลที่จะทำงานในอุตสาหกรรมสำหรับผู้ใหญ่ของสเปน แต่การเข้าร่วมเป็นสิ่งที่ดีที่สุดที่ฉันเคยทำ ความมั่นคงทางการเงินทำให้ฉันสามารถไล่ตามความฝันในมาดริดได้',
    es: 'Al principio dudaba en trabajar en la industria para adultos de España, pero unirme fue la mejor decisión que he tomado. La estabilidad económica me ha permitido perseguir mis sueños en Madrid.'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Always default to Spanish initially
  const [language, setLanguage] = useState<Language>('es');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      // Force Spanish as default
      setLanguage('es');
      localStorage.setItem('language', 'es');
    }
    setIsInitialized(true);
  }, []);

  const toggleLanguage = () => {
    let newLang: Language;
    switch (language) {
      case 'en': newLang = 'es'; break;
      case 'es': newLang = 'th'; break;
      case 'th': newLang = 'en'; break;
      default: newLang = 'es'; // Default to Spanish
    }
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    // Force a re-render to update all translations
    window.location.reload();
  };

  const t = (key: string): string => {
    const translation = translations[key]?.[language];
    if (!translation) {
      console.warn(`Missing translation for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  // Only render children once language is initialized
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
