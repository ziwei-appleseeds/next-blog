import Head from "next/head";
import { useQuery } from "react-query";
import Link from "next/link";

const fetchPosts = () => {
  return fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
    return res.json();
  });
};

const useFetchPosts = () => {
  const query = useQuery("posts", () => fetchPosts(), {});

  return query;
};

export default function Home() {
  const posts = useFetchPosts();

  if (posts.isLoading) {
    return <p>loading...</p>;
  }
  if (posts.isError) {
    return <p>Error</p>;
  }
  return (
    <div>
      <Head>
        <title>Zi Wei's Blog</title>
      </Head>
      <main>
        <h1>Welcome to my blog</h1>

        {posts?.data ? (
          posts.data.map((item) => (
            <h2 key={item.id}>
              <Link href={`/posts/${item.id}`}>{item.title}</Link>
            </h2>
          ))
        ) : (
          <p>Empty</p>
        )}
      </main>
    </div>
  );
}
