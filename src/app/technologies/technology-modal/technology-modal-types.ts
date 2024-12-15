export type technology = {
    id: number;
    name: string;
  };

  
export type technologyModalData = {
    technologyList: technology[];
    updatedField: { id: number, name: string },
    created_at?: string,
    updated_at?: string
}