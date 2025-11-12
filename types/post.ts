export interface Post {
  id: string;
  title: string;
  description: string;
  mediaUrl: string | null;
  mediaType: string | null;
  createdAt: Date;
  school: {
    officialName: string | null;
    user: {
      name: string;
      image: string | null;
    };
  };
}