import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, User, FileText, AlertTriangle, Scale, Settings, CheckCircle2, XCircle, ChevronRight, Smartphone, Lock, Eye, EyeOff, Zap, MessageCircle, Send, X, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

const sections = [
  { id: 'intro', title: 'Welcome to TikTok', icon: FileText },
  { id: 'account', title: 'Account & Age', icon: User },
  { id: 'usage', title: 'Using the App', icon: Smartphone },
  { id: 'content', title: 'Your Content', icon: Eye },
  { id: 'privacy', title: 'Privacy & Ads', icon: Shield },
  { id: 'termination', title: 'Leaving TikTok', icon: AlertTriangle },
  { id: 'legal', title: 'The Legal Stuff', icon: Scale },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        <div className="p-8 border-b border-gray-100">
          <h1 className="text-2xl font-serif font-bold tracking-tight text-gray-900 flex items-center gap-3">
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M33.914 19.414C34.004 19.414 34.094 19.413 34.184 19.411C34.184 19.411 34.184 19.411 34.184 19.411C36.637 19.336 38.868 20.354 40.428 21.999C41.879 23.529 42.793 25.597 42.793 27.868V27.871H35.498V27.868C35.498 26.31 34.61 24.962 33.284 24.316C32.613 23.989 31.854 23.8 31.053 23.8C30.635 23.8 30.229 23.856 29.843 23.962V5H22.548V32.339C22.548 36.143 19.464 39.227 15.66 39.227C11.856 39.227 8.772 36.143 8.772 32.339C8.772 28.535 11.856 25.451 15.66 25.451C16.485 25.451 17.276 25.596 18.014 25.862V18.318C17.256 18.118 16.468 18.012 15.66 18.012C7.751 18.012 1.343 24.42 1.343 32.329C1.343 40.238 7.751 46.646 15.66 46.646C23.569 46.646 29.977 40.238 29.977 32.329V16.71C31.111 17.159 32.331 17.432 33.606 17.502C33.708 17.508 33.811 17.511 33.914 17.511V19.414Z" fill="black"/>
            </svg>
            TikTok ToS
          </h1>
          <p className="text-xs font-semibold text-gray-500 mt-2 uppercase tracking-widest">Plain English Edition</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                activeSection === s.id
                  ? 'bg-black text-white shadow-md shadow-black/10 translate-x-1'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3 font-medium">
                <s.icon className={`w-5 h-5 ${activeSection === s.id ? 'text-white' : 'text-gray-400'}`} />
                {s.title}
              </div>
              {activeSection === s.id && <ChevronRight className="w-4 h-4 opacity-70" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto p-12 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderContent(activeSection)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Chatbot />
    </div>
  );
}

function renderContent(sectionId: string) {
  switch (sectionId) {
    case 'intro':
      return (
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <FileText className="w-16 h-16 text-blue-500" />
            </motion.div>
            <div>
              <h2 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-900">Welcome to TikTok</h2>
              <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                We know legal documents are dense. That's why we've translated our Terms of Service into plain English so you know exactly what you're agreeing to.
              </p>
            </div>
          </div>

          <AISummaryCard summary="This is a plain-English, interactive version of TikTok's Terms of Service. It explains the rules you must follow, your rights to your content, and what happens to your data while using the app." />
          
          <div className="bg-black text-white rounded-2xl p-10 mt-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-500/30 to-cyan-500/30 blur-3xl rounded-full"></div>
            <h3 className="text-2xl font-serif font-bold mb-6 relative z-10">The TL;DR (Too Long; Didn't Read)</h3>
            <ul className="space-y-5 relative z-10">
              <li className="flex gap-4 items-start">
                <div className="bg-white/10 p-2 rounded-full shrink-0"><CheckCircle2 className="w-6 h-6 text-green-400" /></div>
                <p className="text-lg text-gray-200 pt-1">This is a legally binding contract between you and TikTok.</p>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-white/10 p-2 rounded-full shrink-0"><CheckCircle2 className="w-6 h-6 text-green-400" /></div>
                <p className="text-lg text-gray-200 pt-1">By using the app, you agree to follow these rules.</p>
              </li>
              <li className="flex gap-4 items-start">
                <div className="bg-white/10 p-2 rounded-full shrink-0"><CheckCircle2 className="w-6 h-6 text-green-400" /></div>
                <p className="text-lg text-gray-200 pt-1">Maintain respect, adhere to safety guidelines, and abide by the law.</p>
              </li>
            </ul>
          </div>
        </div>
      );
    case 'account':
      return (
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <User className="w-16 h-16 text-green-500" />
            </motion.div>
            <div>
              <h2 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-900">Account & Age</h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                The basic rules about who can use TikTok and how to keep your account safe.
              </p>
            </div>
          </div>
          
          <AISummaryCard summary="You must be at least 13 to use TikTok (or use the Under 13 Experience). Keep your password safe. We can reclaim your username if your account is inactive for 180 days." />
          
          <div className="grid gap-6 mt-12">
            <ExpandableRule 
              title="How old do you need to be?"
              icon={User}
              summary={
                <>
                  <p>You must be <strong>at least 13 years old</strong> to use TikTok. If you are under 13, you can only use our special "Under 13 Experience."</p>
                  <p className="mt-3 text-gray-500">If you are under 18, you need a parent or guardian's permission to use the app.</p>
                </>
              }
              fullText={
                <p>If you are under 13 years of age, you cannot use the Platform, unless you are using the separate Under 13 Experience which limits the information we collect and includes additional safety protections. If you are under 18 years of age, you must review these Terms (and our Privacy Policy) with your parent or guardian, and obtain their permission before you use the Platform.</p>
              }
            />
            <ExpandableRule 
              title="Keep your account safe"
              icon={Lock}
              summary={<p>Your account is yours. Keep your password secret and don't let others use your account without permission.</p>}
              fullText={<p>It is important that you take reasonable steps to keep your account password confidential and that you do not disclose it to any third party. If you know or suspect that any third party knows your password or has accessed your account, please let us know. Do not give others access to your account, or transfer your account to anyone else, without our permission.</p>}
            />
          </div>
        </div>
      );
    case 'usage':
      return (
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <Smartphone className="w-16 h-16 text-indigo-500" />
            </motion.div>
            <div>
              <h2 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-900">Using the App</h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                We want TikTok to be a fun and safe place. Here is what you can and cannot do.
              </p>
            </div>
          </div>

          <AISummaryCard summary="Keep TikTok safe and legal. Do not post harmful content, exploit minors, hack our systems, use illegal bots, or misuse our AI-generated features." />
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-red-900 flex items-center gap-3 mb-6">
                <div className="bg-red-100 p-2 rounded-xl"><XCircle className="w-6 h-6 text-red-600" /></div>
                Do NOT do this:
              </h3>
              <ul className="space-y-4 text-red-800 font-medium">
                <li className="flex gap-3"><span className="text-red-400">•</span> Do anything illegal, harmful, or misleading.</li>
                <li className="flex gap-3"><span className="text-red-400">•</span> Exploit or harm minors in any way.</li>
                <li className="flex gap-3"><span className="text-red-400">•</span> Upload viruses or try to hack our systems.</li>
                <li className="flex gap-3"><span className="text-red-400">•</span> Use bots to scrape our data.</li>
                <li className="flex gap-3"><span className="text-red-400">•</span> Impersonate others or run spam accounts.</li>
              </ul>
            </div>
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 p-2 rounded-xl"><Zap className="w-6 h-6 text-indigo-600" /></div>
                AI Features:
              </h3>
              <p className="text-indigo-800 font-medium mb-5">If you use our generative AI features to create content:</p>
              <ul className="space-y-4 text-indigo-800 font-medium">
                <li className="flex gap-3"><span className="text-indigo-400">•</span> Don't use AI to trick or mislead people.</li>
                <li className="flex gap-3"><span className="text-indigo-400">•</span> Don't remove watermarks that show content is AI-generated.</li>
                <li className="flex gap-3"><span className="text-indigo-400">•</span> You are fully responsible for what you generate.</li>
              </ul>
            </div>
          </div>
        </div>
      );
    case 'content':
      return (
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <Eye className="w-16 h-16 text-pink-500" />
            </motion.div>
            <div>
              <h2 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-900">Your Content</h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                Who owns the videos you post? You do. But you give us permission to use them.
              </p>
            </div>
          </div>

          <AISummaryCard summary="You own the videos you make, but by posting them, you give us a free, worldwide license to show, share, translate, and use them to improve the app and train our AI models." />
          
          <div className="space-y-6 mt-12">
            <ExpandableRule 
              title="You own your content"
              icon={User}
              summary={<p>You keep the ownership rights to the videos, comments, and messages you create. However, you must have the right to post them (e.g., don't steal other people's videos or music).</p>}
              fullText={<p>Your Content includes content you create, import, upload, publish, or generate with the Platform, including messages. Except with respect to TikTok Content and unless expressly stated otherwise, as between you and TikTok USDS Joint Venture, you own Your Content. You represent and warrant that you have, and will continue to have, all necessary rights in and to Your Content...</p>}
            />
            <ExpandableRule 
              title="The license you give us"
              icon={Scale}
              summary={
                <>
                  <p className="mb-4">By posting on TikTok, you give us a free, worldwide license to:</p>
                  <ul className="space-y-3 text-gray-600 font-medium bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-gray-400" /> Show your content to other users.</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-gray-400" /> Copy, share, and translate your content.</li>
                    <li className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-gray-400" /> Use your content to improve our app and train our AI models.</li>
                  </ul>
                </>
              }
              fullText={<p>By creating, inputting, publishing, and otherwise providing Your Content on or to the Platform, you grant to TikTok USDS Joint Venture a license to use Your Content that is: non-exclusive, irrevocable, and royalty-free... assignable and sub-licensable... and worldwide. Our license to use Your Content includes our rights to access, reproduce, distribute, share, download, adapt or make derivative works...</p>}
            />
          </div>
        </div>
      );
    case 'privacy':
      return <InteractivePrivacy />;
    case 'termination':
      return (
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <AlertTriangle className="w-16 h-16 text-orange-500" />
            </motion.div>
            <div>
              <h2 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-900">Leaving TikTok</h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                How to end your relationship with us, and when we might end it with you.
              </p>
            </div>
          </div>

          <AISummaryCard summary="You can delete your account and leave at any time. We can suspend or ban you if you break our rules, violate laws, or cause major security issues." />
          
          <div className="grid gap-6 mt-12">
            <ExpandableRule 
              title="You can leave anytime"
              icon={User}
              summary={<p>You can delete your account whenever you want. Once deleted, your agreement with these terms ends (except for some legal stuff that survives, like our liability limits).</p>}
              fullText={<p>If you delete your account, these Terms (as may be amended) will terminate as an agreement between you and us, except for obligations that remain in place which by their nature should survive the termination of these Terms, including the obligations set out in: Section 3.5 "Ownership of content and grant of licenses," Section 4 "Limitation of liability," Section 5 "Suspending or ending our relationship," Section 7 "Indemnity," Section 8 "Resolving disputes," and Section 9 "Other."</p>}
            />
            <ExpandableRule 
              title="We can ban you"
              icon={XCircle}
              summary={
                <>
                  <p className="mb-4">We can suspend or permanently ban your account if:</p>
                  <ul className="space-y-3 text-gray-600 font-medium bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <li className="flex gap-3 items-center"><XCircle className="w-5 h-5 text-red-500" /> You break these Terms or our Community Guidelines.</li>
                    <li className="flex gap-3 items-center"><XCircle className="w-5 h-5 text-red-500" /> We are legally required to do so.</li>
                    <li className="flex gap-3 items-center"><XCircle className="w-5 h-5 text-red-500" /> There is a major technical or security issue.</li>
                  </ul>
                </>
              }
              fullText={<p>We reserve the right, at any time and without prior notice, to ban or suspend your account, or restrict your access to features of the Platform, at our sole discretion, including if: we have reason to believe in our sole discretion that you have violated these Terms, our Community Guidelines, or other conditions or policies, we are legally required to do so, or it is necessary in our judgment to respond to a technical or security issue.</p>}
            />
          </div>
        </div>
      );
    case 'legal':
      return (
        <div className="space-y-8">
          <div className="flex items-start gap-6">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <Scale className="w-16 h-16 text-gray-700" />
            </motion.div>
            <div>
              <h2 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-900">The Legal Stuff</h2>
              <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                This is the heavy legal jargon, summarized into quick bullet points so you don't fall asleep.
              </p>
            </div>
          </div>

          <AISummaryCard summary="We provide the app 'as is' without guarantees and limit our financial liability to $100. Any major legal disputes must be handled in California courts, and you must cover our legal costs if you cause us to be sued." />
          
          <div className="space-y-6 mt-12">
            <ExpandableRule 
              title="Limitation of Liability"
              icon={Shield}
              summary={
                <ul className="space-y-2 text-gray-600 font-medium">
                  <li>• The app is provided "as is". We don't guarantee it will be perfect, safe, or error-free.</li>
                  <li>• We are not responsible for what other users post.</li>
                  <li>• If something goes wrong, the maximum amount we owe you is $100 (or what you paid us in the last 12 months).</li>
                </ul>
              }
              fullText={<p>The Platform is provided "as is." We and our affiliates make no guarantees that the Platform, including its generative AI-enabled features, will be safe, secure, and free from errors, or that it will function without interruption, delay or defect... To the extent permitted by applicable law, the maximum aggregate liability of TikTok USDS Joint Venture and our affiliates... arising out of or relating to these Terms or your use of the Platform shall, under no circumstance, exceed the greater of $100 or the amount you have paid us in the past 12 months.</p>}
            />
            
            <ExpandableRule 
              title="Resolving Disputes"
              icon={Scale}
              summary={
                <ul className="space-y-2 text-gray-600 font-medium">
                  <li>• If we have a fight, we agree to try to talk it out informally first.</li>
                  <li>• If we go to court, it has to be in Los Angeles, California.</li>
                  <li>• You only have <strong>one year</strong> to file a claim after an incident happens.</li>
                </ul>
              }
              fullText={<p>If we have a dispute with you relating to or arising out of these Terms or the Platform... we will first try and resolve it with you amicably. You agree to do the same for us... Any claim, cause of action or dispute, arising out of or relating to these Terms or the Platform shall also be resolved exclusively in the U.S. District Court for the Central District of California or the Superior Court of the State of California, County of Los Angeles... YOU AND TIKTOK USDS JOINT VENTURE AGREE THAT YOU MUST INITIATE ANY PROCEEDING OR ACTION WITHIN ONE (1) YEAR OF THE DATE OF THE OCCURRENCE OF THE EVENT...</p>}
            />

            <ExpandableRule 
              title="Indemnity"
              icon={AlertTriangle}
              summary={
                <ul className="space-y-2 text-gray-600 font-medium">
                  <li>• If someone sues us because of something you did on the app (like breaking the law or stealing content), you have to cover our legal costs and damages.</li>
                </ul>
              }
              fullText={<p>You agree to defend, indemnify, and hold harmless TikTok USDS Joint Venture and our affiliates, service providers, and business partners... from any and all claims, demands, damages, injunctions, orders, awards, settlements, losses, liabilities, liens, encumbrances, causes of action, of every kind and character, costs (including attorneys' fees and other costs of arbitration, litigation, defense, or settlement), and expenses arising out of or relating to your use of the Platform under these Terms, including a breach of your obligations, representations and warranties under these Terms.</p>}
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}

function ExpandableRule({ title, summary, fullText, icon: Icon }: { title: string, summary: React.ReactNode, fullText: React.ReactNode, icon: any }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-all hover:border-gray-300">
      <div className="flex gap-6">
        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-gray-700" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-xl text-gray-900 mb-3">{title}</h3>
          <div className="text-gray-600 font-medium leading-relaxed">{summary}</div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 bg-gray-50 rounded-xl text-sm text-gray-700 font-serif leading-relaxed border border-gray-200">
                  <p className="font-bold text-xs uppercase text-gray-500 mb-3 tracking-widest">Official Legal Text:</p>
                  {fullText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="mt-5 text-sm font-bold text-gray-800 hover:text-black flex items-center gap-1 transition-colors"
          >
            {expanded ? 'Hide full legal text' : 'Read full legal text'}
            <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${expanded ? '-rotate-90' : 'rotate-90'}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

function AISummaryCard({ summary }: { summary: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-2xl p-6 mt-8 mb-4 shadow-sm flex gap-4 items-start">
      <div className="bg-white/60 p-2 rounded-xl shrink-0 shadow-sm">
        <Sparkles className="w-6 h-6 text-indigo-500" />
      </div>
      <div>
        <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-widest mb-1.5 flex items-center gap-2">
          AI Summary
        </h4>
        <div className="text-indigo-900/80 font-medium leading-relaxed text-lg">{summary}</div>
      </div>
    </div>
  );
}

function InteractivePrivacy() {
  const [personalizedAds, setPersonalizedAds] = useState(true);
  const [aiTraining, setAiTraining] = useState(true);

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-6">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Shield className="w-16 h-16 text-teal-500" />
        </motion.div>
        <div>
          <h2 className="text-5xl font-serif font-bold tracking-tight mb-4 text-gray-900">Privacy & Ads</h2>
          <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
            You have control over how we use your data. Toggle the settings below to see exactly what happens.
          </p>
        </div>
      </div>

      <AISummaryCard summary="You control your privacy preferences. You can toggle personalized ads on or off, and decide whether your public content is used to train our AI models and effects." />

      <div className="grid lg:grid-cols-2 gap-8 mt-12">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-start justify-between mb-8">
              <div className="pr-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Personalized Ads</h3>
                <p className="text-gray-600 leading-relaxed">We use your activity to show you ads you might actually care about.</p>
              </div>
              <Toggle checked={personalizedAds} onChange={setPersonalizedAds} />
            </div>
            
            <div className="h-px bg-gray-100 w-full mb-8"></div>
            
            <div className="flex items-start justify-between">
              <div className="pr-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">AI Training Data</h3>
                <p className="text-gray-600 leading-relaxed">Allow your public content to help train our AI models and effects.</p>
              </div>
              <Toggle checked={aiTraining} onChange={setAiTraining} />
            </div>
          </div>
        </div>

        {/* Animations */}
        <div className="space-y-6">
          {/* Ads Animation Box */}
          <div className="bg-black rounded-2xl p-8 h-56 relative overflow-hidden flex flex-col items-center justify-center text-white shadow-lg">
            <h4 className="absolute top-6 left-6 text-xs font-bold text-gray-400 uppercase tracking-widest">Your Ad Experience</h4>
            
            <AnimatePresence mode="wait">
              {personalizedAds ? (
                <motion.div
                  key="personalized"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-gray-800 border-2 border-indigo-500 rounded-xl flex items-center justify-center mb-4 relative z-10">
                    <Zap className="w-8 h-8 text-indigo-400" />
                  </div>
                  <p className="font-bold text-lg text-center">Highly Relevant Ads<br/><span className="text-sm font-normal text-gray-400">Based on your likes & views</span></p>
                </motion.div>
              ) : (
                <motion.div
                  key="generic"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-gray-800 rounded-xl flex items-center justify-center mb-4 border border-gray-700">
                    <EyeOff className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="font-bold text-lg text-center text-gray-300">Generic Ads<br/><span className="text-sm font-normal text-gray-500">Random, untargeted content</span></p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Animation Box */}
          <div className="bg-gray-50 rounded-2xl p-8 h-56 relative overflow-hidden flex flex-col items-center justify-center border border-gray-200">
            <h4 className="absolute top-6 left-6 text-xs font-bold text-gray-500 uppercase tracking-widest">AI Training</h4>
            
            <AnimatePresence mode="wait">
              {aiTraining ? (
                <motion.div
                  key="training"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ x: [0, 20, 0], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                          className="w-2 h-2 rounded-full bg-indigo-400"
                        />
                      ))}
                    </div>
                    <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <p className="font-bold text-lg text-gray-900 text-center">AI is learning<br/><span className="text-sm font-normal text-gray-600">Your content helps train models</span></p>
                </motion.div>
              ) : (
                <motion.div
                  key="not-training"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm border border-gray-200">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="font-bold text-lg text-gray-900 text-center">Content Excluded<br/><span className="text-sm font-normal text-gray-600">AI models won't use your videos</span></p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (c: boolean) => void }) {
  return (
    <button
      type="button"
      className={`${
        checked ? 'bg-black' : 'bg-gray-200'
      } relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
    >
      <span
        aria-hidden="true"
        className={`${
          checked ? 'translate-x-6' : 'translate-x-0'
        } pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, text: string}[]>([
    { role: 'model', text: "Hi! I'm your AI ToS assistant. What part of the Terms of Service can I help explain?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    if (!ai) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm currently unavailable because the GEMINI_API_KEY environment variable is missing on this server." }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `You are a helpful legal assistant explaining the TikTok Terms of Service in plain English. Keep answers short, friendly, and easy to understand. User asks: ${userMsg}` }] }
        ]
      });
      setMessages(prev => [...prev, { role: 'model', text: response.text || "Sorry, I couldn't generate a response." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I had trouble connecting. Please try again." }]);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200"
          >
            {/* Header */}
            <div className="bg-black text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-300" />
                <span className="font-bold">AI Legal Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 pr-2 border border-gray-200">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent px-4 py-2 text-sm focus:outline-none placeholder:text-gray-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center disabled:opacity-50 transition-opacity"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
