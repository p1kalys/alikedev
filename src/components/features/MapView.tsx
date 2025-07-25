import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minimize2, Maximize2, MapPin, Navigation, Globe2 } from "lucide-react";

interface MapViewProps {
  location: string | null;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

export const MapView = ({ location, isVisible, onToggleVisibility }: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Note: In a real implementation, you would get this from environment variables
  // For demo purposes, we'll show a placeholder message
  const MAPBOX_TOKEN = "your-mapbox-token-here";

  useEffect(() => {
    if (!mapContainer.current || !isVisible) return;

    // For demo purposes without actual Mapbox token
    if (MAPBOX_TOKEN === "your-mapbox-token-here") {
      return;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: 2,
        center: [0, 20],
        projection: { name: 'globe' }
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(255, 255, 255)',
          'high-color': 'rgb(200, 200, 225)',
          'horizon-blend': 0.02,
        });
      });

      // Cleanup
      return () => {
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!map.current || !location) return;

    setIsLoading(true);
    
    // Simulate geocoding and map animation
    setTimeout(() => {
      // For demo purposes, we'll use some preset coordinates
      const demoCoordinates: { [key: string]: [number, number] } = {
        'san francisco': [-122.4194, 37.7749],
        'new york': [-74.0060, 40.7128],
        'london': [-0.1276, 51.5074],
        'berlin': [13.4050, 52.5200],
        'toronto': [-79.3832, 43.6532],
        'sydney': [151.2093, -33.8688],
      };

      const searchKey = location.toLowerCase().split(',')[0];
      const coordinates = demoCoordinates[searchKey] || [0, 0];

      if (map.current) {
        map.current.flyTo({
          center: coordinates,
          zoom: 10,
          duration: 2000,
          essential: true
        });

        // Add marker
        new mapboxgl.Marker({
          color: '#3b82f6'
        })
          .setLngLat(coordinates)
          .addTo(map.current);
      }

      setIsLoading(false);
    }, 1000);
  }, [location]);

  if (!isVisible) {
    return (
      <Card className="p-4 bg-card border border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Map View</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleVisibility}
            className="h-8"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative bg-card border border-border overflow-hidden animate-scale-in">
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-card/90 backdrop-blur border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {location ? `Exploring ${location}` : 'World Map'}
            </span>
            {isLoading && (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleVisibility}
            className="h-8"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-96 relative">
        {MAPBOX_TOKEN === "your-mapbox-token-here" ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-surface">
            <Card className="p-8 text-center max-w-md mx-4">
              <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Interactive Map</h3>
              <p className="text-sm text-muted-foreground mb-4">
                To enable the interactive map feature, you'll need to add your Mapbox access token.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a 
                  href="https://docs.mapbox.com/help/getting-started/access-tokens/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Get Mapbox Token
                </a>
              </Button>
            </Card>
          </div>
        ) : (
          <div 
            ref={mapContainer} 
            className="w-full h-full animate-map-zoom"
          />
        )}
      </div>

      {/* Map Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur border-t border-border p-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Professional networks worldwide</span>
          <span className="flex items-center gap-1">
            <Globe2 className="w-3 h-3" />
            Global view
          </span>
        </div>
      </div>
    </Card>
  );
};