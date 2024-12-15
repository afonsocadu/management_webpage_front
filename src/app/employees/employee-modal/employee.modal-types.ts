export type employee = {
  technologies: string[]; id: number, project: string, user_name: string 
}
  
export type employeeModalData = {
    employee: employee;
    projectList: string[];
    technologyList: string[]
}