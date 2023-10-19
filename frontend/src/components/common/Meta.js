import Head from "next/head";

const Meta = ({ title, description, keywords }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/images/logo.png" />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Devcent",
  keywords: "Developing Worldclass Tech Talent at Devcent",
  description:
    "Our Trainings are designed to help you learnfrom the best industry experts around.",
};
export default Meta;
