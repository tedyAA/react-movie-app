import React from "react";
import type { ItemsCategory } from "../modules/types_file.ts";
import CategorySection from "./CategorySection";

interface DisplayItemsProps {
    displayTags: ItemsCategory[];
    handleMovieClick: (movieId: number) => void;
}

const DisplayItems: React.FC<DisplayItemsProps> = ({ displayTags, handleMovieClick }) => {
    return (
        <>
            {Array.isArray(displayTags) &&
                displayTags.map(({ apiEndpoint, itemHeading }) => (
                    <CategorySection
                        key={apiEndpoint}
                        apiEndpoint={apiEndpoint}
                        itemHeading={itemHeading}
                        handleMovieClick={handleMovieClick}
                    />
                ))}
        </>
    );
};

export default DisplayItems;
