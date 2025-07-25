import { useState } from "react";
import { MapPin, Search, ArrowRight, Users, Globe2, Linkedin, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-network.jpg";

interface HeroSectionProps {
  onLocationSearch: (location: string) => void;
}

export const HeroSection = ({ onLocationSearch }: HeroSectionProps) => {
  const [locationInput, setLocationInput] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        onLocationSearch(locationInput.trim());
        setIsAnimating(false);
      }, 300);
    }
  };

  const platforms = [
    { name: "LinkedIn", icon: Linkedin, color: "text-blue-600", count: "500M+" },
    { name: "X (Twitter)", icon: Twitter, color: "text-slate-900 dark:text-white", count: "300M+" },
    { name: "GitHub", icon: Github, color: "text-slate-900 dark:text-white", count: "100M+" },
  ];

  const popularLocations = [
    "San Francisco, CA",
    "New York, NY",
    "London, UK",
    "Berlin, Germany",
    "Toronto, Canada",
    "Sydney, Australia"
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image & Gradient */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional Network" 
          className="w-full h-full object-cover opacity-20 dark:opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Discover Professional
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Networks</span>
              <br />
              Worldwide
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Find and connect with professionals in any location across LinkedIn, X, GitHub, and other platforms. 
              Build meaningful connections that matter.
            </p>
          </div>

          {/* Location Search */}
          <div className="animate-slide-up mb-12">
            <form onSubmit={handleLocationSubmit} className="max-w-2xl mx-auto">
              <Card className="p-2 bg-card border border-border shadow-lg hover-lift">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter city, country, or coordinates..."
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      className="pl-12 h-12 text-base border-0 bg-transparent"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    size="lg"
                    variant="premium"
                    disabled={!locationInput.trim() || isAnimating}
                    className="h-12 px-8 font-medium"
                  >
                    {isAnimating ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Search className="w-5 h-5 mr-2" />
                        Discover
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </form>

            {/* Popular Locations */}
            <div className="mt-6">
              <p className="text-sm text-muted-foreground mb-3">Popular locations:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularLocations.map((location) => (
                  <Button
                    key={location}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setLocationInput(location);
                      onLocationSearch(location);
                    }}
                    className="text-xs bg-surface hover:bg-card-hover border-border"
                  >
                    {location}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Stats */}
          <div className="animate-scale-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {platforms.map((platform, index) => (
                <Card 
                  key={platform.name}
                  className="p-6 bg-card border border-border hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <platform.icon className={`w-6 h-6 ${platform.color}`} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{platform.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-1">{platform.count}</p>
                  <p className="text-sm text-muted-foreground">Professionals</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Preview */}
          <div className="mt-16 animate-fade-in">
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">Multi-platform discovery</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe2 className="w-5 h-5" />
                <span className="text-sm">Global reach</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Location-based</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};