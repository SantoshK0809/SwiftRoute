import React from "react";
import { MapPin } from "lucide-react";

const LocationSearchPanel = ({ suggestions, setPanelOpen, setVehiclePanel, selectSuggestion }) => {
  return (
    <div className="flex flex-col gap-2 py-2">
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            onClick={() => {
              selectSuggestion(suggestion);
              setPanelOpen(true)
            }}
            className="flex items-start gap-3  active:border-blue-400 border-2 border-gray-500 p-3 rounded-xl hover:bg-white/10 transition cursor-pointer"
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-500/10">
              <MapPin className="text-black" size={16} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{suggestion.description}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-3 text-center text-gray-400">
          {suggestions.length === 0 && suggestions !== undefined ? "No suggestions found" : "Start typing to see suggestions"}
        </div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
