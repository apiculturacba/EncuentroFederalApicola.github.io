import Header from "@/components/Header";
import Hero from "@/components/Hero";
// Removed SearchFilters import
import DayTabs from "@/components/DayTabs";
import ActivityCard from "@/components/ActivityCard";
import InfoCards from "@/components/InfoCards";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { ActivityWithDetails } from "@shared/schema";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(1);
  // Removed search and filter functionality

  const { data: activities = [], isLoading } = useQuery<ActivityWithDetails[]>({
    queryKey: ["/api/activities"],
  });

  const { data: rooms = [] } = useQuery({
    queryKey: ["/api/rooms"],
  });

  // Filter activities based on selected day only
  const filteredActivities = activities.filter(activity => activity.day === selectedDay);

  // Removed search and filter handlers

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DayTabs selectedDay={selectedDay} onDayChange={setSelectedDay} />
        
        <div id="actividades">
          {isLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6">
                  <Skeleton className="h-4 w-20 mb-4" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
              {filteredActivities.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No se encontraron actividades que coincidan con los filtros seleccionados.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        <InfoCards />
      </main>
      
      <Footer />
    </div>
  );
}
