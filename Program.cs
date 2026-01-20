namespace PortfolioWebsite
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var options = new WebApplicationOptions
            {
                Args = args,
                WebRootPath = "docs"
            };

            var builder = WebApplication.CreateBuilder(options);
            var app = builder.Build();

            // Serve default documents (index.html) and static files from docs/
            app.UseDefaultFiles();
            app.UseStaticFiles();

            app.Run();
        }
    }
}
