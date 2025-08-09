import { useEffect, useState } from "react";

// const API_URL = import.meta.env.VITE_API_URL;

const API_URL = "http://localhost:30001";

export interface IPost {
  id: string;
  title: string;
  content: string;
}

export function usePostsData() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(API_URL + "/api/posts");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return { posts, loading, error };
}
