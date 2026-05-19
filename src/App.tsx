/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Flame, 
  Bell, 
  ShieldCheck, 
  Settings, 
  PenTool as Tool, 
  Phone, 
  Mail, 
  MapPin, 
  Menu, 
  X, 
  CheckCircle2, 
  ChevronLeft,
  MessageCircle,
  Clock,
  Briefcase,
  Plus,
  Headset,
  LayoutDashboard,
  Zap,
  Upload,
  Info,
  FileText,
  AlertTriangle,
  Activity,
  FileCheck2,
  Download,
  Check
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

  const services = [
    {
      id: "fire_systems",
      title: "أنظمة إطفاء الحريق",
      description: "تصميم وتركيب أحدث أنظمة الإطفاء التلقائية واليدوية لضمان أقصى درجات الأمان.",
      icon: Flame,
      color: "bg-red-600"
    },
    {
      id: "alarm_systems",
      title: "أنظمة الإنذار المبكر",
      description: "كاشفات دخان وحرارة متطورة مرتبطة بلوحات تحكم ذكية للحماية اللحظية.",
      icon: Bell,
      color: "bg-orange-500"
    },
    {
      id: "maintenance",
      title: "الصيانة الدورية",
      description: "فريق فني متخصص لإجراء الصيانة الفورية والدورية لضمان كفاءة الأنظمة.",
      icon: Tool,
      color: "bg-slate-900"
    },
    {
      id: "consultancy",
      title: "استشارات السلامة",
      description: "دراسة وتصميم مخططات السلامة واعتمادها من الجهات المختصة.",
      icon: ShieldCheck,
      color: "bg-red-700"
    }
  ];


const ProductQuoteCard: React.FC<{ product: any, onAdd: (qty: number, opt: string) => void }> = ({ product, onAdd }) => {
  const [qty, setQty] = useState(1);
  const [opt, setOpt] = useState(product.options?.[0] || '');

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 flex flex-col gap-6 shadow-sm hover:shadow-xl hover:border-red-100 transition-all group overflow-hidden h-full">
       <div className="flex justify-between items-start gap-4">
          <div className="space-y-4">
             <div className="inline-flex items-center px-3 py-1 bg-slate-50 rounded-full text-[10px] font-black text-red-600 uppercase tracking-widest border border-slate-100">{product.model}</div>
             <div className="space-y-1 text-right">
                <h4 className="text-xl font-black text-slate-900 leading-tight">{product.name}</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed line-clamp-3">{product.desc}</p>
             </div>
          </div>
          {product.availability && (
             <div className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm shrink-0", 
                product.availability === 'متوفر' ? "bg-green-500 text-white" : "bg-orange-500 text-white"
             )}>
                {product.availability}
             </div>
          )}
       </div>

       <div className="flex-1" />

       <div className="space-y-6 pt-6 border-t border-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {product.options && (
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase mr-1 block text-right">المواصفات</label>
                  <select 
                    value={opt}
                    onChange={(e) => setOpt(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-red-200 transition-all"
                  >
                     {product.options.map((o: string) => <option key={o} value={o}>{o}</option>)}
                  </select>
               </div>
             )}
             <div className={cn("space-y-1", !product.options && "col-span-1 sm:col-span-2")}>
                <label className="text-[10px] font-black text-slate-400 uppercase mr-1 block text-right">الكمية</label>
                <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl overflow-hidden h-full min-h-[46px]">
                   <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-full flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer border-l border-slate-100">
                      <X size={12} className="rotate-45" />
                   </button>
                   <input 
                     type="number" 
                     value={qty} 
                     onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                     className="w-full text-center bg-transparent text-xs font-black focus:outline-none" 
                   />
                   <button onClick={() => setQty(qty + 1)} className="w-12 h-full flex items-center justify-center hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors cursor-pointer border-r border-slate-100">
                      <Plus size={14} />
                   </button>
                </div>
             </div>
          </div>

          <button 
            onClick={() => onAdd(qty, opt)}
            className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs hover:bg-red-600 transition-all flex items-center justify-center gap-3 shadow-lg shadow-black/5 active:scale-95"
          >
             <Plus size={16} />
             إضافة لطلب عرض السعر
          </button>
       </div>
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'maintenance' | 'support' | 'admin' | 'quote' | 'admin_login' | 'fire_systems' | 'alarm_systems' | 'consultancy' | 'approvals' | 'risk_assessment' | 'safety_reports'>('home');
  const [allProjects, setAllProjects] = useState([
    { title: "تجهيز مستودعات لوجستية", category: "نظام رش آلي سقف علوي", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800" },
    { title: "مباني إدارية ذكية", category: "أنظمة إنذار معنونة متكاملة", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" },
    { title: "مرافق صناعية كبرى", category: "شبكات مضخات إطفاء مركزية", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" },
    { title: "مستودعات تخزين طاقة", category: "أنظمة إطفاء بالغاز النظيف", img: "https://images.unsplash.com/photo-1596753173741-26c39178bb04?q=80&w=800" }
  ]);
  const [tickets, setTickets] = useState<any[]>([
    { id: 1, name: 'سارة أحمد', phone: '056000000', email: 'sara@example.com', type: 'عطل مفاجئ', description: 'لوحة الإنذار تصدر صوتاً مستمراً بدون وجود حريق.', status: 'new', date: new Date().toLocaleDateString('ar-SA') },
    { id: 2, name: 'فهد العتيبي', phone: '054000000', email: 'fahad@example.com', type: 'طلب مساعدة', description: 'كيف يمكنني تحديث عقود الصيانة السنوية؟', status: 'resolved', date: new Date().toLocaleDateString('ar-SA') }
  ]);
  const [quoteRequests, setQuoteRequests] = useState<any[]>([]);
  const [approvalRequests, setApprovalRequests] = useState<any[]>([
    { id: 'AP-2045', project: 'برج اليمامة السياحي', owner: 'شركة المشاريع الكبرى', phone: '056777888', area: '12000', city: 'الرياض', status: 'pending', date: '2026-05-18' },
    { id: 'AP-2042', project: 'مستودع الأدوية المركزي', owner: 'مجموعة الصحة العالمية', phone: '059990000', area: '4500', city: 'جدة', status: 'approved', date: '2026-05-15' }
  ]);
  const [riskAssessmentRequests, setRiskAssessmentRequests] = useState<any[]>([]);
  const [safetyReportRequests, setSafetyReportRequests] = useState<any[]>([]);
  const [submittedQuote, setSubmittedQuote] = useState<any>(null);
  const [submittedApproval, setSubmittedApproval] = useState<any>(null);
  const [submittedRiskAssessment, setSubmittedRiskAssessment] = useState<any>(null);
  const [submittedSafetyReport, setSubmittedSafetyReport] = useState<any>(null);
  const [adminTab, setAdminTab] = useState<'tickets' | 'quotes' | 'approvals' | 'risk_assessment' | 'projects'>('tickets');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Check for existing session
  useEffect(() => {
    const session = localStorage.getItem('admin_session');
    if (session === 'active') {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // Admin Credentials
    if (email === 'admin@orkit.com' && password === 'Orkit2026') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('admin_session', 'active');
      setActiveTab('admin');
    } else {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_session');
    setActiveTab('home');
  };

  // Redirect if unauthorized
  useEffect(() => {
    if (activeTab === 'admin' && !isAdminAuthenticated) {
      setActiveTab('home');
    }
  }, [activeTab, isAdminAuthenticated]);

  const CONTACT_PHONE = "0552232752";
  const CONTACT_EMAIL = "orkitcompany@gmail.com";
  const CONTACT_ADDRESS = "المملكة العربية السعودية، ابها - خميس";

  const quoteCategories = [
    {
      id: "fire_alarm",
      title: "أنظمة إنذار الحريق الذكية",
      description: "حلول إنذار متطورة متوافقة مع معايير الدفاع المدني (المعنونة والتقليدية)",
      products: [
        { id: "fa1", name: "لوحة تحكم معنونة", model: "Adv-X4", desc: "لوحة تحكم مركزية تدعم حتى 4 لوب، مع شاشة لمس وبرمجة متقدمة.", availability: "متوفر", options: ["1 لوب", "2 لوب", "4 لوب"] },
        { id: "fa2", name: "كاشف دخان ضوئي", model: "SD-10", desc: "تقنية الكشف الضوئي الدقيقة لتقليل الإنذارات الكاذبة.", availability: "متوفر" },
        { id: "fa3", name: "كاشف حراري ثابت", model: "HD-20", desc: "مثالي للمطابخ والجراجات والمناطق التي يكثر بها الأبخرة.", availability: "متوفر" },
        { id: "fa4", name: "كاسر زجاج يدوي", model: "MCP-01", desc: "نقطة استدعاء يدوية قابلة لإعادة الضبط مع غطاء حماية.", availability: "متوفر" },
        { id: "fa5", name: "جرس إنذار أحمر", model: "BL-100", desc: "صوت تنبيه عالي جداً 95 ديسيبل، يغطي مساحات واسعة.", availability: "متوفر", options: ["6 إنش", "8 إنش"] },
        { id: "fa6", name: "سارينة مع فلاش", model: "SF-200", desc: "تنبيه صوتي وضوئي متكامل للممرات ومخارج الطوارئ.", availability: "طلب مسبق" }
      ]
    },
    {
      id: "firefighting",
      title: "معدات وأنظمة مكافحة الحريق",
      description: "أنظمة الإطفاء المائية والكيميائية لتأمين المنشآت الصناعية والتجارية",
      products: [
        { id: "ff1", name: "طفاية بودرة جافة", model: "P-6", desc: "طفاية شاملة (A, B, C) معتمدة من الهيئة السعودية للمواصفات.", availability: "متوفر", options: ["1kg", "6kg", "12kg"] },
        { id: "ff2", name: "طفاية ثاني أكسيد الكربون", model: "CO-5", desc: "لحرائق الكهرباء والمواد الحساسة، لا تترك مخلفات.", availability: "متوفر", options: ["2kg", "5kg"] },
        { id: "ff3", name: "صندوق خراطيم حريق", model: "HC-2", desc: "خزانة استيل مجلفن بخرطوم مطاطي 30 متر مع بكرة دوارة.", availability: "متوفر", options: ["1 إنش", "1.5 إنش"] },
        { id: "ff4", name: "مضخة حريق ديزل", model: "D-Fire 500", desc: "وحدة ضخ متكاملة مع لوحة تحكم أوتوماتيكية وضمان شامل.", availability: "طلب مسبق" },
        { id: "ff5", name: "رأس رشاش مياه", model: "SP-68", desc: "استجابة سريعة عند 68 درجة مئوية، تغطية واسعة.", availability: "متوفر", options: ["نحاسي", "كروم"] },
        { id: "ff6", name: "محبس حريق (هيدرنت)", model: "Hydrant-S", desc: "محبس دفاع مدني خارجي بفتحتين للربط السريع.", availability: "متوفر" }
      ]
    },
    {
      id: "safety",
      title: "حلول السلامة والحماية المتكاملة",
      description: "أنظمة المساندة والوقاية لضمان إخلاء آمن وحماية مدار الساعة",
      products: [
        { id: "ss1", name: "لوحة مخرج طوارئ", model: "Exit-Sign", desc: "لوحة LED مضيئة تعمل عند انقطاع الكهرباء لمدة 3 ساعات.", availability: "متوفر" },
        { id: "ss2", name: "إضاءة طوارئ", model: "Em-Light", desc: "كشاف مزدوج الرأس عالي السطوع للإخلاء الآمن.", availability: "متوفر" },
        { id: "ss3", name: "لوحة تحكم أمنية", model: "Safety-Core", desc: "مركز ربط لجميع الحساسات وفتح الأبواب الآلي عند الحريق.", availability: "متوفر" },
        { id: "ss4", name: "كاميرا كشف حراري", model: "Thermal-C1", desc: "تنبيه مبكر عند ارتفاع درجات حرارة الأجهزة أو الكابلات.", availability: "طلب خاص" },
        { id: "ss5", name: "خزان مياه حريق", model: "Tank-X", desc: "خزانات معزولة بأحجام سعة 50,000 لتر وما فوق.", availability: "متوفر", options: ["10k L", "25k L", "50k L"] },
        { id: "ss6", name: "جهاز كشف تسرب غاز", model: "GD-30", desc: "كشف سريع وتنبيه صوتي ومرئي وربط مع المحابس.", availability: "متوفر" }
      ]
    }
  ];

  const [quoteSelection, setQuoteSelection] = useState<any[]>([]);

  const handleAddToQuote = (product: any, quantity: number, option: string) => {
    const existing = quoteSelection.find(p => p.id === product.id && p.option === option);
    if (existing) {
      setQuoteSelection(quoteSelection.map(p => p.id === product.id && p.option === option ? { ...p, quantity: p.quantity + quantity } : p));
    } else {
      setQuoteSelection([...quoteSelection, { ...product, quantity, option }]);
    }
  };

  const removeFromQuote = (id: string, option: string) => {
    setQuoteSelection(quoteSelection.filter(p => !(p.id === id && p.option === option)));
  };

  const maintenanceServices = [
    {
      id: "alarm",
      title: "صيانة أنظمة إنذار الحريق",
      description: "فحص دوري للحساسات والكواشف ولوحات التحكم لضمان سرعة الاستجابة عند الطوارئ.",
      icon: Bell,
      details: "تشمل خدمتنا تنظيف الكواشف، اختبار البطاريات، وتحديث برمجة اللوحات."
    },
    {
      id: "fighting",
      title: "صيانة أنظمة الإطفاء",
      description: "صيانة شاملة للطفايات، الرش الآلي، المضخات وخزانات المياه لضمان جهوزيتها.",
      icon: Flame,
      details: "نقوم بإعادة تعبئة الطفايات وفحص ضغط المواسير وتجربة المضخات."
    },
    {
      id: "periodic",
      title: "العقود والصيانة الدورية",
      description: "خطط صيانة شهرية وسنوية معتمدة تضمن توافق مبناك مع معايير الدفاع المدني.",
      icon: Clock,
      details: "زيارات مجدولة وتقارير فنية مفصلة لكل زيارة مع ملصقات الأمان."
    },
    {
      id: "emergency",
      title: "الأعطال والطوارئ",
      description: "فريق تدخل سريع متاح على مدار الساعة لمعالجة الأعطال المفاجئة في الأنظمة.",
      icon: ShieldCheck,
      details: "نصلكم في وقت قياسي لإصلاح أي خلل يهدد سلامة المنشأة."
    },
    {
      id: "reports",
      title: "التقارير الفنية",
      description: "إصدار تقارير فنية احترافية ومعتمدة توضح حالة الأنظمة والإصلاحات المنفذة.",
      icon: Briefcase,
      details: "وثائق رسمية تدعم ملفات السلامة الخاصة بمنشأتك أمام الجهات الرقابية."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-red-100 selection:text-red-600">
      {/* Floating Buttons Stack */}
      <div className="fixed bottom-8 left-8 z-[100] flex flex-col items-center gap-4">
        {/* Support Button */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveTab('support')}
          className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-500/40 hover:bg-black transition-all group relative"
          title="الدعم الفني"
        >
          <div className="absolute -right-3 -top-1 bg-red-500 text-[10px] px-2 py-0.5 rounded-full border-2 border-white animate-bounce">24/7</div>
          <Headset size={30} />
        </motion.button>

        {/* SMS Button */}
        <motion.a
          whileHover={{ scale: 1.15, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          href={`sms:${CONTACT_PHONE}`}
          className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl shadow-slate-900/40 hover:bg-red-600 transition-all"
          title="إرسال رسالة نصية"
        >
          <Mail size={28} />
        </motion.a>

        {/* WhatsApp Button */}
        <motion.a
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          href={`https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent("مرحباً، أريد الاستفسار عن خدمات الإطفاء والإنذار.")}`}
          className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 hover:bg-green-600 transition-all"
          title="واتساب مباشر"
        >
          <MessageCircle size={32} />
        </motion.a>

        {/* Call Button */}
        <motion.a
          whileHover={{ scale: 1.15, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          href={`tel:${CONTACT_PHONE}`}
          className="w-16 h-16 bg-white text-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-black/5 hover:bg-red-50 transition-all border border-slate-100"
          title="اتصال هاتفي"
        >
          <Phone size={28} fill="currentColor" />
        </motion.a>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
              <Flame size={28} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">الدرع الواقي</h1>
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">لأنظمة الحريق والسلامة</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => setActiveTab('home')} className={cn("text-sm font-bold transition-colors", activeTab === 'home' ? "text-red-600" : "hover:text-red-600")}>الرئيسية</button>
            <a href="#خدماتنا" className="text-sm font-bold hover:text-red-600 transition-colors">خدماتنا</a>
            <button onClick={() => setActiveTab('maintenance')} className={cn("text-sm font-bold transition-colors", activeTab === 'maintenance' ? "text-red-600" : "hover:text-red-600")}>الصيانة</button>
            <button onClick={() => setActiveTab('approvals')} className={cn("text-sm font-bold transition-colors", activeTab === 'approvals' ? "text-red-600" : "hover:text-red-600")}>اعتماد المشاريع</button>
            <button onClick={() => setActiveTab('safety_reports')} className={cn("text-sm font-bold transition-colors", activeTab === 'safety_reports' ? "text-red-600" : "hover:text-red-600")}>تقارير السلامة</button>
            <button onClick={() => setActiveTab('risk_assessment')} className={cn("text-sm font-bold transition-colors", activeTab === 'risk_assessment' ? "text-red-600" : "hover:text-red-600")}>تقييم المخاطر</button>
            <button onClick={() => setActiveTab('support')} className={cn("text-sm font-bold transition-colors flex items-center gap-1.5", activeTab === 'support' ? "text-red-600" : "hover:text-red-600")}>
              <Headset size={16} />
              الدعم الفني
            </button>
            <a href="#أعمالنا" className="text-sm font-bold hover:text-red-600 transition-colors">أعمالنا</a>
            {isAdminAuthenticated && (
               <button onClick={() => setActiveTab('admin')} className={cn("px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-red-100 hover:bg-red-600 hover:text-white transition-all")}>لوحة التحكم</button>
            )}
            <button 
              onClick={() => setActiveTab('quote')}
              className="px-6 py-2.5 bg-red-600 text-white rounded-full font-bold text-sm shadow-lg shadow-red-500/20 hover:bg-black transition-all"
            >
              طلب عرض سعر
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(true)}>
            <Menu />
          </button>
        </div>
      </nav>

      {/* Main Content Render */}
      <AnimatePresence mode="wait">
        {activeTab === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Hero Section */}
            <header className="relative py-24 lg:py-36 overflow-hidden bg-white">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 -skew-x-12 transform origin-top" />
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-16 relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck size={14} />
                    معتمدون من الدفاع المدني
                  </div>
                  <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">
                    نؤمن مستقبلك <br /> 
                    <span className="text-red-600">بأنظمة ذكية</span>
                  </h2>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                    الدرع الواقي هي الشركة الرائدة في تقديم حلول الأمن والسلامة المتكاملة. نتميز بتقديم أحدث تقنيات الإنذار والإطفاء لضمان استقرار أعمالكم وحماية أرواحكم.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => setActiveTab('quote')}
                      className="px-10 py-5 bg-red-600 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-2xl shadow-red-500/30"
                    >
                      طلب عرض سعر
                    </button>
                    <button onClick={() => setActiveTab('maintenance')} className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                      خدمات الصيانة
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                   <div className="absolute inset-0 bg-red-600 rounded-[3rem] blur-3xl opacity-10 animate-pulse" />
                   <img 
                     src="https://images.unsplash.com/photo-1599707334706-a728ee3e3943?q=80&w=1200" 
                     alt="Fire Safety Systems" 
                     className="rounded-[3rem] shadow-2xl border-4 border-white relative z-10"
                   />
                </motion.div>
              </div>
            </header>

            {/* Services Preview */}
            <section id="خدماتنا" className="py-24 bg-white border-t border-slate-100">
               <div className="max-w-7xl mx-auto px-6">
                <div className="text-center space-y-4 mb-20">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-black">خدماتنا المتكاملة</h3>
                  <h4 className="text-4xl lg:text-5xl font-black tracking-tighter">حلول متطورة لكل تحدي</h4>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {services.map((service, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      onClick={() => setActiveTab(service.id as any)}
                      className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-200/50 hover:bg-white hover:shadow-2xl transition-all cursor-pointer group"
                    >
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform", service.color)}>
                        <service.icon size={28} />
                      </div>
                      <h5 className="text-xl font-black mb-4">{service.title}</h5>
                      <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Portfolio Section */}
            <section id="أعمالنا" className="py-24 bg-slate-900 text-white overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-red-500 font-black">معرض الأعمال</h3>
                    <h4 className="text-4xl lg:text-5xl font-black tracking-tighter">مشاريع وثقت بنا</h4>
                  </div>
                  <button className="text-sm font-bold border-b-2 border-red-500 pb-1 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-2">
                    مشاهدة جميع المشاريع
                    <ChevronLeft size={16} />
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                  {allProjects.map((project, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6">
                        <img 
                          src={project.img} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                      </div>
                      <h5 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">{project.title}</h5>
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{project.category}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Banner */}
            <section className="py-20 bg-red-600 text-white">
              <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between gap-12">
                 <div className="flex items-center gap-5">
                    <Clock size={40} className="opacity-50" />
                    <div>
                      <div className="text-2xl font-black">24/7</div>
                      <div className="text-xs opacity-80 font-bold uppercase">دعم فني مباشر</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-5">
                    <Briefcase size={40} className="opacity-50" />
                    <div>
                      <div className="text-2xl font-black">500+</div>
                      <div className="text-xs opacity-80 font-bold uppercase">مشروع منفذ</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-5">
                    <ShieldCheck size={40} className="opacity-50" />
                    <div>
                      <div className="text-2xl font-black">100%</div>
                      <div className="text-xs opacity-80 font-bold uppercase">ضمان الجودة</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-5">
                    <MapPin size={40} className="opacity-50" />
                    <div>
                      <div className="text-2xl font-black">المملكة</div>
                      <div className="text-xs opacity-80 font-bold uppercase">تغطية شاملة</div>
                    </div>
                 </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="اتصل-بنا" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-[10px] uppercase tracking-[0.4em] text-red-600 font-black">اتصل بنا</h3>
                    <h4 className="text-4xl lg:text-5xl font-black tracking-tighter">فلنتحدث عن سلامتك</h4>
                  </div>

                  <div className="grid gap-10">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase mb-1">الرقم الموحد</div>
                        <div className="text-xl font-black">{CONTACT_PHONE}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 flex-shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-bold uppercase mb-1">البريد الإلكتروني</div>
                        <div className="text-xl font-black">{CONTACT_EMAIL}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-12 rounded-[3.5rem] border border-slate-100">
                  <form 
                    className="space-y-6"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newTicket = {
                        id: Date.now(),
                        name: formData.get('name'),
                        phone: formData.get('phone'),
                        email: formData.get('email'),
                        type: 'طلب عام / عرض سعر',
                        description: formData.get('message'),
                        status: 'new',
                        date: new Date().toLocaleDateString('ar-SA')
                      };
                      setTickets([newTicket, ...tickets]);
                      alert('تم استلام طلبك بنجاح! فريق المبيعات سيتواصل معك قريباً.');
                      e.currentTarget.reset();
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs text-slate-500 font-bold uppercase mr-1">الاسم بالكامل</label>
                        <input name="name" type="text" required className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-slate-500 font-bold uppercase mr-1">رقم الهاتف</label>
                        <input name="phone" type="tel" required className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-500 font-bold uppercase mr-1">البريد الإلكتروني</label>
                      <input name="email" type="email" required className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-500 font-bold uppercase mr-1">الرسالة أو نوع النظام المطلوب</label>
                      <textarea name="message" required rows={4} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-500 transition-colors resize-none" />
                    </div>
                    <button type="submit" className="w-full py-5 bg-red-600 text-white rounded-2xl font-bold shadow-xl shadow-red-500/20 hover:bg-black transition-all">
                      إرسال الطلب الآن
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </motion.div>
        ) : activeTab === 'admin_login' ? (
          <motion.div
            key="admin_login"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50"
          >
             <div className="max-w-md w-full bg-white rounded-[3.5rem] p-12 shadow-2xl border border-white space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 -rotate-45 transform translate-x-12 -translate-y-12" />
                
                <div className="text-center space-y-4 relative z-10">
                   <div className="w-20 h-20 bg-red-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-red-500/20 rotate-3 animate-pulse">
                      <ShieldCheck size={40} />
                   </div>
                   <div>
                      <h2 className="text-3xl font-black tracking-tight">إدارة الأنظمة</h2>
                      <p className="text-slate-400 font-bold mt-2">تسجيل الدخول للوحة التحكم المركزية</p>
                   </div>
                </div>

                <form className="space-y-6 relative z-10" onSubmit={handleAdminLogin}>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">البريد الإداري</label>
                      <input name="email" type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="admin@orkit.com" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mr-2">كلمة المرور</label>
                      <input name="password" type="password" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="••••••••" />
                   </div>
                   <button type="submit" className="w-full py-5 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-500/30 hover:bg-black transition-all transform active:scale-[0.98]">
                      فتح لوحة التحكم
                   </button>
                </form>

                <div className="text-center">
                   <button onClick={() => setActiveTab('home')} className="text-xs font-bold text-slate-400 hover:text-red-600 transition-colors">
                      العودة للموقع
                   </button>
                </div>
             </div>
          </motion.div>
        ) : activeTab === 'quote' ? (
          <motion.div
            key="quote"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-24"
          >
            {/* Quote Hero */}
            <section className="bg-white py-20 border-b border-slate-100">
               <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-2xl text-sm font-bold">
                    <Plus size={18} />
                    نظام طلب عروض الأسعار الذكي
                  </div>
                  <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">اختر الأنظمة المطلوبة بدقة</h2>
                  <p className="text-slate-500 text-lg max-w-2xl mx-auto">تصفح منتجاتنا، حدد الكميات والمواصفات، وسنقوم بتجهيز عرض سعر مخصص لمنشأتك خلال وقت قياسي.</p>
               </div>
            </section>

            {/* Quote Sections */}
            <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-12">
               {/* Categories & Products */}
               <div className="lg:col-span-2 space-y-24">
                  {quoteCategories.map((cat) => (
                    <div key={cat.id} className="space-y-10">
                       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8">
                          <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <div className="h-4 w-4 bg-red-600 rounded-full" />
                                <h3 className="text-3xl font-black">{cat.title}</h3>
                             </div>
                             <p className="text-slate-400 font-bold text-sm mr-7">{cat.description}</p>
                          </div>
                          <span className="bg-slate-50 text-slate-500 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">{cat.products.length} منتجات</span>
                       </div>
                       
                       <div className="grid md:grid-cols-2 gap-8">
                          {cat.products.map((prod) => (
                            <ProductQuoteCard 
                              key={prod.id} 
                              product={prod} 
                              onAdd={(qty, opt) => handleAddToQuote(prod, qty, opt)}
                            />
                          ))}
                       </div>
                    </div>
                  ))}
               </div>

               {/* Selection Summary sticky sidebar */}
               <div className="lg:col-span-1">
                  <div className="sticky top-32 space-y-8">
                     <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 space-y-8">
                        <div className="flex items-center justify-between">
                           <h4 className="text-xl font-black">ملخص الطلب</h4>
                           <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-black">{quoteSelection.length} منتجات</span>
                        </div>

                        {quoteSelection.length === 0 ? (
                          <div className="py-12 text-center space-y-4">
                             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                <Plus size={32} />
                             </div>
                             <p className="text-slate-400 font-bold">لم تختر أي منتجات بعد</p>
                          </div>
                        ) : (
                          <>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                               {quoteSelection.map((item, i) => (
                                 <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl group relative">
                                    <button 
                                      onClick={() => removeFromQuote(item.id, item.option)}
                                      className="absolute -top-2 -left-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                       <X size={12} />
                                    </button>
                                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                                       <img src={item.img} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                       <div className="text-sm font-black">{item.name}</div>
                                       <div className="text-[10px] text-slate-400 font-bold uppercase">{item.option ? `${item.option} • ` : ''}كمية: {item.quantity}</div>
                                    </div>
                                 </div>
                               ))}
                            </div>

                            <form 
                              className="space-y-4 pt-4 border-t border-slate-100"
                              onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const qNumber = `Q-${Math.floor(1000 + Math.random() * 9000)}`;
                                const newQuote = {
                                  id: Date.now(),
                                  quoteNumber: qNumber,
                                  name: formData.get('userName'),
                                  phone: formData.get('userPhone'),
                                  items: quoteSelection,
                                  status: 'processing',
                                  date: new Date().toLocaleDateString('ar-SA')
                                };
                                setQuoteRequests([newQuote, ...quoteRequests]);
                                setSubmittedQuote(newQuote);
                                setQuoteSelection([]);
                              }}
                            >
                               <div className="space-y-2">
                                  <label className="text-xs font-bold text-slate-500 uppercase mr-2">اسم المنشأة / العميل</label>
                                  <input name="userName" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-red-600 font-bold text-sm" placeholder="أدخل اسمك أو شركتك" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-xs font-bold text-slate-500 uppercase mr-2">رقم الجوال للتواصل</label>
                                  <input name="userPhone" required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-red-600 font-bold text-sm" placeholder="05xxxxxxxx" />
                               </div>
                               <button type="submit" className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-xl shadow-red-500/20 hover:bg-black transition-all">
                                  إرسال طلب عروض السعر
                               </button>
                            </form>
                          </>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
               {submittedQuote && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
                 >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full text-center space-y-8 shadow-2xl relative"
                    >
                       <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 size={48} />
                       </div>
                       <div className="space-y-3">
                          <h3 className="text-3xl font-black">تم استلام طلبك بنجاح</h3>
                          <p className="text-slate-500 font-bold">يرجى انتظار مراجعة فريق التسعير وسيتم التواصل معك قريباً.</p>
                       </div>
                       
                       <div className="bg-slate-50 rounded-3xl p-6 grid grid-cols-2 gap-4 text-right">
                          <div>
                             <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">رقم الطلب</div>
                             <div className="text-xl font-black text-red-600">{submittedQuote.quoteNumber}</div>
                          </div>
                          <div>
                             <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">حالة الطلب</div>
                             <div className="text-xl font-black text-slate-900">تحت المعالجة</div>
                          </div>
                       </div>

                       <button 
                         onClick={() => {
                           setSubmittedQuote(null);
                           setActiveTab('home');
                         }}
                         className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all"
                       >
                          العودة للرئيسية
                       </button>
                    </motion.div>
                 </motion.div>
               )}
            </AnimatePresence>
          </motion.div>
        ) : activeTab === 'maintenance' ? (
          <motion.div
            key="maintenance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pb-24"
          >
            {/* Maintenance Hero */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
               <div className="absolute inset-0 bg-red-600/5 bg-[radial-gradient(circle_at_30%_50%,rgba(220,38,38,0.1),transparent_50%)]" />
               <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-red-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-red-600/40"
                  >
                    <Tool size={40} />
                  </motion.div>
                  <div className="space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">خدمات صيانة أنظمة الإطفاء والإنذار</h2>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      الصيانة الدورية ليست مجرد قانون، بل هي ضرورة لضمان عمل أنظمة السلامة بكفاءة عالية وحماية الأرواح والممتلكات عند حدوث أي طارئ.
                    </p>
                  </div>
               </div>
            </section>

            {/* Maintenance Categories */}
            <section className="max-w-7xl mx-auto px-6 -mt-12">
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {maintenanceServices.map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 hover:border-red-500/30 transition-all group"
                    >
                      <div className="w-16 h-16 bg-slate-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                        <s.icon size={32} />
                      </div>
                      <h3 className="text-2xl font-black mb-4">{s.title}</h3>
                      <p className="text-slate-500 text-sm mb-6 leading-relaxed">{s.description}</p>
                      <div className="p-4 bg-slate-50 rounded-2xl mb-8">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">تفاصيل الخدمة</p>
                        <p className="text-xs text-slate-600 font-medium">{s.details}</p>
                      </div>
                      <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-red-600 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-600/20">
                         طلب الخدمة الآن
                         <ChevronLeft size={16} />
                      </button>
                    </motion.div>
                  ))}
               </div>
            </section>

            {/* Maintenance Contracts Section */}
            <section className="max-w-7xl mx-auto px-6 py-24 bg-white rounded-[4rem] border border-slate-100 shadow-xl mt-24">
               <div className="grid lg:grid-cols-2 gap-16 items-center p-12 lg:p-20">
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <h3 className="text-4xl font-black tracking-tighter">عقود الصيانة الدورية المعتمدة</h3>
                        <p className="text-slate-500 text-lg leading-relaxed">نقدم عقود صيانة سنوية وشبه سنوية تضمن بقاء منشأتك في حالة آمنة تماماً وتوافق كامل مع اشتراطات الدفاع المدني.</p>
                     </div>
                     <div className="space-y-6">
                        {[
                          { title: "العقد الفضي", desc: "زيارتين في السنة مع فحص كامل لكل الأنطمة.", price: "مثالي للمحلات والمكاتب" },
                          { title: "العقد الذهبي", desc: "4 زيارات سنوية مع صيانة وقائية شاملة وتغطية طوارئ.", price: "مثالي للمباني الإدارية" },
                          { title: "العقد الماسي", desc: "زيارات شهرية منتظمة مع دعم فني 24/7 وقطع غيار بأسعار مخفضة.", price: "مثالي للمصانع والمستشفيات" }
                        ].map((plan, i) => (
                           <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:border-red-600/30 transition-all">
                              <div className="space-y-1">
                                 <h5 className="font-black text-slate-900">{plan.title}</h5>
                                 <p className="text-xs text-slate-400 font-bold">{plan.desc}</p>
                              </div>
                              <div className="text-right">
                                 <div className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none mb-1">الملاءمة</div>
                                 <div className="text-xs font-black text-slate-900">{plan.price}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <button onClick={() => setActiveTab('support')} className="w-full py-5 bg-red-600 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-all">اطلب عقد صيانة الآن</button>
                  </div>
                  <div className="relative">
                     <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 relative z-10">
                        <h4 className="text-2xl font-black">جدول الزيارات القادمة</h4>
                        <div className="space-y-4">
                           {[
                             { date: "25 مايو 2026", task: "فحص مضخات الحريق وتجربة الرشاشات", status: "مجدول" },
                             { date: "02 يونيو 2026", task: "اختبار لوحات الإنذار وتغيير البطاريات", status: "مجدول" },
                             { date: "15 يونيو 2026", task: "فحص تقني شامل وتحديث شهادات السلامة", status: "مؤكد" }
                           ].map((visit, i) => (
                              <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 items-center">
                                 <div className="w-10 h-10 bg-red-600/20 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Clock size={20} />
                                 </div>
                                 <div className="flex-1">
                                    <div className="text-[10px] text-slate-500 font-bold">{visit.date}</div>
                                    <div className="text-xs font-black">{visit.task}</div>
                                 </div>
                                 <div className="px-3 py-1 bg-green-500 text-[10px] font-black rounded-full uppercase">{visit.status}</div>
                              </div>
                           ))}
                        </div>
                        <div className="pt-4">
                           <button className="w-full py-4 border border-white/20 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                             <Briefcase size={14} />
                             تحميل نموذج تقرير الصيانة (PDF)
                           </button>
                        </div>
                     </div>
                     <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
                     <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/10 rounded-full blur-3xl" />
                  </div>
               </div>
            </section>

            {/* Smart Request Form */}
            <section className="max-w-7xl mx-auto px-6 py-24">
               <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden grid lg:grid-cols-2">
                  <div className="p-12 lg:p-20 space-y-10">
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black tracking-tighter">طلب صيانة ذكي</h3>
                      <p className="text-slate-500">املأ النموذج أدناه وسيقوم فريقنا بالتواصل معك خلال أقل من 30 دقيقة.</p>
                    </div>

                    <form 
                       className="space-y-6"
                       onSubmit={(e) => {
                         e.preventDefault();
                         const formData = new FormData(e.currentTarget);
                         const newTicket = {
                           id: Date.now(),
                           name: formData.get('name'),
                           phone: formData.get('phone'),
                           type: `صيانة: ${formData.get('maintenance_type')}`,
                           description: formData.get('description'),
                           status: 'new',
                           date: new Date().toLocaleDateString('ar-SA')
                         };
                         setTickets([newTicket, ...tickets]);
                         alert('تم إرسال طلب الصيانة بنجاح! فريق التدخل السريع سيتواصل معك خلال 30 دقيقة.');
                         setActiveTab('home');
                       }}
                     >
                       <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">الاسم بالكامل</label>
                            <input name="name" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all" placeholder="أدخل اسمك هنا" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">رقم الجوال</label>
                            <input name="phone" type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all" placeholder="05xxxxxxxx" />
                          </div>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">نوع النظام المراد صيانته</label>
                          <select name="maintenance_type" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all appearance-none cursor-pointer">
                            <option value="نظام إنذار حريق">نظام إنذار حريق</option>
                            <option value="نظام رش آلي / مضخات">نظام رش آلي / مضخات</option>
                            <option value="طفايات حريق">طفايات حريق</option>
                            <option value="نظام أمان متكامل">نظام أمان متكامل</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">وصف العطل أو الطلب</label>
                          <textarea name="description" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all h-32" placeholder="اشرح لنا المشكلة أو نوع الصيانة المطلوبة..." />
                       </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2 group flex items-center gap-2 cursor-pointer">
                            <span>رفع صورة للعطل (اختياري)</span>
                            <Tool size={14} className="text-red-600" />
                          </label>
                          <div className="w-full border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-red-300 transition-colors cursor-pointer group">
                             <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                               <Plus className="text-slate-400 group-hover:text-red-500" />
                             </div>
                             <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">اضغط للرفع أو اسحب الصورة هنا</p>
                          </div>
                       </div>

                       <button className="w-full py-5 bg-red-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-red-500/30 hover:bg-black transition-all">
                          إرسال طلب الصيانة
                       </button>
                    </form>
                  </div>

                  <div className="bg-slate-900 p-12 lg:p-20 text-white flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600 rounded-full blur-[100px]" />
                     </div>
                     <div className="relative z-10 space-y-12">
                        <div className="space-y-6">
                          <h4 className="text-3xl font-black tracking-tighter">لماذا تختار خدمة صيانة الدرع الواقي؟</h4>
                          <ul className="space-y-4">
                            {[
                              "سرعة استجابة فائقة للبلاغات الطارئة",
                              "مهندسون وفنيون معتمدون ومحترفون",
                              "استخدام قطع غيار أصلية ومضمونة",
                              "تغطية شاملة لجميع مدن المملكة",
                              "تقارير فنية إلكترونية فورية"
                            ].map((item, i) => (
                              <li key={i} className="flex items-center gap-4 text-sm font-bold text-slate-300">
                                <CheckCircle2 className="text-red-500 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-6">
                           <p className="font-bold">هل تحتاج لمساعدة فورية؟</p>
                           <div className="flex flex-col gap-4">
                              <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-4 group">
                                 <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Phone />
                                 </div>
                                 <div>
                                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-widest">اتصل بنا</div>
                                    <div className="text-lg font-black tracking-tight">{CONTACT_PHONE}</div>
                                 </div>
                              </a>
                              <a href={`https://wa.me/${CONTACT_PHONE}`} className="flex items-center gap-4 group">
                                 <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MessageCircle />
                                 </div>
                                 <div>
                                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-widest">واتساب مباشر</div>
                                    <div className="text-lg font-black tracking-tight">رئيس قسم الصيانة</div>
                                 </div>
                              </a>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
          </motion.div>
        ) : activeTab === 'fire_systems' ? (
          <motion.div
            key="fire_systems"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-24"
          >
            {/* Fire Systems Hero */}
            <section className="bg-red-600 text-white py-24 relative overflow-hidden">
               <div className="absolute inset-0 bg-black/10 bg-[radial-gradient(circle_at_70%_50%,rgba(0,0,0,0.2),transparent_50%)]" />
               <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 items-center gap-12">
                  <div className="space-y-8 text-right">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">
                      نظم المكافحة المتكاملة
                    </div>
                    <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none">أنظمة إطفاء الحريق المتطورة</h2>
                    <p className="text-red-50 text-xl leading-relaxed max-w-xl">
                      نقدم حلولاً هندسية متكاملة تبدأ من التصميم المعتمد وتنتهي بالتركيب والتشغيل وفق كود البناء السعودي ومعايير NFPA العالمية.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                       <button onClick={() => setActiveTab('quote')} className="px-10 py-5 bg-white text-red-600 rounded-2xl font-black shadow-2xl hover:bg-slate-900 hover:text-white transition-all">طلب عرض سعر مباشر</button>
                       <button onClick={() => setActiveTab('support')} className="px-10 py-5 bg-black/20 text-white rounded-2xl font-black border border-white/30 hover:bg-white hover:text-red-600 transition-all">طلب زيارة ميدانية</button>
                    </div>
                  </div>
                  <div className="relative group">
                     <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform" />
                     <img src="https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1200" className="rounded-[3rem] relative z-10 shadow-2xl border-8 border-white/10" alt="Fire Fighting" />
                  </div>
               </div>
            </section>

            {/* Fire Systems Details */}
            <section className="max-w-7xl mx-auto px-6 py-24 space-y-24">
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="p-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                      <Flame size={32} />
                    </div>
                    <h3 className="text-2xl font-black">نظام الرش الآلي (Sprinklers)</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">نظام مكافحة مائي يعمل تلقائياً عند استشعار الحرارة، مثالي للمستودعات، المكاتب، والمراكز التجارية.</p>
                    <ul className="space-y-3 pt-4">
                      {['رؤوس رشاشات حساسة', 'مواسير استيل مجلفن', 'محابس تحكم (Alarm Valve)'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                          <CheckCircle2 size={14} className="text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                      <Settings size={32} />
                    </div>
                    <h3 className="text-2xl font-black">مضخات الحريق المركزية</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">قلب نظام الإطفاء النابض، مضخات معتمدة (UL/FM) تضمن تدفق المياه بضغط عالٍ في جميع أجزاء الشبكة.</p>
                    <ul className="space-y-3 pt-4">
                      {['مضخة ديزل للطوارئ', 'مضخة كهرباء رئيسية', 'مضخة جوكي للحفاظ على الضغط'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                          <CheckCircle2 size={14} className="text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 bg-white rounded-[3rem] shadow-xl border border-slate-100 space-y-6">
                    <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                      <ShieldCheck size={32} />
                    </div>
                    <h3 className="text-2xl font-black">أنظمة الغاز النظيف (FM200)</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">حل إطفاء متطور لغرف السيرفرات والمختبرات والمناطق التي لا يمكن استخدام المياه فيها.</p>
                    <ul className="space-y-3 pt-4">
                      {['غاز غير موصل للكهرباء', 'إطفاء خلال ثواني معدودة', 'صديق للبيئة وطبقة الأوزون'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-400">
                          <CheckCircle2 size={14} className="text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>

               <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-24 text-white overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[120px]" />
                  </div>
                  <div className="relative z-10 grid lg:grid-cols-2 items-center gap-16">
                    <div className="space-y-8">
                      <h4 className="text-4xl lg:text-5xl font-black tracking-tighter leading-tight">جاهزون لتأمين منشأتك وفق أعلى المعايير؟</h4>
                      <p className="text-slate-400 text-lg leading-relaxed">نمتلك الخبرة الكافية للتعامل مع المشاريع الصناعية والتجارية والسكنية بمختلف أحجامها. فريقنا الهندسي جاهز لتقديم الاستشارة الأنسب لمبناك.</p>
                      <div className="flex flex-wrap gap-6 text-sm font-black">
                        <div className="flex items-center gap-3"><CheckCircle2 className="text-red-500" /> توريد معتمد</div>
                        <div className="flex items-center gap-3"><CheckCircle2 className="text-red-500" /> تركيب احترافي</div>
                        <div className="flex items-center gap-3"><CheckCircle2 className="text-red-500" /> ضمان شامل</div>
                      </div>
                    </div>
                    <div className="space-y-6">
                       <button onClick={() => setActiveTab('quote')} className="w-full py-6 bg-red-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-red-500/20 hover:bg-white hover:text-red-600 transition-all">ابدأ بطلب عرض سعر الآن</button>
                       <a href={`tel:${CONTACT_PHONE}`} className="w-full py-6 bg-white/5 border border-white/10 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-4 hover:bg-white/10 transition-all">
                          <Phone />
                          تواصل مع المستشار التقني
                       </a>
                    </div>
                  </div>
               </div>
            </section>
          </motion.div>
        ) : activeTab === 'alarm_systems' ? (
          <motion.div
            key="alarm_systems"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-24"
          >
            {/* Alarm Systems Hero */}
            <section className="bg-slate-50 py-24 relative overflow-hidden border-b border-slate-100">
               <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-24 h-24 bg-orange-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/30"
                  >
                    <Bell size={48} />
                  </motion.div>
                  <div className="space-y-4 max-w-3xl mx-auto">
                    <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">الحماية تبدأ بالإنذار المبكر</h2>
                    <p className="text-slate-500 text-xl leading-relaxed font-medium">
                      أنظمة إنذار ذكية تقوم بكشف الخطر في ثوانيه الأولى، مما يمنحك الوقت الكافي للإخلاء والسيطرة ومنع الكارثة قبل وقوعها.
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 pt-4">
                     <button onClick={() => setActiveTab('quote')} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-orange-500 transition-all shadow-2xl">استعرض الأنظمة والأسعار</button>
                     <button onClick={() => setActiveTab('support')} className="px-12 py-5 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-all">تواصل مع الدعم الفني</button>
                  </div>
               </div>
            </section>

            {/* Alarm Details Grid */}
            <section className="max-w-7xl mx-auto px-6 py-24">
               <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-6">
                        <img src="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600" className="rounded-[3rem] shadow-xl" />
                        <div className="p-8 bg-white rounded-[3rem] shadow-lg border border-slate-50">
                           <h4 className="text-xl font-black mb-3 text-orange-600">لوحات التحكم</h4>
                           <p className="text-xs font-bold text-slate-400 leading-relaxed">العقل المدبر للنظام، يقوم باستلام الإشارات وتحديد موقع الحريق بدقة متناهية.</p>
                        </div>
                     </div>
                     <div className="space-y-6 pt-12">
                        <div className="p-8 bg-slate-900 text-white rounded-[3rem] shadow-lg">
                           <h4 className="text-xl font-black mb-3 text-orange-400">كواشف ذكية</h4>
                           <p className="text-xs font-bold text-slate-400 leading-relaxed">كواشف دخان ضوئية، حرارية، وغازية تعمل بنظام المعالجة الرقمية.</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1585131238915-9969703ef507?q=80&w=600" className="rounded-[3rem] shadow-xl" />
                     </div>
                  </div>
                  <div className="space-y-12">
                     <div className="space-y-6">
                        <h3 className="text-4xl font-black tracking-tighter">لماذا أنظمة الإنذار لدينا هي الخيار الأفضل؟</h3>
                        <p className="text-slate-500 text-lg leading-relaxed">تجمع أنظمتنا بين الموثوقية العالية والتقنيات الحديثة مثل الربط السحابي والتحكم عبر التطبيقات الذكية.</p>
                     </div>
                     <div className="space-y-6">
                        {[
                          { title: "دقة 100%", desc: "كشف مبكر جداً مع تقليل شبه منعدم للإنذارات الكاذبة." },
                          { title: "ربط متكامل", desc: "إمكانية الربط مع أنظمة الإطفاء، التكييف، والأبواب الآلية." },
                          { title: "سهولة البرمجة", desc: "واجهات استخدام بالعربي ومراقبة دائمة لحالة النظام." }
                        ].map((f, i) => (
                           <div key={i} className="flex gap-6 p-6 bg-white rounded-3xl border border-slate-100 hover:border-orange-500/20 transition-all">
                              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                                 <ShieldCheck size={24} />
                              </div>
                              <div>
                                 <h5 className="font-black text-slate-900 mb-1">{f.title}</h5>
                                 <p className="text-xs font-bold text-slate-400">{f.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                     <button onClick={() => setActiveTab('quote')} className="w-full py-6 bg-orange-500 text-white rounded-3xl font-black text-xl shadow-2xl shadow-orange-500/20 hover:bg-slate-900 transition-all">اطلب نظامك الآن</button>
                  </div>
               </div>
            </section>
          </motion.div>
        ) : activeTab === 'consultancy' ? (
          <motion.div
            key="consultancy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="pb-24"
          >
            {/* Consultancy Hero */}
            <section className="bg-white py-24">
               <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <span className="text-red-600 font-black text-xs uppercase tracking-[0.3em]">الاستشارات الهندسية وفحص السلامة</span>
                        <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight">تصميم واعتماد <br/><span className="text-red-600">خطط السلامة</span></h2>
                        <p className="text-slate-500 text-xl leading-relaxed">نقوم بدراسة المنشآت هندسياً وتحديد كافة مخاطر الحريق ووضع أنظمة الحماية المناسبة وفق تطلعات الدفاع المدني السعودي.</p>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 rounded-3xl">
                           <div className="text-3xl font-black text-red-600 mb-2">10+</div>
                           <div className="text-xs font-bold text-slate-500 uppercase">سنوات خبرة</div>
                        </div>
                        <div className="p-6 bg-slate-50 rounded-3xl">
                           <div className="text-3xl font-black text-red-600 mb-2">100%</div>
                           <div className="text-xs font-bold text-slate-500 uppercase">نسبة الاعتماد</div>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button onClick={() => setActiveTab('support')} className="px-10 py-5 bg-red-600 text-white rounded-2xl font-black shadow-2xl shadow-red-500/20 hover:bg-black transition-all">حجز موعد معاينة</button>
                        <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-red-600 transition-all">رفع المخططات للمراجعة</button>
                     </div>
                  </div>
                  <div className="relative">
                     <div className="absolute inset-0 bg-red-500 blur-[100px] opacity-10 rounded-full" />
                     <img src="https://images.unsplash.com/photo-1503387762-592dee58c14b?q=80&w=1200" className="rounded-[4rem] relative z-10 shadow-3xl border border-slate-100" alt="Consultancy" />
                  </div>
               </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-6 py-24">
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    { title: "تقييم المخاطر", icon: ShieldCheck, desc: "دراسة ميدانية شاملة للمنشأة لتحديد نقاط الضعف والمخاطر المحتملة." },
                    { title: "إعداد المخططات", icon: Tool, desc: "رسم خرائط أنظمة السلامة والهروب والمسارات وفق المعايير الهندسية." },
                    { title: "تقارير السلامة", icon: Briefcase, desc: "إصدار تقارير فنية معتمدة من مهندسين مرخصين لتقديمها للجهات المعنية." },
                    { title: "اعتماد المشاريع", icon: CheckCircle2, desc: "متابعة كافة الإجراءات مع الدفاع المدني حتى اتمام عملية الاعتماد." }
                  ].map((item, i) => (
                     <div 
                        key={i} 
                        onClick={() => {
                          if (item.title === "اعتماد المشاريع") setActiveTab('approvals');
                          if (item.title === "تقييم المخاطر") setActiveTab('risk_assessment');
                          if (item.title === "تقارير السلامة") setActiveTab('safety_reports');
                        }}
                        className={cn("p-10 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all group", (item.title === "اعتماد المشاريع" || item.title === "تقييم المخاطر" || item.title === "تقارير السلامة") && "cursor-pointer")}
                     >
                        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                           <item.icon size={28} />
                        </div>
                        <h4 className="text-xl font-black mb-4">{item.title}</h4>
                        <p className="text-xs text-slate-400 font-bold leading-relaxed">{item.desc}</p>
                     </div>
                  ))}
               </div>
            </section>

            {/* Consultation CTA */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
               <div className="bg-slate-950 rounded-[4rem] p-12 lg:p-24 text-white relative overflow-hidden">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[150px] pointer-events-none" />
                  <div className="text-center space-y-12 relative z-10">
                     <div className="space-y-4">
                        <h3 className="text-4xl lg:text-6xl font-black tracking-tighter">هل لديك مخططات سلامة بانتظار الاعتماد؟</h3>
                        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">فريقنا الهندسي مستعد لمراجعة مخططاتك وتقديم التعديلات اللازمة لضمان قبولها من المرة الأولى واختصار وقتك وجهدك.</p>
                     </div>
                     <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button className="px-12 py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-red-500/20 hover:scale-105 transition-all">اطلب استشارة مجانية الآن</button>
                        <div className="flex items-center gap-4 text-right">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                              <Phone size={24} />
                           </div>
                           <div>
                              <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">تواصل مباشر مع المهندس</div>
                              <div className="text-xl font-black">{CONTACT_PHONE}</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
          </motion.div>
        ) : activeTab === 'approvals' ? (
          <motion.div
            key="approvals"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-24"
          >
             {/* Hero */}
             <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1503387762-592dee58c14b?q=80&w=1200')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent" />
                
                <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                   <div className="space-y-8 text-right">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-600/20 text-red-500 rounded-full text-xs font-black uppercase tracking-widest border border-red-600/30">
                         خدمة اعتماد المشاريع (HCIS)
                      </div>
                      <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight">اعتماد أنظمة السلامة <br/> وفق أعلى المعايير</h2>
                      <p className="text-slate-400 text-xl leading-relaxed max-w-xl">نحن نسهل عليك رحلة اعتماد مشروعك، من مراجعة المخططات الهندسية وحتى الاستلام النهائي من الدفاع المدني والجهات المختصة.</p>
                      
                      <div className="flex justify-end gap-6 pt-4">
                         <div className="flex items-center gap-4 group flex-row-reverse text-right">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                               <Zap className="text-red-500 group-hover:text-white" />
                            </div>
                            <span className="font-bold">سرعة في الإنجاز</span>
                         </div>
                         <div className="flex items-center gap-4 group flex-row-reverse text-right">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                               <ShieldCheck className="text-red-500 group-hover:text-white" />
                            </div>
                            <span className="font-bold">موافقة الدفاع المدني</span>
                         </div>
                      </div>
                   </div>
                </div>
             </section>

             {/* Steps / Sections */}
             <section className="max-w-7xl mx-auto px-6 py-24 space-y-24">
                <div className="text-center space-y-4 max-w-3xl mx-auto">
                   <h3 className="text-4xl font-black tracking-tighter">رحلة اعتماد المشروع</h3>
                   <p className="text-slate-500 font-medium">خطوات مدروسة لضمان توافق منشأتك مع كافة اشتراطات السلامة العالمية والمحلية.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                   {[
                     { 
                       title: "مراجعة المخططات الهندسية", 
                       desc: "نقوم بمراجعة دقيقة لخرائط الإطفاء والإنذار (AutoCAD) والتأكد من مطابقتها لكود البناء السعودي.",
                       img: "https://images.unsplash.com/photo-1541888941259-7128527a2267?q=80&w=800"
                     },
                     { 
                       title: "اعتماد أنظمة السلامة", 
                       desc: "اعتماد أنظمة الإنذار، الرش الآلي، مخارج الطوارئ، والمضخات من الجهات المختصة.",
                       img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800"
                     },
                     { 
                       title: "تجهيز ملفات الاعتماد", 
                       desc: "إعداد كافة المستندات والتقارير الفنية اللازمة لرفعها عبر منصة سلامة والحصول على الترخيص.",
                       img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800"
                     }
                   ].map((step, i) => (
                      <div key={i} className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all">
                         <div className="aspect-video relative overflow-hidden">
                            <img src={step.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={step.title} />
                            <div className="absolute inset-0 bg-slate-900/40" />
                            <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-slate-900">0{i+1}</div>
                         </div>
                         <div className="p-10 text-right space-y-4">
                            <h4 className="text-2xl font-black">{step.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>

                {/* Requirements Checklist */}
                <div className="bg-slate-50 rounded-[4rem] p-12 lg:p-20 grid lg:grid-cols-2 gap-16 items-center">
                   <div className="space-y-8 text-right order-2 lg:order-1">
                      <h3 className="text-4xl font-black tracking-tighter">المستندات والمتطلبات اللازمة</h3>
                      <p className="text-slate-500 text-lg leading-relaxed font-medium">يرجى التأكد من توفر المتطلبات التالية لتسريع عملية المراجعة والاعتماد الفني لمشروعك.</p>
                      
                      <div className="space-y-4">
                         {[
                           "مخطط المشروع بصيغة CAD أو PDF",
                           "نسخة من رخصة البناء سارية المفعول",
                           "بيانات المالك (أفراد أو مؤسسات)",
                           "تقارير فنية سابقة للسلامة (إن وجدت)",
                           "موقع المشروع الجغرافي (Coordinates)"
                         ].map((req, i) => (
                            <div key={i} className="flex items-center justify-end gap-4 p-4 bg-white rounded-2xl shadow-sm">
                               <span className="font-bold text-slate-700">{req}</span>
                               <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                                  <CheckCircle2 size={18} />
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="relative order-1 lg:order-2">
                      <div className="absolute inset-0 bg-red-600 blur-[100px] opacity-10" />
                      <div className="bg-white rounded-[3rem] p-10 shadow-2xl relative z-10 space-y-8 border border-slate-100">
                         <div className="text-center space-y-2">
                            <h4 className="text-2xl font-black">حجز موعد معاينة ميدانية</h4>
                            <p className="text-slate-400 text-xs font-bold">يمكنك طلب زيارة للموقع قبل رفع الطلب الرسمي</p>
                         </div>
                         <button onClick={() => setActiveTab('support')} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-red-600 transition-all shadow-xl">طلب موعد معاينة الآن</button>
                         <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-xs font-bold text-slate-500 justify-center">
                            <Info size={16} className="text-red-500" />
                            تتم المعاينة خلال 24 - 48 ساعة من تاريخ الطلب.
                         </div>
                      </div>
                   </div>
                </div>

                {/* Submission Form */}
                <div id="approval-form" className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden scroll-mt-24">
                   <div className="grid lg:grid-cols-2">
                      <div className="p-12 lg:p-20 space-y-12 order-2 lg:order-1">
                         <div className="space-y-4 text-right">
                            <h3 className="text-4xl font-black tracking-tighter">نموذج طلب اعتماد مشروع</h3>
                            <p className="text-slate-400 font-bold">يرجى تعبئة البيانات بدقة ليتمكن مهندسونا من مراجعة طلبك.</p>
                         </div>

                         {submittedApproval ? (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="p-10 bg-green-50 rounded-[3rem] text-center space-y-6"
                           >
                              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/30">
                                 <CheckCircle2 size={40} />
                              </div>
                              <div className="space-y-2">
                                 <h4 className="text-2xl font-black text-green-900">تم استلام طلبك بنجاح</h4>
                                 <p className="text-green-700 font-bold">رقم الطلب: <span className="text-slate-900">#AP-2045</span></p>
                              </div>
                              <div className="p-6 bg-white/50 rounded-2xl text-right space-y-2">
                                 <div className="flex justify-between text-xs font-black">
                                    <span className="text-orange-600 uppercase">تحت المراجعة الفنية</span>
                                    <span className="text-slate-400">حالة الطلب</span>
                                 </div>
                                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold">سيتم التواصل معكم عبر الهاتف أو البريد الإلكتروني بعد مراجعة المخططات والبيانات المرفقة.</p>
                              </div>
                              <button onClick={() => setSubmittedApproval(null)} className="text-green-600 font-black text-xs uppercase tracking-widest border-b-2 border-green-200 pb-1">إرسال طلب آخر</button>
                           </motion.div>
                         ) : (
                           <form className="space-y-8 text-right" onSubmit={(e) => { e.preventDefault(); setSubmittedApproval(true); }}>
                              <div className="grid md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">اسم المشروع</label>
                                    <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right" placeholder="مثل: برج السلام التجاري" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">اسم المالك / الشركة</label>
                                    <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right" placeholder="شركة الابتكار العقارية" />
                                 </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1 text-right block w-full">رقم الجوال</label>
                                    <input required type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-left" placeholder="+966 5X XXX XXXX" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">نوع المشروع</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all">
                                       <option>مبنى إداري</option>
                                       <option>مستودع لوجستي</option>
                                       <option>مركز تجاري / مول</option>
                                       <option>مرفق صناعي</option>
                                       <option>مجمع سكني</option>
                                    </select>
                                 </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">مساحة المشروع (م٢)</label>
                                    <input required type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right" placeholder="مثلاً: 2500" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">المدينة / الموقع</label>
                                    <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right" placeholder="أبها - طريق الملك فهد" />
                                 </div>
                              </div>
                              <div className="space-y-4">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">رفع الملفات والمخططات (PDF/CAD)</label>
                                 <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center space-y-4 hover:border-red-600 transition-colors cursor-pointer group">
                                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-red-50 group-hover:text-red-600 transition-all">
                                       <Upload size={32} />
                                    </div>
                                    <div className="space-y-1">
                                       <p className="text-sm font-black">اسحب الملفات هنا أو اضغط للاختيار</p>
                                       <p className="text-[10px] text-slate-400 font-bold">الحد الأقصى للملف: 50 ميجابايت</p>
                                    </div>
                                 </div>
                              </div>
                              <button type="submit" className="w-full py-6 bg-red-600 text-white rounded-3xl font-black text-xl shadow-2xl shadow-red-500/20 hover:scale-105 transition-all">إرسال طلب الاعتماد</button>
                           </form>
                         )}
                      </div>
                      <div className="hidden lg:block bg-slate-900 p-20 text-white relative order-1 lg:order-2">
                         <div className="absolute inset-0 bg-red-600/5 bg-[radial-gradient(circle_at_50%_50%,rgba(185,28,28,0.2),transparent_70%)]" />
                         <div className="relative z-10 space-y-12 text-right">
                            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-600/30 mr-auto lg:mr-0">
                               <CheckCircle2 size={32} />
                            </div>
                            <div className="space-y-6">
                               <h4 className="text-4xl font-black tracking-tighter">لماذا تختار أوركيت لاعتماد مشروعك؟</h4>
                               <p className="text-slate-400 leading-relaxed font-medium">نحن لسنا مجرد شركة توريد، بل شركاؤك في النجاح والامتثال لكافة اشتراطات السلامة.</p>
                            </div>
                            <div className="space-y-8">
                               {[
                                 { title: "اعتماد HCIS", desc: "خبرة واسعة في متطلبات الهيئة العليا للأمن الصناعي." },
                                 { title: "استشارات مهنية", desc: "نصلح الأخطاء في مخططاتك قبل تقديمها للاعتماد." },
                                 { title: "أرشفة رقمية", desc: "جميع مخططات مشروعك متاحة لك في لوحة تحكمك دائماً." }
                               ].map((f, i) => (
                                  <div key={i} className="flex flex-row-reverse gap-6">
                                     <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-600 flex items-center justify-center shrink-0 border border-red-600/30 mt-1">
                                        <CheckCircle2 size={16} />
                                     </div>
                                     <div className="space-y-1">
                                        <h5 className="font-black">{f.title}</h5>
                                        <p className="text-xs text-slate-500 font-bold">{f.desc}</p>
                                     </div>
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </section>
          </motion.div>
        ) : activeTab === 'safety_reports' ? (
          <motion.div
            key="safety_reports"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-24"
          >
             {/* Hero */}
             <section className="bg-white py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -skew-x-12 translate-x-32" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                   <div className="space-y-8 text-right order-2 lg:order-1">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                         <FileText size={12} />
                         خدمات تقارير السلامة المعتمدة
                      </div>
                      <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900">تقارير سلامة <br/> <span className="text-red-600">موثقة ومعتمدة</span></h2>
                      <p className="text-slate-500 text-xl leading-relaxed max-w-xl font-medium">نحن متخصصون في إعداد وتدقيق تقارير السلامة الفنية بما يتوافق مع أنظمة الدفاع المدني، لضمان أعلى مستويات الحماية والموثوقية لمنشأتك.</p>
                      
                      <div className="flex flex-wrap justify-end gap-4 pt-4">
                         {["حماية المنشآت", "الالتزام بالأنظمة", "توثيق الأنظمة", "اعتماد الدفاع المدني"].map((tag, i) => (
                            <div key={i} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-sm font-black text-slate-700">{tag}</div>
                         ))}
                      </div>
                   </div>
                   <div className="order-1 lg:order-2 flex justify-center">
                      <div className="w-full max-w-md aspect-[3/4] bg-slate-900 rounded-[4rem] relative overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                         <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800" className="w-full h-full object-cover opacity-60" alt="Safety Report" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                         <div className="absolute bottom-12 right-12 left-12 space-y-4">
                            <div className="w-16 h-1 bg-red-600" />
                            <h4 className="text-2xl font-black text-white text-right leading-tight">دقة متناهية في الفحص الورقي والميداني</h4>
                         </div>
                      </div>
                   </div>
                </div>
             </section>

             {/* Functional Sections */}
             <section className="max-w-7xl mx-auto px-6 py-24 space-y-32">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {[
                     { 
                       title: "تقارير أنظمة الإطفاء", 
                       items: ["فحص أنظمة الإنذار", "اختبار أجهزة الإطفاء", "تقييم كفاءة الأنظمة", "توثيق الملاحظات"],
                       icon: Bell,
                       color: "border-red-100 group-hover:bg-red-600"
                     },
                     { 
                       title: "تقارير الزيارات الميدانية", 
                       items: ["معاينة الموقع", "مراجعة أنظمة السلامة", "تصوير المخالفات", "إعداد تقرير كامل"],
                       icon: MapPin,
                       color: "border-orange-100 group-hover:bg-orange-600"
                     },
                     { 
                       title: "تقارير الدفاع المدني", 
                       items: ["مطابقة الاشتراطات", "اعتماد المشاريع", "تجديد التراخيص", "ملفات السلامة الرسمية"],
                       icon: ShieldCheck,
                       color: "border-blue-100 group-hover:bg-blue-600"
                     },
                     { 
                       title: "التقارير الفنية الدورية", 
                       items: ["تقارير الصيانة", "حالة المعدات", "جاهزية الأنظمة", "التوصيات والتحسينات"],
                       icon: Clock,
                       color: "border-green-100 group-hover:bg-green-600"
                     }
                   ].map((sec, i) => {
                      const Icon = sec.icon;
                      return (
                        <div key={i} className="group p-10 bg-white rounded-[3rem] border-2 border-slate-50 hover:border-slate-900 transition-all space-y-8">
                           <div className={cn("w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center transition-colors shadow-inner", sec.color && "group-hover:text-white")}>
                              <Icon size={28} />
                           </div>
                           <div className="space-y-6 text-right">
                              <h4 className="text-xl font-black text-slate-900">{sec.title}</h4>
                              <div className="space-y-3">
                                 {sec.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-end gap-3 text-xs font-bold text-slate-500">
                                       {item}
                                       <div className="w-1 h-1 rounded-full bg-slate-300" />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                      );
                   })}
                </div>

                {/* Features / Benefits */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                   <div className="relative">
                      <div className="absolute inset-0 bg-red-600 blur-[120px] opacity-10" />
                      <div className="grid grid-cols-2 gap-6 relative z-10">
                         {[
                           { title: "تحميل PDF", desc: "إمكانية تحميل التقارير مباشرة", icon: Download },
                           { title: "توقيع إلكتروني", desc: "تقارير مختومة وموقعة رقمياً", icon: CheckCircle2 },
                           { title: "أرشفة سحابية", desc: "الوصول لتقاريرك في أي وقت", icon: LayoutDashboard },
                           { title: "إشعارات فورية", desc: "تنبيهات عند صدور التقرير", icon: Zap }
                         ].map((feat, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-4 text-right">
                               <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-red-600">
                                  <feat.icon size={24} />
                               </div>
                               <h5 className="font-black text-slate-900">{feat.title}</h5>
                               <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{feat.desc}</p>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-8 text-right">
                      <h3 className="text-4xl lg:text-5xl font-black tracking-tighter">إدارة ذكية <br/> لتقارير السلامة</h3>
                      <p className="text-slate-500 text-lg leading-relaxed font-medium">نحن نوفر لك لوحة تحكم متكاملة تتيح لك متابعة حالة تقاريرك، وتحميلها بصيغة PDF، وربطها بمشاريعك وصيانتك الدورية بشكل آلي تماماً.</p>
                      <ul className="space-y-4">
                         {["ربط التقارير بالمشاريع والصيانة", "إمكانية مشاركة التقارير مع الدفاع المدني", "تتبع حي لحالة الطلب"].map((item, i) => (
                            <li key={i} className="flex items-center justify-end gap-3 font-bold text-slate-700">
                               {item}
                               <CheckCircle2 size={18} className="text-green-500" />
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>

                {/* Submission Form */}
                <div id="safety-report-form" className="bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 blur-[150px] opacity-20" />
                   <div className="grid lg:grid-cols-2 relative z-10">
                      <div className="p-12 lg:p-20 space-y-12 order-2 lg:order-1 text-white">
                         <div className="space-y-4 text-right">
                            <h3 className="text-4xl font-black tracking-tighter font-sans uppercase">طب طلب تقرير سلامة</h3>
                            <p className="text-slate-400 font-bold">يرجى تزويدنا بالبيانات الأساسية للبدء في مراجعة وإصدار التقرير الفني.</p>
                         </div>

                         {submittedSafetyReport ? (
                           <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center space-y-8"
                           >
                              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/40">
                                 <FileCheck2 size={48} />
                              </div>
                              <div className="space-y-3">
                                 <h4 className="text-3xl font-black">تم استلام طلبك بنجاح</h4>
                                 <p className="text-slate-400 font-bold">رقم الطلب: <span className="text-red-500 font-sans">#SR-4126</span></p>
                              </div>
                              <div className="p-8 bg-white/5 rounded-3xl text-right space-y-4">
                                 <div className="flex justify-between items-center text-xs font-black">
                                    <span className="px-3 py-1 bg-orange-600/20 text-orange-500 rounded-full">تحت المراجعة الفنية</span>
                                    <span className="text-slate-400">حالة الطلب</span>
                                 </div>
                                 <p className="text-xs text-slate-300 leading-relaxed font-bold">شكرًا لثقتكم. سيتم التواصل معكم عبر الهاتف أو البريد الإلكتروني فور مراجعة البيانات الأولية وتحديد موعد المعاينة الميدانية.</p>
                              </div>
                              <button onClick={() => setSubmittedSafetyReport(null)} className="text-sm font-black text-white/60 hover:text-white transition-colors border-b border-white/20 pb-1">إرسال طلب جديد</button>
                           </motion.div>
                         ) : (
                           <form className="space-y-8 text-right" onSubmit={(e) => { e.preventDefault(); setSubmittedSafetyReport(true); }}>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1">اسم المنشأة أو المشروع</label>
                                 <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right text-white" placeholder="اسم المبنى أو المؤسسة" />
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                 <div className="space-y-2 text-right">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1 block">نوع التقرير المطلوب</label>
                                    <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-white appearance-none">
                                       <option className="bg-slate-900">تقرير صيانة سنوي</option>
                                       <option className="bg-slate-900">تقرير اعتماد دفاع مدني</option>
                                       <option className="bg-slate-900">تقرير فحص أنظمة إنذار</option>
                                       <option className="bg-slate-900">تقرير زيارة ميدانية طارئة</option>
                                    </select>
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1 text-right block w-full">رقم الجوال</label>
                                    <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-left text-white" placeholder="+966 5X XXX XXXX" />
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1">المدينة والموقع</label>
                                 <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right text-white" placeholder="مثل: الرياض - حي الملقا" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1">وصف الطلب / ملاحظات إضافية</label>
                                 <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right text-white resize-none" placeholder="اكتب أي تفاصيل أخرى ترغب في ذكرها..." />
                              </div>
                              <div className="space-y-4">
                                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mr-1 text-right block">رفع ملفات أو صور (PDF, JPG)</label>
                                 <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 text-center space-y-4 hover:border-red-600/50 transition-colors cursor-pointer group bg-white/0 hover:bg-white/[0.02]">
                                    <Upload size={32} className="mx-auto text-slate-600 group-hover:text-red-500 transition-colors" />
                                    <div className="space-y-1">
                                       <p className="text-sm font-black text-slate-300">اسحب الملفات هنا أو اضغط للاختيار</p>
                                       <p className="text-[10px] text-slate-500 font-bold">يمكن رفع المخططات الحالية أو صور الملاحظات</p>
                                    </div>
                                 </div>
                              </div>
                              <button type="submit" className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-red-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all">طلب تقرير سلامة</button>
                           </form>
                         )}
                      </div>
                      <div className="hidden lg:flex flex-col justify-center p-20 order-1 lg:order-2 space-y-12 border-l border-white/10">
                         <div className="space-y-2 text-right">
                           <h4 className="text-3xl font-black text-white">لماذا تقارير أوركيت؟</h4>
                           <p className="text-slate-500 font-medium leading-relaxed">نحن نجمع بين الخبرة الهندسية الميدانية والأنظمة الرقمية المتطورة.</p>
                         </div>
                         <div className="space-y-10">
                            {[
                               { title: "دقة هندسية", desc: "مهندسون مرخصون ومعتمدون من الهيئة السعودية للمهندسين." },
                               { title: "اعتماد رسمي", desc: "تقاريرنا معترف بها لدى الدفاع المدني والجهات الحكومية." },
                               { title: "سرعة في الإنجاز", desc: "إصدار التقارير الأولية خلال 24 ساعة من المعاينة." }
                            ].map((item, i) => (
                               <div key={i} className="flex flex-row-reverse gap-6">
                                  <div className="w-10 h-10 bg-red-600/10 rounded-xl flex items-center justify-center shrink-0 text-red-500">
                                     <Check size={20} />
                                  </div>
                                  <div className="space-y-2 text-right">
                                     <h5 className="font-black text-white">{item.title}</h5>
                                     <p className="text-xs text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </section>
          </motion.div>
        ) : activeTab === 'risk_assessment' ? (
          <motion.div
            key="risk_assessment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pb-24"
          >
             {/* Hero */}
             <section className="bg-slate-50 py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                   <div className="space-y-8 text-right">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-full text-xs font-black tracking-widest border border-red-200">
                         <AlertTriangle size={14} />
                         خدمات تقييم وتحليل المخاطر
                      </div>
                      <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight text-slate-900">حماية الأرواح <br/> <span className="text-red-600">هدفنا الأول</span></h2>
                      <p className="text-slate-500 text-xl leading-relaxed max-w-xl font-medium">نحلل كل زاوية في منشأتك لنكتشف المخاطر قبل وقوعها. تقييمنا يضمن لك بيئة عمل آمنة وموافقة تامة لاشتراطات الدفاع المدني.</p>
                      
                      <div className="grid md:grid-cols-2 gap-6 pt-4">
                         {[
                           { title: "أهمية التقييم", desc: "تحديد مصادر الخطر المحتملة بدقة" },
                           { title: "حماية الممتلكات", desc: "تقليل احتمالية الحرائق بنسبة 90%" },
                           { title: "أمان الأرواح", desc: "ضمان سلامة الموظفين والزوار" },
                           { title: "الالتزام التام", desc: "موافقة 100% لمعايير السلامة" }
                         ].map((item, i) => (
                            <div key={i} className="flex flex-row-reverse gap-4 items-start">
                               <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 text-red-600">
                                  <CheckCircle2 size={16} />
                               </div>
                               <div className="space-y-1">
                                  <h5 className="font-black text-slate-900 leading-none">{item.title}</h5>
                                  <p className="text-xs text-slate-400 font-bold">{item.desc}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                   <div className="relative">
                      <div className="aspect-square bg-slate-200 rounded-[4rem] overflow-hidden shadow-2xl relative">
                         <img src="https://images.unsplash.com/photo-1590483734724-386175e2f331?q=80&w=800" className="w-full h-full object-cover" alt="Risk Assessment" />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                         <div className="absolute bottom-10 right-10 left-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white text-right">
                            <h4 className="text-xl font-black">تحليل شامل ومفصل</h4>
                            <p className="text-xs font-medium text-white/80">فريقنا الهندسي يستخدم أحدث التقنيات لرصد المخاطر وتحديد الحلول الجذرية.</p>
                         </div>
                      </div>
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/10 rounded-full blur-[80px]" />
                   </div>
                </div>
             </section>

             {/* Services Grid */}
             <section className="max-w-7xl mx-auto px-6 py-24 space-y-24">
                <div className="grid lg:grid-cols-3 gap-10">
                   {[
                     { 
                       title: "تقييم مخاطر الحريق", 
                       icons: [Flame, Settings, Bell],
                       items: ["فحص أنظمة الإطفاء والإنذار", "مراجعة التمديدات الكهربائية", "فحص مخارج الطوارئ", "تأمين مناطق التخزين"],
                       color: "bg-red-50 text-red-600"
                     },
                     { 
                       title: "تقييم المخاطر الصناعية", 
                       icons: [Activity, Tool, Zap],
                       items: ["تحليل المعدات الصناعية", "إدارة المواد القابلة للاشتعال", "فحص أنظمة التشغيل", "رصد احتمالية التسرب"],
                       color: "bg-orange-50 text-orange-600"
                     },
                     { 
                       title: "تقييم السلامة العامة", 
                       icons: [ShieldCheck, Clock, FileText],
                       items: ["تحديث خطط الإخلاء", "مراجعة أنظمة الطوارئ", "تطبيق إجراءات الوقاية", "تدريب العاملين"],
                       color: "bg-blue-50 text-blue-600"
                     }
                   ].map((cat, i) => {
                      const Icon = cat.icons[0];
                      return (
                        <div key={i} className="bg-white rounded-[3rem] border border-slate-100 p-12 hover:shadow-2xl transition-all space-y-8">
                           <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", cat.color)}>
                              <Icon size={32} />
                           </div>
                           <div className="space-y-4 text-right">
                              <h4 className="text-2xl font-black">{cat.title}</h4>
                              <div className="space-y-3">
                                 {cat.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-end gap-3 text-sm font-bold text-slate-500">
                                       {item}
                                       <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                      );
                   })}
                </div>

                {/* Reporting Section */}
                <div className="bg-slate-900 rounded-[4rem] p-12 lg:p-20 text-white grid lg:grid-cols-2 gap-16 items-center">
                   <div className="relative">
                      <div className="bg-white/5 rounded-[3rem] p-10 backdrop-blur-sm border border-white/10 space-y-8">
                         <div className="flex justify-between items-center text-right">
                            <div>
                               <h5 className="text-xl font-black">تقرير فني رقم #320</h5>
                               <p className="text-xs text-slate-400 font-bold">تاريخ التقرير: 15 مايو 2026</p>
                            </div>
                            <FileCheck2 className="text-red-500" size={32} />
                         </div>
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <div className="flex justify-between items-center text-xs font-black">
                                  <span className="text-red-500">75%</span>
                                  <span>مستوى الخطورة العام</span>
                               </div>
                               <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-red-600 w-3/4" />
                               </div>
                            </div>
                            <div className="space-y-3">
                               {[
                                 "تحليل شامل لجميع مسببات الحرائق",
                                 "تحديد التوصيات الفنية العاجلة",
                                 "مقترحات تحسين أنظمة السلامة",
                                 "خطة العمل المقترحة للتصحيح"
                               ].map((line, idx) => (
                                  <div key={idx} className="flex items-center justify-end gap-3 text-xs font-bold text-slate-300">
                                     {line}
                                     <CheckCircle2 size={14} className="text-green-500" />
                                  </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="space-y-8 text-right">
                      <h3 className="text-4xl font-black tracking-tighter">إعداد التقارير الفنية المتكاملة</h3>
                      <p className="text-slate-400 text-lg leading-relaxed font-medium">نحول نتائج التقييم إلى تقارير احترافية سهلة القراءة توضح الخطوات اللازمة لرفع كفاءة السلامة في منشأتك.</p>
                      <ul className="grid grid-cols-2 gap-4">
                         {["تحليل مصفوفة المخاطر", "توصيات هندسية", "خطة إخلاء مطورة", "أرشفة رقمية للتقارير"].map((text, i) => (
                            <li key={i} className="flex items-center justify-end gap-2 text-xs font-black">
                               {text}
                               <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>

                {/* Risk Assessment Form */}
                <div id="risk-form" className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl overflow-hidden scroll-mt-24">
                   <div className="grid lg:grid-cols-2">
                      <div className="p-12 lg:p-20 space-y-12">
                         <div className="space-y-4 text-right">
                            <h3 className="text-4xl font-black tracking-tighter text-slate-900 font-sans">طلب تقييم مخاطر</h3>
                            <p className="text-slate-400 font-bold">املأ البيانات بالأسفل وباشر رحلة حماية منشأتك الآن.</p>
                         </div>

                         {submittedRiskAssessment ? (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             className="p-10 bg-slate-50 rounded-[3rem] text-center space-y-6 border border-slate-100"
                           >
                              <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                                 <FileCheck2 size={40} />
                              </div>
                              <div className="space-y-2">
                                 <h4 className="text-2xl font-black text-slate-900">تم استلام طلبك بنجاح</h4>
                                 <p className="text-slate-500 font-bold">رقم الطلب: <span className="text-red-600 font-sans">#RS-3087</span></p>
                              </div>
                              <div className="p-6 bg-white rounded-2xl text-right space-y-2 border border-slate-100">
                                 <div className="flex justify-between text-xs font-black">
                                    <span className="text-orange-600 uppercase">قيد الدراسة الفنية</span>
                                    <span className="text-slate-400">حالة الطلب</span>
                                 </div>
                                 <p className="text-[11px] text-slate-500 leading-relaxed font-bold">سيتم التواصل معكم خلال وقت قصير لتحديد موعد المعاينة الميدانية للموقع.</p>
                              </div>
                              <button onClick={() => setSubmittedRiskAssessment(null)} className="text-red-600 font-black text-xs uppercase tracking-widest border-b-2 border-red-200 pb-1">إرسال طلب تقييم آخر</button>
                           </motion.div>
                         ) : (
                           <form className="space-y-8 text-right" onSubmit={(e) => { e.preventDefault(); setSubmittedRiskAssessment(true); }}>
                              <div className="grid md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">اسم المنشأة / المشروع</label>
                                    <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right" placeholder="مثل: مصنع الرياض للصناعات الغذائية" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">نوع النشاط</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all">
                                       <option>صناعي</option>
                                       <option>تجاري</option>
                                       <option>طبي</option>
                                       <option>تخزين / مستودعات</option>
                                       <option>سكني / مجمعات</option>
                                    </select>
                                 </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1 text-right block w-full">رقم التواصل</label>
                                    <input required type="tel" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-left" placeholder="+966 5X XXX XXXX" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">مساحة الموقع (م٢)</label>
                                    <input required type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right" placeholder="مثلاً: 5000" />
                                 </div>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">المدينة والموقع</label>
                                 <input required type="text" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right" placeholder="جدة - المنطقة الصناعية الثالثة" />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1">وصف مختصر للمشكلة أو التقييم المطلوب</label>
                                 <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-xs font-bold focus:outline-none focus:border-red-600 transition-all text-right resize-none" placeholder="اشرح لنا طبيعة المنشأة وما الذي يدفعك لطلب التقييم حالياً..." />
                              </div>
                              <div className="space-y-4">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-1 text-right block">رفع صور أو مخططات للموقع (اختياري)</label>
                                 <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center space-y-4 hover:border-red-600 transition-colors cursor-pointer group">
                                    <Upload size={24} className="mx-auto text-slate-300 group-hover:text-red-500 transition-colors" />
                                    <div className="space-y-1">
                                       <p className="text-xs font-black">اسحب الصور الموضحة للمخاطر هنا</p>
                                       <p className="text-[9px] text-slate-400 font-bold">يمكن رفع أكثر من ملف بحد أقصى 20 ميجابايت للكل</p>
                                    </div>
                                 </div>
                              </div>
                              <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xl shadow-2xl hover:bg-red-600 transition-all">طلب تقييم المخاطر</button>
                           </form>
                         )}
                      </div>
                      <div className="relative hidden lg:block overflow-hidden rounded-r-[4rem]">
                         <img src="https://images.unsplash.com/photo-1541888941259-7128527a2267?q=80&w=800" className="w-full h-full object-cover" alt="Form Sidebar" />
                         <div className="absolute inset-0 bg-red-600/80 p-20 flex flex-col justify-end text-white text-right">
                            <h4 className="text-4xl font-black tracking-tighter mb-6">مستقبل منشأتك <br/> يبدأ ببيئة آمنة.</h4>
                            <p className="text-white/80 font-medium leading-relaxed mb-10">نستخدم أدوات تحليل المخاطر العالمية لتزويدك برؤية لم تكن تراها من قبل. الأمان ليس خياراً، بل هو أساس الاستمرار.</p>
                            <div className="flex justify-end gap-6">
                               <div className="text-right">
                                  <div className="text-2xl font-black">100%</div>
                                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">معدل الدقة</div>
                               </div>
                               <div className="text-right">
                                  <div className="text-2xl font-black">24h</div>
                                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">استجابة سريعة</div>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
             </section>
          </motion.div>
        ) : activeTab === 'support' ? (
          <motion.div
            key="support"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-4xl mx-auto px-6 py-24"
          >
             <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 p-12 text-white relative">
                   <div className="absolute top-0 right-0 p-12 text-red-600/20">
                      <Headset size={160} />
                   </div>
                   <div className="relative z-10 space-y-4">
                      <h2 className="text-4xl font-black tracking-tighter">مركز الدعم الفني</h2>
                      <p className="text-slate-400 max-w-md">نحن هنا لمساعدتكم في حل أي مشكلات تقنية أو استفسارات تتعلق بأنظمة السلامة الخاصة بكم.</p>
                   </div>
                </div>

                <div className="p-12 lg:p-20">
                   <form 
                     className="space-y-8"
                     onSubmit={(e) => {
                       e.preventDefault();
                       const formData = new FormData(e.currentTarget);
                       const newTicket = {
                         id: Date.now(),
                         name: formData.get('name'),
                         phone: formData.get('phone'),
                         type: formData.get('type'),
                         description: formData.get('description'),
                         status: 'new',
                         date: new Date().toLocaleDateString('ar-SA')
                       };
                       setTickets([newTicket, ...tickets]);
                       alert('تم إرسال تذكرة الدعم بنجاح! فريقنا سيقوم بمراجعتها قريباً.');
                       setActiveTab('home');
                     }}
                   >
                       <div className="grid md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                             <label className="text-sm font-bold text-slate-700 px-2">الاسم بالكامل</label>
                             <input name="name" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="أدخل اسمك" />
                          </div>
                          <div className="space-y-3">
                             <label className="text-sm font-bold text-slate-700 px-2">رقم الجوال</label>
                             <input name="phone" type="tel" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all font-bold" placeholder="05xxxxxxxx" />
                          </div>
                       </div>

                       <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-700 px-2">نوع المشكلة أو الطلب</label>
                          <select name="type" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all appearance-none cursor-pointer font-bold">
                            <option value="بلاغ عطل فني">بلاغ عطل فني</option>
                            <option value="استفسار عن الأنظمة">استفسار عن الأنظمة</option>
                            <option value="مشكلة في لوحة التحكم">مشكلة في لوحة التحكم</option>
                            <option value="طلب صيانة طارئة">طلب صيانة طارئة</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                       </div>

                       <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-700 px-2">وصف المشكلة بالتفصيل</label>
                          <textarea name="description" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-red-600 transition-all h-40 font-bold" placeholder="اشرح لنا المشكلة بالتفصيل لنتمكن من مساعدتك..." />
                       </div>

                       <div className="space-y-3">
                          <label className="text-sm font-bold text-slate-700 px-2">إرفاق ملف أو صورة للمشكلة</label>
                          <div className="w-full border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center hover:border-red-400 transition-colors cursor-pointer group bg-slate-50/50">
                             <Plus className="mx-auto mb-4 text-slate-400 group-hover:text-red-500 transition-colors" size={32} />
                             <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">اسحب الصور أو الملفات هنا<br/>أو اضغط للاختيار</p>
                          </div>
                       </div>

                       <div className="flex items-center justify-between gap-8 pt-4">
                          <button 
                            type="button"
                            onClick={() => setActiveTab('home')}
                            className="px-10 py-5 text-slate-500 font-bold hover:text-slate-900 transition-colors"
                          >
                             إلغاء
                          </button>
                          <button 
                            type="submit"
                            className="flex-1 py-5 bg-red-600 text-white rounded-2xl font-black text-xl shadow-2xl shadow-red-500/30 hover:bg-black transition-all"
                          >
                             إرسال تذكرة الدعم
                          </button>
                       </div>
                   </form>
                </div>
             </div>
          </motion.div>
        ) : (activeTab === 'admin' && isAdminAuthenticated) ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl mx-auto px-6 py-24 space-y-12"
          >
             <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
                <div className="space-y-1">
                   <div className="flex items-center gap-3 text-red-600">
                      <LayoutDashboard size={28} />
                      <h2 className="text-4xl font-black tracking-tighter">لوحة إدارة النظام</h2>
                   </div>
                   <p className="text-slate-500 font-bold">إدارة عروض الأسعار وتذاكر الدعم الواردة</p>
                </div>
                <div className="flex p-1.5 bg-slate-100 rounded-2xl">
                   <button 
                     onClick={() => setAdminTab('tickets')}
                     className={cn("px-6 py-3 rounded-xl font-bold text-sm transition-all", adminTab === 'tickets' ? "bg-white text-red-600 shadow-md" : "text-slate-500 hover:text-slate-900")}
                   >
                     تذاكر الدعم
                   </button>
                   <button 
                     onClick={() => setAdminTab('quotes')}
                     className={cn("px-6 py-3 rounded-xl font-bold text-sm transition-all", adminTab === 'quotes' ? "bg-white text-red-600 shadow-md" : "text-slate-500 hover:text-slate-900")}
                   >
                     عروض الأسعار
                   </button>
                   <button 
                     onClick={() => setAdminTab('projects')}
                     className={cn("px-6 py-3 rounded-xl font-bold text-sm transition-all", adminTab === 'projects' ? "bg-white text-red-600 shadow-md" : "text-slate-500 hover:text-slate-900")}
                   >
                     إدارة المشاريع
                   </button>
                </div>
             </div>

             {adminTab === 'tickets' ? (
                <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse">
                         <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">تاريخ الطلب</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">العميل</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">نوع المشكلة</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">الحالة</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">الإجراء</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {tickets.map((ticket: any) => (
                               <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="p-8 text-sm font-bold text-slate-400">{ticket.date}</td>
                                  <td className="p-8">
                                     <div className="font-black text-slate-900">{ticket.name}</div>
                                     <div className="text-xs text-slate-500 font-bold">{ticket.phone}</div>
                                  </td>
                                  <td className="p-8">
                                     <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-black uppercase tracking-tight">
                                        {ticket.type}
                                     </span>
                                  </td>
                                  <td className="p-8">
                                     {ticket.status === 'new' ? (
                                        <span className="flex items-center gap-2 text-red-600 text-xs font-black uppercase tracking-widest">
                                           <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                                           طلب جديد
                                        </span>
                                     ) : (
                                        <span className="flex items-center gap-2 text-green-600 text-xs font-black uppercase tracking-widest">
                                           <div className="w-2 h-2 rounded-full bg-green-600" />
                                           تم الحل
                                        </span>
                                     )}
                                  </td>
                                  <td className="p-8">
                                     <div className="flex gap-2">
                                        <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                                           <Clock size={16} />
                                        </button>
                                        <button className="p-3 bg-red-600 text-white rounded-xl hover:bg-black transition-all shadow-lg shadow-red-500/20">
                                           <MessageCircle size={16} />
                                        </button>
                                     </div>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                   {tickets.length === 0 && (
                      <div className="p-20 text-center space-y-4">
                         <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                            <LayoutDashboard size={40} />
                         </div>
                         <p className="font-bold text-slate-400">لا يوجد طلبات دعم فني بانتظار المراجعة</p>
                      </div>
                   )}
                </div>
             ) : adminTab === 'quotes' ? (
                <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
                   <div className="overflow-x-auto">
                      <table className="w-full text-right border-collapse">
                         <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">تاريخ العرض</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">الرقم المرجعي</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">العميل</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">المنتجات</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">الحالة</th>
                               <th className="p-8 text-xs font-black uppercase text-slate-500 tracking-widest">الإجراء</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {quoteRequests.map((quote: any) => (
                               <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="p-8 text-sm font-bold text-slate-400">{quote.date}</td>
                                  <td className="p-8 font-black text-red-600">{quote.quoteNumber}</td>
                                  <td className="p-8">
                                     <div className="font-black text-slate-900">{quote.name}</div>
                                     <div className="text-xs text-slate-500 font-bold">{quote.phone}</div>
                                  </td>
                                  <td className="p-8 max-w-sm">
                                     <div className="flex flex-wrap gap-2">
                                        {quote.items.map((item: any, idx: number) => (
                                           <span key={idx} className="bg-slate-50 px-2 py-1 rounded-lg text-[10px] font-bold border border-slate-100">
                                              {item.name} ({item.quantity})
                                           </span>
                                        ))}
                                     </div>
                                  </td>
                                  <td className="p-8">
                                     <span className="flex items-center gap-2 text-orange-600 text-xs font-black uppercase tracking-widest">
                                        <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                                        تحت المراجعة
                                     </span>
                                  </td>
                                  <td className="p-8">
                                     <div className="flex gap-2">
                                        <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                           عرض PDF
                                        </button>
                                        <button className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all shadow-lg shadow-green-500/20">
                                           <MessageCircle size={16} />
                                        </button>
                                     </div>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                   {quoteRequests.length === 0 && (
                      <div className="p-20 text-center space-y-4">
                         <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                            <Plus size={40} />
                         </div>
                         <p className="font-bold text-slate-400">لا توجد طلبات عروض أسعار حتى الآن</p>
                      </div>
                   )}
                </div>
             ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
                      {allProjects.map((project, idx) => (
                        <div key={idx} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl space-y-6 hover:border-red-100 transition-all group">
                           <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 relative">
                              <img src={project.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={project.title} />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <Upload className="text-white" size={24} />
                              </div>
                           </div>
                           <div className="space-y-4">
                              <div className="space-y-1">
                                 <h4 className="font-black text-slate-900">{project.title}</h4>
                                 <p className="text-xs text-slate-400 font-bold">{project.category}</p>
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mr-1">رابط صورة المشروع</label>
                                 <div className="flex gap-2">
                                    <input 
                                      type="text" 
                                      value={project.img}
                                      onChange={(e) => {
                                        const newProjects = [...allProjects];
                                        newProjects[idx].img = e.target.value;
                                        setAllProjects(newProjects);
                                      }}
                                      className="flex-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-[10px] font-sans focus:outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/5 transition-all"
                                      placeholder="https://images.unsplash.com/..."
                                    />
                                    <button className="px-5 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black hover:bg-slate-900 transition-all shadow-lg shadow-red-500/20 active:scale-95">تحديث</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   <div className="p-12 bg-red-50 rounded-[3rem] border border-red-100 text-center space-y-4">
                      <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                         <Info size={32} />
                      </div>
                      <div className="space-y-2">
                         <h4 className="text-xl font-black text-slate-900">تعليمات الصور</h4>
                         <p className="text-sm text-slate-500 max-w-lg mx-auto font-medium">سيتم تطبيق التعديلات التي تقوم بها هنا فوراً على معرض أعمال الصفحة الرئيسية. يرجى التأكد من استخدام روابط صور صالحة وعالية الجودة (HD).</p>
                      </div>
                   </div>
                </div>
             )}

             <div className="text-center">
                <button 
                  onClick={handleLogout}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-red-600 transition-all shadow-2xl"
                >
                   تسجيل الخروج الآمن
                </button>
             </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Footer */}
      <footer id="اتصل-بنا" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-8">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onDoubleClick={() => setActiveTab('admin_login')}
              title="الإدارة فقط"
            >
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <Flame size={28} />
              </div>
              <h1 className="text-2xl font-black">الدرع الواقي</h1>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              شريككم الموثوق في السلامة والأمان. نقدم حلولاً متكاملة لأنظمة الإنذار والإطفاء وفق أعلى المعايير العالمية. حمايتكم هي أولويتنا القصوى.
            </p>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-black text-lg">روابط سريعة</h5>
            <ul className="space-y-4 text-slate-400 font-bold text-sm">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-red-500">الرئيسية</button></li>
              <li><button onClick={() => setActiveTab('maintenance')} className="hover:text-red-500">خدمات الصيانة</button></li>
              <li><a href="#" className="hover:text-red-500">معرض الأعمال</a></li>
              <li><a href="#" className="hover:text-red-500">سياسة الخصوصية</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-black text-lg">تواصل معنا</h5>
            <div className="space-y-4 text-slate-400 font-bold text-sm">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-red-600" />
                {CONTACT_ADDRESS}
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-red-600" />
                {CONTACT_PHONE}
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-red-600" />
                {CONTACT_EMAIL}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-0 z-50 bg-white p-8 flex flex-col gap-8 md:hidden"
          >
            <div className="flex justify-between items-center">
              <span className="font-bold">القائمة</span>
              <button onClick={() => setIsMenuOpen(false)}><X /></button>
            </div>
            <button onClick={() => { setActiveTab('home'); setIsMenuOpen(false); }} className="text-2xl font-black text-right">الرئيسية</button>
            <button onClick={() => { setActiveTab('maintenance'); setIsMenuOpen(false); }} className="text-2xl font-black text-right">الصيانة</button>
            <button onClick={() => { setActiveTab('approvals'); setIsMenuOpen(false); }} className="text-2xl font-black text-right">اعتماد المشاريع</button>
            <button onClick={() => { setActiveTab('safety_reports'); setIsMenuOpen(false); }} className="text-2xl font-black text-right">تقارير السلامة</button>
            <button onClick={() => { setActiveTab('risk_assessment'); setIsMenuOpen(false); }} className="text-2xl font-black text-right">تقييم المخاطر</button>
            <button onClick={() => { setActiveTab('support'); setIsMenuOpen(false); }} className="text-2xl font-black text-right">الدعم الفني</button>
            <a href="#خدماتنا" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-right">خدماتنا</a>
            <a href="#أعمالنا" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-right">أعمالنا</a>
            <a href="#اتصل-بنا" onClick={() => setIsMenuOpen(false)} className="text-2xl font-black text-right">اتصل بنا</a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
