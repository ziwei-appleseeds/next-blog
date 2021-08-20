import { useRouter } from "next/dist/client/router";
import { useQuery } from "react-query";
import Link from "next/link";
import Head from "next/head";

const fetchPost = (id) => {
  return fetch("https://jsonplaceholder.typicode.com/posts/" + id).then(
    (res) => {
      return res.json();
    }
  );
};

const useFetchPost = (id, initialData) => {
  const query = useQuery(["posts", id], () => fetchPost(id), {
      initialData
  });

  return query;
};

export default function Post(props) {
  const router = useRouter();
  const id = router.query.id;
  const post = useFetchPost(id, props.post);

  if (post.isLoading) {
    return <p>loading...</p>;
  }
  if (post.isError) {
    return <p>Error</p>;
  }
  return (
    <div>
      <Head>
        <title>{post.data ? post.data.title : null} </title>
      </Head>
      <Link href="/">Back</Link>
      <h1>{post.data ? post.data.title : null} </h1>
      <p>{post.data ? post.data.body : null} </p>
    </div>
  );
}

export async function getServerSideProps(context){
    const {id} = context.query;
    const post = await fetchPost(id);

    return {
        props:{
            post
        }
    }
}