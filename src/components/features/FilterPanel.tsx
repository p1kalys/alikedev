import { useState } from "react";
import { Search, Filter, SortAsc } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  { id: 'linkedin', name: 'LinkedIn', icon: Search, color: '#0077b5', count: 1243 },
  { id: 'twitter', name: 'X (Twitter)', icon: Search, color: '#1da1f2', count: 856 },
  { id: 'github', name: 'GitHub', icon: Search, color: '#333', count: 678 },
  { id: 'behance', name: 'Behance', icon: Search, color: '#1769ff', count: 432 },
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
  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Search */}
      <Card className="p-3 lg:p-4 bg-card border border-border">
        <div className="space-y-3">
          <h3 className="font-semibold text-sm lg:text-base text-foreground flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Professionals
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, title, skills..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 text-sm lg:text-base bg-background border-border focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </Card>

      {/* Platform Filters */}
      <Card className="p-3 lg:p-4 bg-card border border-border">
        <div className="space-y-3 lg:space-y-4">
          <h3 className="font-semibold text-sm lg:text-base text-foreground flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter by Platform
          </h3>
          <div className="space-y-2 lg:space-y-3">
            {platforms.map((platform) => (
              <div key={platform.id} className="flex items-center space-x-3">
                <Checkbox
                  id={platform.id}
                  checked={selectedPlatforms.includes(platform.id)}
                  onCheckedChange={() => onPlatformToggle(platform.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={platform.id}
                  className="flex items-center gap-2 text-sm text-foreground cursor-pointer flex-1 min-w-0"
                >
                  <platform.icon className="w-4 h-4 flex-shrink-0" style={{ color: platform.color }} />
                  <span className="truncate">{platform.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                    {platform.count.toLocaleString()}
                  </span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Sort Options */}
      <Card className="p-3 lg:p-4 bg-card border border-border">
        <div className="space-y-3 lg:space-y-4">
          <h3 className="font-semibold text-sm lg:text-base text-foreground flex items-center gap-2">
            <SortAsc className="w-4 h-4" />
            Sort by
          </h3>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="bg-background border-border text-sm lg:text-base">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="hover:bg-muted text-sm lg:text-base">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results Summary */}
      <Card className="p-3 lg:p-4 bg-primary/5 border border-primary/20">
        <div className="text-center">
          <div className="text-xl lg:text-2xl font-bold text-primary">{totalResults.toLocaleString()}</div>
          <div className="text-xs lg:text-sm text-muted-foreground">professionals found</div>
        </div>
      </Card>
    </div>
  );
};