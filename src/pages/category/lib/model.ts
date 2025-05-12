export interface PayloadCategory {
  data: {
    name: string;
  };
}

export interface PayloadUpdateCategory {
  documentId: string;
  data: {
    name: string;
  };
}

export interface CategoryResponse {
  id: number;
  documentId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}
