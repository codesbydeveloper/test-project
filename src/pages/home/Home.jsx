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
              SaaS Admin Dashboard – Complete Management Solution
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Our SaaS Admin Dashboard provides comprehensive tools for managing users, domains, and business operations. 
              Built with modern web technologies, our platform offers secure authentication, role-based access control, 
              and intuitive interfaces that help teams manage their digital infrastructure efficiently.
            </p>
          </header>

          {/* Cloud Management Section */}
          <section className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-6">What Is Cloud Management?</h1>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Cloud management refers to the processes and tools used to monitor,
              control, and optimize cloud infrastructure and services.
            </p>

            {/* Ad Placement */}
            <div className="my-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <GoogleAd 
                  adSlot="6300978111"
                  adFormat="auto"
                  style={{ minHeight: '100px' }}
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">Why Cloud Management Matters</h2>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Businesses rely on cloud platforms to ensure scalability,
              security, and performance across distributed systems.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Proper cloud management reduces costs, improves uptime,
              and enhances operational efficiency.
            </p>
          </section>

          {/* Editorial Content Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Why Choose Our SaaS Admin Dashboard?</h2>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              In today's digital landscape, managing business operations, users, and digital assets requires 
              robust, scalable solutions. Our SaaS Admin Dashboard has been designed from the ground up to 
              address the complex needs of modern businesses, from startups to enterprise organizations.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Our platform combines cutting-edge technology with intuitive design, making it easy for 
              teams to manage users, domains, and business operations without compromising on security or performance. 
              Whether you're handling a small team or managing enterprise-level operations, our dashboard scales with your needs.
            </p>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-8">
              <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Secure authentication system with role-based access control (Admin and User roles)</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Complete user management with CRUD operations for creating, updating, and deleting users</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Domain management system allowing users to create, update, and manage their domains</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Admin dashboard for viewing all domains and assigning them to users</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>User profile management with detailed account information and settings</span>
                </li>
                <li className="flex items-start gap-3 text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span>Modern, responsive design built with React and Tailwind CSS for optimal user experience</span>
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
            <h2 className="text-3xl font-bold text-white mb-6">Getting Started with Admin Dashboard</h2>
            
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Admin dashboards have become essential for businesses looking to streamline their operations 
              and manage their digital assets efficiently. With our SaaS Admin Dashboard, you get a comprehensive 
              platform that handles everything from user management to domain administration, all from a single, 
              unified interface.
            </p>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Our platform is built on industry best practices and follows strict security protocols. 
              We understand that your business operations are critical, which is why we've invested heavily 
              in reliability, security, and user experience. The dashboard provides role-based access, ensuring 
              that administrators and regular users have appropriate permissions and capabilities.
            </p>

            <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 my-8">
              <h3 className="text-xl font-bold text-white mb-3">Role-Based Access Control</h3>
              <p className="text-slate-300 leading-relaxed">
                Our platform features two distinct user roles: Administrators and Regular Users. Administrators 
                have full access to manage users, view all domains, and assign domains to users. Regular users 
                can create and manage their own domains, view their profile, and access their personalized dashboard. 
                This separation ensures security while providing flexibility for different use cases.
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
              Ready to streamline your business operations and user management? Get started today and experience 
              the difference that a professional admin dashboard can make for your organization.
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

