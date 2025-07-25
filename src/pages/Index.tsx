import { useState } from "react";
import { MapPin } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/features/HeroSection";
import { FilterPanel } from "@/components/features/FilterPanel";
import { ProfileGrid } from "@/components/features/ProfileGrid";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { toast } = useToast();

  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [resultsCount, setResultsCount] = useState(0);

  const handleLocationSearch = (location: string) => {
    setCurrentLocation(location);
    
    toast({
      title: "Location Updated",
      description: `Now discovering professionals in ${location}`,
      duration: 3000,
    });
  };

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const showHero = !currentLocation;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onLocationSearch={handleLocationSearch}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Hero Section */}
      {showHero && (
        <HeroSection onLocationSearch={handleLocationSearch} />
      )}

      {/* Location Display */}
      {currentLocation && (
        <div className="bg-gradient-surface border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Discovering professionals in</p>
                  <p className="font-semibold text-foreground">{currentLocation}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentLocation(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                Change Location
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentLocation && (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Mobile Filters Button */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => {
                  const filtersEl = document.getElementById('mobile-filters');
                  if (filtersEl) {
                    filtersEl.classList.toggle('hidden');
                  }
                }}
              >
                <span>Filters & Search</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>

            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div id="mobile-filters" className="hidden lg:block lg:sticky lg:top-24 space-y-6">
                <FilterPanel
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedPlatforms={selectedPlatforms}
                  onPlatformToggle={handlePlatformToggle}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalResults={resultsCount}
                />
              </div>
            </aside>

            {/* Main Content - Profile Grid */}
            <section className="lg:col-span-3">
              <ProfileGrid
                location={currentLocation}
                searchQuery={searchQuery}
                selectedPlatforms={selectedPlatforms}
                sortBy={sortBy}
                onResultsCount={setResultsCount}
              />
            </section>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-surface/50 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2025 AlikeDev, Inc.</p> 
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
