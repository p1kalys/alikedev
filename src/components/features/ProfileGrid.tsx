import { useState, useEffect, useMemo } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileCard, type Professional } from "./ProfileCard";
import { useToast } from "@/hooks/use-toast";

interface ProfileGridProps {
  location: string | null;
  searchQuery: string;
  selectedPlatforms: string[];
  sortBy: string;
  onResultsCount: (count: number) => void;
}

export const ProfileGrid = ({
  location,
  searchQuery, 
  selectedPlatforms,
  sortBy,
  onResultsCount
}: ProfileGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const profilesPerPage = 9;
  const { toast } = useToast();

  // Generate mock data
  const allProfessionals: Professional[] = useMemo(() => {
    if (!location) return [];
    
    const platforms = ['linkedin', 'twitter', 'github', 'behance'] as const;
    const titles = [
      'Senior Software Engineer', 'Product Manager', 'UX Designer', 'Data Scientist',
      'Frontend Developer', 'Backend Engineer', 'DevOps Engineer', 'Marketing Director',
      'Sales Manager', 'Business Analyst', 'Project Manager', 'Technical Lead'
    ];
    
    const companies = [
      'Tech Innovators Inc', 'Digital Solutions Ltd', 'Future Systems Corp', 'Agile Dynamics',
      'Cloud Nine Technologies', 'Pixel Perfect Studio', 'Data Driven Analytics', 'Smart Solutions'
    ];

    const skills = [
      'React', 'TypeScript', 'Python', 'Node.js', 'AWS', 'Docker', 'Kubernetes',
      'Machine Learning', 'Product Strategy', 'Design Systems', 'Figma', 'SQL'
    ];

    const firstNames = ['Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'James', 'Anna'];
    const lastNames = ['Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

    return Array.from({ length: 50 }, (_, i) => {
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
        bio: `Passionate ${title.toLowerCase()} with expertise in modern technologies.`,
        skills: skills.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 5) + 2),
        connections: Math.floor(Math.random() * 5000) + 500,
        isVerified: Math.random() > 0.7
      };
    });
  }, [location]);

  // Filter and sort professionals
  const filteredProfessionals = useMemo(() => {
    let filtered = allProfessionals.filter(prof => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          prof.name.toLowerCase().includes(query) ||
          prof.title.toLowerCase().includes(query) ||
          prof.company.toLowerCase().includes(query) ||
          prof.bio?.toLowerCase().includes(query);
        
        if (!matchesSearch) return false;
      }

      // Platform filter
      if (selectedPlatforms.length > 0 && !selectedPlatforms.includes(prof.platform)) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'connections':
          return (b.connections || 0) - (a.connections || 0);
        case 'recent':
          return Math.random() - 0.5;
        default:
          return 0;
      }
    });

    return filtered;
  }, [allProfessionals, searchQuery, selectedPlatforms, sortBy]);

  useEffect(() => {
    onResultsCount(filteredProfessionals.length);
  }, [filteredProfessionals.length, onResultsCount]);

  const totalPages = Math.ceil(filteredProfessionals.length / profilesPerPage);
  const startIndex = (currentPage - 1) * profilesPerPage;
  const currentProfiles = filteredProfessionals.slice(startIndex, startIndex + profilesPerPage);

  if (!location) return null;

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg lg:text-xl font-bold text-foreground truncate">
            Professional Network in {location}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredProfessionals.length} professionals found
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-shrink-0"
          onClick={() => {
            toast({
              title: "Export Started",
              description: "Preparing your professional network data...",
              duration: 3000,
            });
          }}
        >
          <Download className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Export Results</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </div>

      {/* Profile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {currentProfiles.map((professional, index) => (
          <ProfileCard
            key={professional.id}
            professional={professional}
            index={index}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 lg:mt-8">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0 text-sm"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm"
            >
              Next
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Showing {((currentPage - 1) * profilesPerPage) + 1}-{Math.min(currentPage * profilesPerPage, filteredProfessionals.length)} of {filteredProfessionals.length} results
          </div>
        </div>
      )}
    </div>
  );
};