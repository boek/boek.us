/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";

const postsDirectory = './posts'

interface Post {
  title: string;
  content: string;
}

export const handler: Handlers<Post[]> = {
  async GET(req, ctx) {
    const posts: Post[] = []

    for await (const dirEntry of Deno.readDir(postsDirectory)) {
      const contents = await Deno.readTextFile(`${postsDirectory}/${dirEntry.name}`)
      console.log(contents)
      posts.push({ title: dirEntry.name, content: contents })
    }
    console.log(posts)
    return ctx.render(posts);
  },
};

export default function Home({ data }: PageProps<Post[] | null>) {
  if (!data) {
    return <span>No posts!</span>;
  }

  return (
    <ul class={tw`bg-red-500`}>
      {data.map((post) => <span>title: {post.title}</span>)}
    </ul>
  );
}
