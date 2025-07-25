import { useState } from "react";
import { MapPin, Moon, Sun, Menu, X, Search, Users, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onLocationSearch: (location: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header = ({ onLocationSearch, darkMode, toggleDarkMode }: HeaderProps) => {
  const [locationInput, setLocationInput] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      onLocationSearch(locationInput.trim());
    }
  };

  const recentSearches = ["San Francisco, CA", "New York, NY", "London, UK", "Berlin, Germany"];

  return (
    <header className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">AlikeDev</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Globe2 className="w-4 h-4 mr-2" />
              Discover
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Users className="w-4 h-4 mr-2" />
              Network
            </Button>
          </nav>

          {/* Location Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleLocationSubmit} className="w-full relative">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter location to discover professionals..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="pl-10 pr-10 bg-surface border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Recent Searches Dropdown */}
              {isSearchFocused && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg p-2 animate-slide-up">
                  <div className="text-xs font-medium text-muted-foreground px-3 py-2">Recent searches</div>
                  {recentSearches.map((search) => (
                    <button
                      key={search}
                      onClick={() => {
                        setLocationInput(search);
                        onLocationSearch(search);
                        setIsSearchFocused(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                    >
                      <MapPin className="w-3 h-3 inline mr-2 text-muted-foreground" />
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="w-9 h-9 p-0"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden w-9 h-9 p-0"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 animate-slide-up">
            {/* Mobile Location Search */}
            <form onSubmit={handleLocationSubmit} className="mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter location..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="pl-10 pr-10 bg-surface"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Globe2 className="w-4 h-4 mr-2" />
                Discover
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Network
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};