type Project = {
    userName: string;
    id: number;
    title: string;
  };

  
export type projectModalData = {
    project: string;
    technologyList: string;
    projectList: Project[],
    updatedField: {
    technologies: string[];
    associatedEmployees?: string[],
    id: number,
    title: string
  }
}
