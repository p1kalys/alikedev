import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/features/HeroSection";
import { MapView } from "@/components/features/MapView";
import { FilterPanel } from "@/components/features/FilterPanel";
import { ProfileGrid } from "@/components/features/ProfileGrid";
import { useTheme } from "@/hooks/useTheme";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { toast } = useToast();
  
  // Application state
  const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  const [resultsCount, setResultsCount] = useState(0);

  const handleLocationSearch = (location: string) => {
    setCurrentLocation(location);
    setIsMapVisible(true);
    
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

      {/* Main Content */}
      {currentLocation && (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <FilterPanel
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedPlatforms={selectedPlatforms}
                  onPlatformToggle={handlePlatformToggle}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalResults={resultsCount}
                />
                
                {/* Map */}
                <MapView
                  location={currentLocation}
                  isVisible={isMapVisible}
                  onToggleVisibility={() => setIsMapVisible(!isMapVisible)}
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
      <footer className="border-t border-border bg-surface/50 py-8 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 AlikeDev. Discover professionals worldwide across multiple platforms.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
