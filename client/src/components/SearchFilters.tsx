import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Room } from "@shared/schema";

interface SearchFiltersProps {
  rooms: Room[];
  onSearch: (query: string) => void;
  onFilter: (type: string, room: string) => void;
}

export default function SearchFilters({ rooms, onSearch, onFilter }: SearchFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRoom, setSelectedRoom] = useState("all");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleTypeChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    setSelectedType(filterValue);
    onFilter(filterValue, selectedRoom);
  };

  const handleRoomChange = (value: string) => {
    const filterValue = value === "all" ? "" : value;
    setSelectedRoom(filterValue);
    onFilter(selectedType, filterValue);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedRoom("all");
    onSearch("");
    onFilter("", "");
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar por tema, ponente o actividad..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 py-3 focus:ring-2 focus:ring-honey-500 focus:border-transparent"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger className="w-[180px] py-3 focus:ring-2 focus:ring-honey-500">
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="conferencia">Conferencias</SelectItem>
                <SelectItem value="taller">Talleres</SelectItem>
                <SelectItem value="panel">Paneles</SelectItem>
                <SelectItem value="registracion">Registro</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedRoom} onValueChange={handleRoomChange}>
              <SelectTrigger className="w-[180px] py-3 focus:ring-2 focus:ring-honey-500">
                <SelectValue placeholder="Todas las salas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las salas</SelectItem>
                {rooms.map((room) => (
                  <SelectItem key={room.id} value={room.id.toString()}>
                    {room.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleClearFilters}
              className="px-6 py-3 bg-honey-500 text-white hover:bg-honey-600 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Limpiar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
