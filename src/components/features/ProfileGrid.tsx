import { useState, useEffect } from "react";
import { Users, Loader2, Search as SearchIcon } from "lucide-react";
import { ProfileCard, Professional } from "./ProfileCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileGridProps {
  location: string | null;
  searchQuery: string;
  selectedPlatforms: string[];
  sortBy: string;
  onResultsCount: (count: number) => void;
}

// Mock data generator for demonstration
const generateMockProfessionals = (location: string, count: number = 20): Professional[] => {
  const platforms = ['linkedin', 'twitter', 'github', 'behance'] as const;
  const titles = [
    'Senior Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist',
    'Frontend Developer', 'Backend Engineer', 'DevOps Engineer', 'Marketing Director',
    'Sales Manager', 'Business Analyst', 'Project Manager', 'Technical Lead',
    'Creative Director', 'Growth Hacker', 'Full Stack Developer', 'AI Researcher'
  ];
  
  const companies = [
    'Tech Innovators Inc', 'Digital Solutions Ltd', 'Future Systems Corp', 'Agile Dynamics',
    'Cloud Nine Technologies', 'Pixel Perfect Studio', 'Data Driven Analytics', 'Smart Solutions',
    'Innovation Labs', 'NextGen Software', 'Quantum Computing Co', 'AI Ventures'
  ];

  const skills = [
    'React', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
    'Machine Learning', 'Product Strategy', 'Design Systems', 'Figma', 'SQL',
    'GraphQL', 'MongoDB', 'Product Management', 'Agile', 'Scrum', 'Leadership'
  ];

  const firstNames = ['Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Anna', 'Robert', 'Maria'];
  const lastNames = ['Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Jackson'];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const title = titles[Math.floor(Math.random() * titles.length)];
    const company = companies[Math.floor(Math.random() * companies.length)];
    
    return {
      id: `prof-${i + 1}`,
      name: `${firstName} ${lastName}`,
      title,
      company,
      location,
      platform,
      profileUrl: `https://${platform}.com/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      imageUrl: `https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop&crop=face&auto=format&q=80`,
      bio: `Passionate ${title.toLowerCase()} with expertise in modern technologies and a track record of delivering innovative solutions.`,
      skills: skills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 2),
      connections: Math.floor(Math.random() * 5000) + 500,
      isVerified: Math.random() > 0.7
    };
  });
};

export const ProfileGrid = ({ 
  location, 
  searchQuery, 
  selectedPlatforms, 
  sortBy, 
  onResultsCount 
}: ProfileGridProps) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(12);

  useEffect(() => {
    if (!location) {
      setProfessionals([]);
      onResultsCount(0);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockData = generateMockProfessionals(location, 50);
      setProfessionals(mockData);
      setIsLoading(false);
    }, 1200);
  }, [location]);

  // Filter and sort professionals
  const filteredProfessionals = professionals.filter(prof => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        prof.name.toLowerCase().includes(query) ||
        prof.title.toLowerCase().includes(query) ||
        prof.company.toLowerCase().includes(query) ||
        prof.bio?.toLowerCase().includes(query) ||
        prof.skills?.some(skill => skill.toLowerCase().includes(query));
      
      if (!matchesSearch) return false;
    }

    // Platform filter
    if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(prof.platform)) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'connections':
        return (b.connections || 0) - (a.connections || 0);
      case 'recent':
        return Math.random() - 0.5; // Random for demo
      default:
        return 0; // Keep original order for relevance
    }
  });

  useEffect(() => {
    onResultsCount(filteredProfessionals.length);
  }, [filteredProfessionals.length, onResultsCount]);

  const visibleProfessionals = filteredProfessionals.slice(0, displayCount);
  const hasMore = filteredProfessionals.length > displayCount;

  if (!location) {
    return (
      <Card className="p-12 text-center bg-gradient-surface border border-border">
        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Start Your Professional Discovery
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Enter a location above to discover talented professionals in that area across LinkedIn, X, GitHub, and more platforms.
        </p>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-12 text-center bg-card border border-border">
        <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Discovering Professionals
        </h3>
        <p className="text-muted-foreground">
          Searching across multiple platforms in {location}...
        </p>
      </Card>
    );
  }

  if (filteredProfessionals.length === 0) {
    return (
      <Card className="p-12 text-center bg-card border border-border">
        <SearchIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Results Found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          No professionals found matching your search criteria in {location}. 
          Try adjusting your filters or search terms.
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.location.reload()}
        >
          Reset Search
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Professionals in {location}
          </h2>
          <p className="text-sm text-muted-foreground">
            Showing {visibleProfessionals.length} of {filteredProfessionals.length} results
          </p>
        </div>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProfessionals.map((professional, index) => (
          <ProfileCard 
            key={professional.id} 
            professional={professional} 
            index={index}
          />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={() => setDisplayCount(prev => prev + 12)}
            className="bg-surface hover:bg-card-hover border-border"
          >
            Load More Professionals
          </Button>
        </div>
      )}
    </div>
  );
};