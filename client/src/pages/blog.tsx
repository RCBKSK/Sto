import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, User } from "lucide-react";
import { useState } from "react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const categories = ["All", "Installation", "Remodelling", "3D Design", "Maintenance", "Trends"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-stone-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-stone-dark mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl text-stone-gray max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights in natural stone design 
              and installation from our expert team.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-stone-gray" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-bronze mx-auto"></div>
              <p className="mt-4 text-stone-gray">Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-stone-gray">No articles found matching your criteria.</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {filteredPosts.length > 0 && (
                <div className="mb-12">
                  <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      <div className="relative">
                        <img 
                          src={filteredPosts[0].image}
                          alt={filteredPosts[0].title}
                          className="w-full h-64 lg:h-full object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-stone-bronze text-white">
                          Featured
                        </Badge>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center text-sm text-stone-gray mb-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(filteredPosts[0].publishedAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                          <span className="mx-2">•</span>
                          <Badge variant="outline" className="text-stone-bronze border-stone-bronze">
                            {filteredPosts[0].category}
                          </Badge>
                        </div>
                        <h2 className="text-3xl font-bold text-stone-dark mb-4 hover:text-stone-bronze transition-colors cursor-pointer">
                          {filteredPosts[0].title}
                        </h2>
                        <p className="text-stone-gray mb-6 leading-relaxed">
                          {filteredPosts[0].excerpt}
                        </p>
                        <Button className="bg-stone-bronze hover:bg-orange-600 text-white w-fit">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post) => (
                  <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                    <div className="relative">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 right-4 bg-stone-bronze text-white">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-stone-gray mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-stone-dark mb-3 group-hover:text-stone-bronze transition-colors cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-stone-gray text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <Button size="sm" className="bg-stone-bronze hover:bg-orange-600 text-white">
                        Read More
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-stone-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest articles, design tips, 
            and industry insights directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input 
              placeholder="Enter your email"
              className="bg-white text-stone-dark"
            />
            <Button className="bg-stone-bronze hover:bg-orange-600 text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
