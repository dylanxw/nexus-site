"use client";

import { User, Award, Wrench, GraduationCap } from "lucide-react";

export function TeamSection() {
  return (
    <section className="section-padding bg-white">
      <div className="wide-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Behind every great repair is a skilled technician who cares. Get to know the people who make Nexus Tech Solutions special.
          </p>
        </div>

        {/* Founder/Owner */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center">
              <User className="h-24 w-24 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Founder & Owner</h3>
              <p className="text-gray-500 text-sm">Professional photo placeholder</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">[Founder Name]</h3>
                <p className="text-lg text-[#DB5858] font-semibold mb-4">Founder & Lead Technician</p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  [Brief bio about founder's background, experience, and passion for technology and customer service]
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <Award className="h-6 w-6 text-[#DB5858] mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">Experience</h4>
                  <p className="text-gray-600 text-sm">[Years of experience in tech repair]</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <GraduationCap className="h-6 w-6 text-[#DB5858] mb-2" />
                  <h4 className="font-semibold text-gray-900 mb-1">Education</h4>
                  <p className="text-gray-600 text-sm">[Educational background or certifications]</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Team Member 1 - Placeholder */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">[Team Member Name]</h3>
            <p className="text-[#DB5858] font-semibold mb-3">[Job Title]</p>
            <p className="text-gray-600 text-sm mb-4">
              [Brief description of team member's role and expertise]
            </p>
            <div className="flex items-center justify-center gap-2">
              <Wrench className="h-4 w-4 text-[#DB5858]" />
              <span className="text-gray-600 text-sm">[Specialization]</span>
            </div>
          </div>

          {/* Team Member 2 - Placeholder */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 text-center">
            <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">[Team Member Name]</h3>
            <p className="text-[#DB5858] font-semibold mb-3">[Job Title]</p>
            <p className="text-gray-600 text-sm mb-4">
              [Brief description of team member's role and expertise]
            </p>
            <div className="flex items-center justify-center gap-2">
              <Wrench className="h-4 w-4 text-[#DB5858]" />
              <span className="text-gray-600 text-sm">[Specialization]</span>
            </div>
          </div>

          {/* We're Hiring Card */}
          <div className="bg-gradient-to-br from-[#DB5858] to-[#c94848] rounded-2xl p-8 text-white text-center hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Join Our Team!</h3>
            <p className="text-white/90 text-sm mb-4">
              Looking for skilled technicians who share our passion for excellent customer service.
            </p>
            <button className="bg-white text-[#DB5858] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Openings
            </button>
          </div>
        </div>

        {/* Team Philosophy */}
        <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Team Philosophy</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We believe that technical skill is just the beginning. Every team member is committed to treating your device – and you – with care and respect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#DB5858]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-6 w-6 text-[#DB5858]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Technical Excellence</h4>
              <p className="text-gray-600 text-sm">
                Continuous training ensures we stay current with the latest devices and repair techniques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#DB5858]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-[#DB5858]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Customer Focus</h4>
              <p className="text-gray-600 text-sm">
                Every interaction is an opportunity to exceed expectations and build lasting relationships.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#DB5858]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-[#DB5858]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Quality Standards</h4>
              <p className="text-gray-600 text-sm">
                We hold ourselves to the highest standards because your trust is our most valuable asset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}