import { ExternalLink, MapPin, Linkedin, Twitter, Github, Globe, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface Professional {
  id: string;
  name: string;
  title: string;
  location: string;
  platform: 'linkedin' | 'twitter' | 'github' | 'behance';
  profileUrl: string;
  imageUrl?: string;
  bio?: string;
  skills?: string[];
  connections?: number;
  isVerified?: boolean;
}

interface ProfileCardProps {
  professional: Professional;
  index: number;
}

const platformIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  behance: Globe
};

const platformColors = {
  linkedin: "bg-blue-600 text-white",
  twitter: "bg-slate-900 dark:bg-white text-white dark:text-slate-900",
  github: "bg-slate-900 dark:bg-white text-white dark:text-slate-900",
  behance: "bg-blue-500 text-white"
};

export const ProfileCard = ({ professional, index }: ProfileCardProps) => {
  const PlatformIcon = platformIcons[professional.platform];
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card 
      className="p-4 lg:p-6 bg-card border border-border hover:border-primary/20 hover-lift profile-card-enter cursor-pointer group transition-all duration-200"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => window.open(professional.profileUrl, '_blank', 'noopener,noreferrer')}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3 lg:mb-4">
        <div className="flex items-center gap-2 lg:gap-3 min-w-0 flex-1">
          <Avatar className="w-10 h-10 lg:w-12 lg:h-12 flex-shrink-0">
            <AvatarImage src={professional.imageUrl} alt={professional.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground font-medium text-sm lg:text-base">
              {getInitials(professional.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 lg:gap-2">
              <h3 className="font-semibold text-sm lg:text-base text-foreground truncate">{professional.name}</h3>
              {professional.isVerified && (
                <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 fill-current flex-shrink-0" />
              )}
            </div>
            <p className="text-xs lg:text-sm text-muted-foreground truncate">{professional.title}</p>
          </div>
        </div>
        
        {/* Platform Badge */}
        <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${platformColors[professional.platform]}`}>
          <PlatformIcon className="w-3 h-3 lg:w-4 lg:h-4" />
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 mb-3">
        <MapPin className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{professional.location}</span>
      </div>

      {/* Bio */}
      {professional.bio && (
        <p className="text-xs lg:text-sm text-muted-foreground mb-3 lg:mb-4 line-clamp-2 leading-relaxed">
          {professional.bio}
        </p>
      )}

      {/* Skills */}
      {professional.skills && professional.skills.length > 0 && (
        <div className="mb-3 lg:mb-4">
          <div className="flex flex-wrap gap-1">
            {professional.skills.slice(0, 3).map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary" 
                className="text-xs bg-secondary-muted text-secondary-foreground border-0 px-2 py-0.5"
              >
                {skill}
              </Badge>
            ))}
            {professional.skills.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-xs text-muted-foreground border-border px-2 py-0.5"
              >
                +{professional.skills.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Stats & Actions */}
      <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-border">
        <div className="flex items-center gap-2 lg:gap-4 text-xs text-muted-foreground min-w-0">
          {professional.connections && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{professional.connections.toLocaleString()}</span>
            </div>
          )}
          <span className="capitalize truncate">{professional.platform}</span>
        </div>
        
        <Button
          size="sm"
          variant="outline"
          className="h-7 lg:h-8 px-2 lg:px-3 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            window.open(professional.profileUrl, '_blank', 'noopener,noreferrer');
          }}
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">Connect</span>
          <span className="sm:hidden">Go</span>
        </Button>
      </div>
    </Card>
  );
};