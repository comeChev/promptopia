import Feed from "@components/Feed";

const Home = async () => {
  const data = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt`, {
    cache: "no-cache",
  }).then((response) => response.json());

  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        {`Discover & Share `}
        <br className="md:hidden" />
        <span className="orange_gradient text-center">AI-powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts.
      </p>

      {/* Feed */}
      <Feed data={data} />
    </section>
  );
};

export default Home;
