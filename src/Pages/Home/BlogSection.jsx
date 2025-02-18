const BlogSection = () => {
  const articles = [
    {
      title: "Top 5 Tips for First-Time Homebuyers",
      category: "Tips",
      date: "January 10, 2025",
      imageUrl: "https://i.ytimg.com/vi/epeNq-5r8OY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDbBqE1VqMt0JqLZQXWwrgtSMdlSQ",
      description:
        "Discover key tips to help you navigate the homebuying process with ease and confidence. Perfect for first-time buyers.",
      link: "/articles/tips-for-first-time-homebuyers",
    },
    {
      title: "How to Prepare Your Home for Sale",
      category: "How-Tos",
      date: "January 5, 2025",
      imageUrl: "https://dnggalvin.ie/wp-content/uploads/2022/05/Light-Green-Tan-Gold-Home-Staging-Real-Estate-Social-Media.png",
      description:
        "Learn the steps you need to take to prepare your home for sale, ensuring it stands out in the market and attracts the right buyers.",
      link: "/articles/how-to-prepare-your-home-for-sale",
    },
    {
      title: "Real Estate Market Trends in 2025",
      category: "Industry News",
      date: "December 20, 2024",
      imageUrl: "https://www.noradarealestate.com/wp-content/uploads/2024/09/real-estate-market-predictions-2025.jpeg",
      description:
        "Stay updated on the latest trends and forecasts in the real estate market for 2025. Know what to expect in the coming year.",
      link: "/articles/real-estate-market-trends-2025",
    },
  ];

  return (
    <section className="bg-gray-100 dark:bg-[#0B0716] md:py-24">
      <div className="container mx-auto px-4">
        {/* Heading and Subheading */}
        <div className="text-center mb-12">
          <h2 className="exo2 text-4xl font-bold text-blue-800 dark:text-white mb-4">
            Insights & Inspiration
          </h2>
          <p className="libre text-lg text-gray-600 dark:text-gray-300">
            Explore our latest articles to stay informed and inspired in your real estate journey.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1C1B23] p-6 rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500 transition-shadow duration-300"
            >
              <img
                className="w-full h-48 object-cover rounded-lg mb-4"
                src={article.imageUrl}
                alt={article.title}
              />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {article.title}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400 mb-4 block">
                {article.date} | {article.category}
              </span>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.description}
              </p>
              <a
                href={article.link}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 font-medium"
              >
                Read More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;