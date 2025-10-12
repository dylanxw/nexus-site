"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Phone, MapPin, Building2, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoursDropdownRef, setHoursDropdownRef] = useState<HTMLDivElement | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleHoursMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setActiveDropdown('hours');
  };

  const handleHoursMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 100); // Small delay to prevent flickering
    setHoverTimeout(timeout);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [hoverTimeout]);

  // Get current day and hours
  const getCurrentDayInfo = () => {
    const today = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = dayNames[today.getDay()];
    const currentHours = siteConfig.hours[currentDay as keyof typeof siteConfig.hours];
    return {
      day: currentDay.charAt(0).toUpperCase() + currentDay.slice(1),
      hours: currentHours
    };
  };

  const currentDayInfo = getCurrentDayInfo();

  return (
    <header className="sticky top-0 z-50 w-full" style={{ backgroundColor: '#1D2228' }}>
      {/* Top Section - Contact Info - Hidden on mobile, visible on desktop when not scrolled */}
      <div
        style={{ backgroundColor: '#1D2228', borderBottomColor: '#22272E' }}
        className={`hidden lg:block border-b transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-96 opacity-100'
        }`}
      >
        <div className="wide-container py-2">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
            {/* Left - Business Name & Address */}
            <div className="flex flex-col gap-0">
              <div className="text-white font-medium text-sm">
                Nexus Tech Solutions
              </div>
              <div className="text-white text-xs">
                {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.zip}
              </div>
            </div>

            {/* Center - Contact Info */}
            <div className="flex flex-col sm:flex-row lg:flex-row lg:items-center gap-2 lg:gap-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-1 text-white hover:text-primary transition-colors cursor-pointer"
              >
                <Phone className="h-3 w-3" style={{ color: '#DB5858' }} />
                <span className="text-xs font-medium">{siteConfig.phone}</span>
              </a>
              <div className="flex items-center gap-1 text-white hover:text-primary transition-colors cursor-pointer">
                <MapPin className="h-3 w-3" style={{ color: '#DB5858' }} />
                <span className="text-xs">Directions</span>
              </div>
              <div className="flex items-center gap-1 text-white hover:text-primary transition-colors cursor-pointer">
                <Building2 className="h-3 w-3" style={{ color: '#DB5858' }} />
                <span className="text-xs">Location</span>
              </div>
            </div>

            {/* Right - Store Hours with Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleHoursMouseEnter}
              onMouseLeave={handleHoursMouseLeave}
            >
              <div
                ref={setHoursDropdownRef}
                className="flex flex-col items-end text-white cursor-pointer"
              >
                <div className="text-xs font-semibold" style={{ color: '#DB5858' }}>
                  Store Hours
                </div>
                <div className="text-xs text-white">
                  {currentDayInfo.day}: {currentDayInfo.hours}
                  <span className="ml-1" style={{ color: '#DB5858' }}>+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Hours Dropdown Portal */}
        {activeDropdown === 'hours' && hoursDropdownRef && typeof window !== 'undefined' && createPortal(
          <div
            className="fixed w-56 rounded-md shadow-lg border border-gray-600"
            style={{
              backgroundColor: '#1D2228',
              zIndex: 9999,
              top: hoursDropdownRef.getBoundingClientRect().bottom + 4,
              right: window.innerWidth - hoursDropdownRef.getBoundingClientRect().right
            }}
            onMouseEnter={handleHoursMouseEnter}
            onMouseLeave={handleHoursMouseLeave}
          >
            <div className="py-2 px-3">
              <div className="font-semibold text-xs mb-2" style={{ color: '#DB5858' }}>STORE HOURS</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-white">
                  <span>Monday:</span>
                  <span style={{ color: '#DB5858' }}>{siteConfig.hours.monday}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Tuesday:</span>
                  <span style={{ color: '#DB5858' }}>{siteConfig.hours.tuesday}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Wednesday:</span>
                  <span style={{ color: '#DB5858' }}>{siteConfig.hours.wednesday}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Thursday:</span>
                  <span style={{ color: '#DB5858' }}>{siteConfig.hours.thursday}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Friday:</span>
                  <span style={{ color: '#DB5858' }}>{siteConfig.hours.friday}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Saturday:</span>
                  <span style={{ color: '#DB5858' }}>{siteConfig.hours.saturday}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Sunday:</span>
                  <span style={{ color: '#DB5858' }}>{siteConfig.hours.sunday}</span>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>

      {/* Navigation Section - Logo & Navigation */}
      <div
        style={{ backgroundColor: '#22272E' }}
        className="transition-all duration-300"
      >
        <div className="wide-container">
          <div className="flex items-center justify-between">
            {/* Logo - Fixed size on mobile, responsive on desktop */}
            <Link href="/" className="flex items-center group -ml-4 sm:-ml-6 lg:-ml-8">
              {/* Mobile logo - always 150px */}
              <Image
                src="/images/site-logo/nexus-logo.png"
                alt="Nexus Tech Solutions Logo"
                width={150}
                height={150}
                className="lg:hidden"
              />
              {/* Desktop logo - responsive to scroll */}
              <Image
                src="/images/site-logo/nexus-logo.png"
                alt="Nexus Tech Solutions Logo"
                width={isScrolled ? 150 : 180}
                height={isScrolled ? 150 : 180}
                className="hidden lg:block transition-all duration-300 -my-3"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center relative transition-all duration-300 ${
              isScrolled ? 'gap-4' : 'gap-6'
            }`}>
              {/* Repair Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('repair')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div
                  className="flex items-center gap-1 text-white font-semibold hover:text-primary transition-colors cursor-pointer"
                  onClick={() => handleDropdownToggle('repair')}
                >
                  REPAIR SERVICES
                  <ChevronDown className="h-4 w-4" style={{ color: '#DB5858' }} />
                </div>
                {activeDropdown === 'repair' && (
                  <div
                    className="absolute top-full left-0 w-56 rounded-md shadow-lg z-50 border border-gray-600"
                    style={{ backgroundColor: '#1D2228' }}
                  >
                    <div className="py-2">
                      <Link href="/services/iphone-repair" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">iPhone Repair</Link>
                      <Link href="/services/tablet-repair" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Tablet Repair</Link>
                      <Link href="/services/ipad-repair" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">iPad Repair</Link>
                      <Link href="/services/samsung-phone-repair" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Samsung Phone Repair</Link>
                      <Link href="/services/console-repair" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Game Console Repairs</Link>
                      <Link href="/services/computer-repair" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Computer/Laptop Repairs</Link>
                      <Link href="/services/drone-repair" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Drone Repair</Link>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/denton-tx/repair-form" className="text-white font-semibold hover:text-primary transition-colors">
                SCHEDULE REPAIR
              </Link>

              <Link href="/shop" className="text-white font-semibold hover:text-primary transition-colors">
                SHOP PRE-OWNED
              </Link>

              <Link href="/sell-a-device" className="text-white font-semibold hover:text-primary transition-colors">
                SELL A DEVICE
              </Link>



              {/* More Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('more')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div
                  className="flex items-center gap-1 text-white font-semibold hover:text-primary transition-colors cursor-pointer"
                  onClick={() => handleDropdownToggle('more')}
                >
                  MORE
                  <ChevronDown className="h-4 w-4" style={{ color: '#DB5858' }} />
                </div>
                {activeDropdown === 'more' && (
                  <div
                    className="absolute top-full left-0 w-48 rounded-md shadow-lg z-50 border border-gray-600"
                    style={{ backgroundColor: '#1D2228' }}
                  >
                    <div className="py-2">
                      <Link href="/about" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">About Us</Link>
                      <Link href="/contact" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Contact Us</Link>
                      <Link href="/gallery" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Gallery</Link>
                      <Link href="/service-areas" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Service Areas</Link>
                      <Link href="/reviews" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Reviews</Link>
                      <Link href="/locations" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Locations</Link>
                      <Link href="/warranty" className="block px-4 py-2 text-white hover:bg-gray-800 transition-colors">Warranty Policy</Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Now Button */}
              <Button
                asChild
                className="btn-primary brand-shadow ml-4"
                size="sm"
              >
                <a href={`tel:${siteConfig.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t" style={{ backgroundColor: '#1D2228', borderTopColor: '#22272E' }}>
          <nav className="wide-container py-6 space-y-4">
            {/* Mobile Repair Services */}
            <div>
              <div
                className="flex items-center gap-2 text-white font-semibold py-2 cursor-pointer"
                onClick={() => handleDropdownToggle('mobile-repair')}
              >
                REPAIR SERVICES
                <ChevronDown className="h-4 w-4" style={{ color: '#DB5858' }} />
              </div>
              {activeDropdown === 'mobile-repair' && (
                <div className="pl-4 space-y-2">
                  <Link href="/services/iphone-repair" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>iPhone Repair</Link>
                  <Link href="/services/tablet-repair" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Tablet Repair</Link>
                  <Link href="/services/ipad-repair" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>iPad Repair</Link>
                  <Link href="/services/samsung-phone-repair" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Samsung Phone Repair</Link>
                  <Link href="/services/console-repair" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Game Console Repairs</Link>
                  <Link href="/services/computer-repair" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Computer/Laptop Repairs</Link>
                  <Link href="/services/drone-repair" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Drone Repair</Link>
                </div>
              )}
            </div>

            <Link
              href="/denton-tx/repair-form"
              className="block text-white font-semibold py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              SCHEDULE REPAIR
            </Link>

            <Link
              href="/shop"
              className="block text-white font-semibold py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              SHOP
            </Link>

            <Link
              href="/sell-a-device"
              className="block text-white font-semibold py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              SELL A DEVICE
            </Link>



            {/* Mobile More */}
            <div>
              <div
                className="flex items-center gap-2 text-white font-semibold py-2 cursor-pointer"
                onClick={() => handleDropdownToggle('mobile-more')}
              >
                MORE
                <ChevronDown className="h-4 w-4" style={{ color: '#DB5858' }} />
              </div>
              {activeDropdown === 'mobile-more' && (
                <div className="pl-4 space-y-2">
                  <Link href="/about" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                  <Link href="/contact" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                  <Link href="/gallery" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
                  <Link href="/service-areas" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Service Areas</Link>
                  <Link href="/reviews" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Reviews</Link>
                  <Link href="/locations" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Locations</Link>
                  <Link href="/warranty" className="block text-gray-300 py-1" onClick={() => setIsMenuOpen(false)}>Warranty Policy</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}