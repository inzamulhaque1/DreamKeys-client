

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
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Latest Articles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img className="p-4 rounded-3xl" src={article.imageUrl} alt="" />
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <span className="text-sm text-gray-500 mb-4 block">{article.date} | {article.category}</span>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <a href={article.link} className="text-blue-600 hover:text-blue-800 font-medium">
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
