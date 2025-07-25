import { useState } from "react";
import { Search, Filter, X, Linkedin, Twitter, Github, Globe, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedPlatforms: string[];
  onPlatformToggle: (platform: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

const platforms = [
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-600' },
  { id: 'twitter', name: 'X (Twitter)', icon: Twitter, color: 'text-slate-900 dark:text-white' },
  { id: 'github', name: 'GitHub', icon: Github, color: 'text-slate-900 dark:text-white' },
  { id: 'behance', name: 'Behance', icon: Globe, color: 'text-blue-500' },
];

const sortOptions = [
  { value: 'relevance', label: 'Most Relevant' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'connections', label: 'Most Connections' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

export const FilterPanel = ({
  searchQuery,
  onSearchChange,
  selectedPlatforms,
  onPlatformToggle,
  sortBy,
  onSortChange,
  totalResults
}: FilterPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const clearFilters = () => {
    onSearchChange('');
    selectedPlatforms.forEach(platform => onPlatformToggle(platform));
    onSortChange('relevance');
  };

  const hasActiveFilters = searchQuery || selectedPlatforms.length > 0 || sortBy !== 'relevance';

  return (
    <Card className="bg-card border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Filters</span>
            {totalResults > 0 && (
              <Badge variant="secondary" className="bg-primary-muted text-primary text-xs">
                {totalResults.toLocaleString()}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-7 w-7 p-0"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Search Profiles</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, title, company..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-surface border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSearchChange('')}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Platforms</label>
            <div className="space-y-2">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                const isSelected = selectedPlatforms.includes(platform.id);
                
                return (
                  <div
                    key={platform.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onPlatformToggle(platform.id)}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => onPlatformToggle(platform.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Icon className={`w-4 h-4 ${platform.color}`} />
                      <span className="text-sm text-foreground">{platform.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sort By */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Sort By</label>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="bg-surface border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Active Filters</label>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <Badge 
                    variant="secondary" 
                    className="bg-primary-muted text-primary border-0 pr-1"
                  >
                    Search: {searchQuery}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSearchChange('')}
                      className="h-4 w-4 p-0 ml-1 hover:bg-primary/20"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
                {selectedPlatforms.map((platformId) => {
                  const platform = platforms.find(p => p.id === platformId);
                  if (!platform) return null;
                  
                  return (
                    <Badge 
                      key={platformId}
                      variant="secondary" 
                      className="bg-secondary-muted text-secondary border-0 pr-1"
                    >
                      {platform.name}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPlatformToggle(platformId)}
                        className="h-4 w-4 p-0 ml-1 hover:bg-secondary/20"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  );
                })}
                {sortBy !== 'relevance' && (
                  <Badge 
                    variant="secondary" 
                    className="bg-accent-muted text-accent border-0 pr-1"
                  >
                    {sortOptions.find(s => s.value === sortBy)?.label}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSortChange('relevance')}
                      className="h-4 w-4 p-0 ml-1 hover:bg-accent/20"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};