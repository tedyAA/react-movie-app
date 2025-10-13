
export interface DataTypes {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  name: string;
  backdrop_path:string;
  media_type:string
  release_date:string
  first_air_date:string
  genre_ids?: number[]
}

export interface ItemsCategory {
  apiEndpoint: string;
  itemHeading: string;

}

//* helper function to get the categories
export const createDisplayItems = (
  apiEndpoint: string,
  itemHeading: string,

): ItemsCategory => ({
  apiEndpoint: `${apiEndpoint}`,
  itemHeading,
});

  //!Function to change the date format
  export function getFormattedDate(dateString: string | number | Date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    } as Intl.DateTimeFormatOptions;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }


