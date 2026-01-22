import { useNavigate } from 'react-router-dom';
import { LogIn, Globe, Shield, ArrowRight, Check } from 'lucide-react';
import GoogleAd from '../../components/GoogleAd';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Main Content - Editorial Style */}
        <article className="prose prose-invert max-w-none">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              RaomTech – Cloud Management Platform
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              RaomTech provides scalable cloud and domain management tools for businesses of all sizes. 
              Our platform offers secure authentication, domain automation, and enterprise-grade reliability 
              to help you manage your digital infrastructure efficiently.
            </p>
          </header>

          {/* First Ad Placement */}
          <div className="my-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <GoogleAd 
                adSlot="6300978111"
                adFormat="auto"
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>

          {/* Editorial Content Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Choose RaomTech?</h2>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              In today's digital landscape, managing cloud infrastructure and domains requires robust, 
              scalable solutions. RaomTech has been designed from the ground up to address the complex 
              needs of modern businesses, from startups to enterprise organizations.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Our platform combines cutting-edge technology with intuitive design, making it easy for 
              teams to manage their digital assets without compromising on security or performance. 
              Whether you're handling a handful of domains or managing thousands, RaomTech scales with your needs.
            </p>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-8">
              <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Secure authentication system with role-based access control for enhanced security</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Automated domain management tools that save time and reduce manual errors</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Enterprise-grade infrastructure with 99.9% uptime guarantee</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Comprehensive API access for seamless integration with your existing tools</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Real-time monitoring and analytics to track your infrastructure health</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Second Ad Placement */}
          <div className="my-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <GoogleAd 
                adSlot="6300978111"
                adFormat="auto"
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>

          {/* More Editorial Content */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Getting Started with Cloud Management</h2>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Cloud management has become essential for businesses looking to optimize their operations 
              and reduce costs. With RaomTech, you get a comprehensive platform that handles everything 
              from domain registration to cloud resource allocation, all from a single, unified interface.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Our platform is built on industry best practices and follows strict security protocols. 
              We understand that your digital infrastructure is critical to your business operations, 
              which is why we've invested heavily in reliability, security, and performance.
            </p>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 my-8">
              <h3 className="text-xl font-bold text-white mb-3">Enterprise Solutions</h3>
              <p className="text-slate-300 leading-relaxed">
                For larger organizations, we offer dedicated support, custom integrations, and priority 
                access to new features. Our enterprise customers benefit from 24/7 support, dedicated 
                account managers, and SLA guarantees that ensure your infrastructure remains operational.
              </p>
            </div>
          </section>

          {/* Third Ad Placement */}
          <div className="my-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
              <GoogleAd 
                adSlot="6300978111"
                adFormat="auto"
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>

          {/* Call to Action */}
          <section className="text-center mt-16 mb-8">
            <p className="text-slate-300 text-lg mb-6">
              Ready to streamline your cloud and domain management? Get started today and experience 
              the difference that professional infrastructure management can make for your business.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition shadow-lg shadow-blue-600/20"
            >
              <LogIn size={24} />
              Access Your Dashboard
              <ArrowRight size={20} />
            </button>
          </section>
        </article>
      </div>
    </div>
  );
}

