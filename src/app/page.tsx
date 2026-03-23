import { Chatbot } from '@/components/Chatbot';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Henry Russell</h1>
          <p className="text-xl text-slate-300 mb-2">
            Software Engineer & Quality Engineer
          </p>
          <p className="text-slate-400 mb-8">
            4 years of professional experience in automation, testing, and full-stack development
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12">
            <a
              href="https://github.com/henryrussell"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/henry-russell/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">
              Ask Me About My Experience
            </h2>
            <p className="text-slate-400">
              Powered by AI • Trained on my professional CV
            </p>
          </div>
          <Chatbot />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-slate-400">
          <p>Disclaimer: This is a demo application. The information provided is for illustrative purposes only. I am not responsible for any hallucinations or inaccuracies from the AI model.</p>
        </div>
      </footer>
    </main>
  );
}
