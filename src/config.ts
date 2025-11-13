export const config = {
  appUrl:
    process.env.NODE_ENV === "production"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
      : `http://localhost:3000`,
  githubUrl: "https://github.com/lehoanghai9/blog",
};

export const siteConfig = {
  name: "blog-hai",
  title: "Le Hoang Hai Blog",
  description:
    "Le Hoang Hai Blog",
  url: config.appUrl,
};
