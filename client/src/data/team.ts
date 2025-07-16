// Team member data types and utilities
export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  social: SocialLinks;
  expertise?: string[];
  yearsExperience?: number;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
}

// Team structure and organizational data
export const departments: Department[] = [
  {
    id: "leadership",
    name: "Leadership Team",
    description: "Executive leadership driving our company vision",
    members: []
  },
  {
    id: "design",
    name: "Design & Consultation",
    description: "Expert designers and consultants",
    members: []
  },
  {
    id: "installation",
    name: "Installation Team",
    description: "Skilled craftsmen and installation specialists",
    members: []
  },
  {
    id: "support",
    name: "Customer Support",
    description: "Dedicated support and service team",
    members: []
  }
];

export const getTeamMemberById = (id: string): TeamMember | undefined => {
  // Find team member across all departments
  for (const department of departments) {
    const member = department.members.find(m => m.id === id);
    if (member) return member;
  }
  return undefined;
};

export const getTeamMembersByDepartment = (departmentId: string): TeamMember[] => {
  const department = departments.find(d => d.id === departmentId);
  return department?.members || [];
};

export const getAllTeamMembers = (): TeamMember[] => {
  return departments.flatMap(department => department.members);
};

export const getLeadershipTeam = (): TeamMember[] => {
  return getTeamMembersByDepartment("leadership");
};
