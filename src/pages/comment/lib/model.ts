export interface PayloadComment {
  data: {
    content: string;
    article: number
  };
}

export interface PayloadUpdateComment {
  documentId: string;
  data: {
    content: string;
  };
}


export interface CommentResponse {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}
