// Blog data types and utilities
export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogTag {
  id: string;
  name: string;
}

export interface BlogPostMeta {
  readTime: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
}

export const blogCategories: BlogCategory[] = [
  {
    id: "installation",
    name: "Installation",
    description: "Installation guides and techniques",
    color: "#E17055"
  },
  {
    id: "remodelling",
    name: "Remodelling",
    description: "Renovation and remodelling tips",
    color: "#00B894"
  },
  {
    id: "3d-design",
    name: "3D Design",
    description: "Design trends and visualization",
    color: "#FDCB6E"
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "Care and maintenance guides",
    color: "#636E72"
  },
  {
    id: "trends",
    name: "Trends",
    description: "Latest industry trends and news",
    color: "#6C5CE7"
  }
];

export const blogAuthors: BlogAuthor[] = [
  {
    id: "expert-team",
    name: "Elegance Stone Team",
    role: "Stone Experts",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
  }
];

export const getBlogCategoryById = (categoryId: string): BlogCategory | undefined => {
  return blogCategories.find(category => category.id === categoryId);
};

export const getBlogAuthorById = (authorId: string): BlogAuthor | undefined => {
  return blogAuthors.find(author => author.id === authorId);
};

export const formatReadTime = (minutes: number): string => {
  return `${minutes} min read`;
};

export const formatPublishDate = (date: Date | string): string => {
  const publishDate = typeof date === 'string' ? new Date(date) : date;
  return publishDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getRelatedPosts = (currentPostId: string, category: string, limit: number = 3) => {
  // This would typically fetch related posts from an API
  // Implementation depends on the backend data source
  return [];
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const extractExcerpt = (content: string, maxLength: number = 160): string => {
  // Remove HTML tags and extract plain text excerpt
  const plainText = content.replace(/<[^>]*>/g, '');
  if (plainText.length <= maxLength) return plainText;
  
  const truncated = plainText.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
};
