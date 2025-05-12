export interface ArticleResponse {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  user: User;
  // any
  category: any;
  comments: any; 
  localizations: any;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface Document {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

export interface PayloadArticle {
  data: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  }
}

export interface PayloadUpdateArticle {
  documentId: string;
  data: {
    title: string;
    description: string;
    cover_image_url: string;
    category: number;
  }
}
