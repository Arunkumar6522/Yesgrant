import DOMPurify from 'dompurify';

class BlogService {
  constructor() {
    this.blogUrl = 'https://yesgrant.blogspot.com';
  }

  async fetchPosts() {
    try {
      // Fetch the RSS feed and convert it to JSON using a public RSS to JSON API
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(this.blogUrl + '/feeds/posts/default?alt=rss')}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await response.json();
      return this.processPosts(data.items || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  async fetchPostById(postId) {
    try {
      // Fetch all posts and find the one with matching ID
      const posts = await this.fetchPosts();
      const post = posts.find(p => p.id === postId);
      
      if (!post) {
        throw new Error('Post not found');
      }

      return post;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }

  processPosts(posts) {
    return posts.map(post => this.processPost(post));
  }

  processPost(post) {
    // Extract first image from content or use default
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = post.content || post.description;
    const firstImage = tempDiv.querySelector('img');
    const imageUrl = firstImage?.src || post.thumbnail || '/path/to/default-blog-image.jpg';

    // Remove the first image from content if it exists and it's the thumbnail
    if (firstImage && firstImage.src === post.thumbnail) {
      firstImage.remove();
    }

    // Create excerpt by removing HTML and limiting length
    const textContent = tempDiv.textContent || '';
    const excerpt = textContent.slice(0, 150) + (textContent.length > 150 ? '...' : '');

    // Sanitize content
    const sanitizedContent = DOMPurify.sanitize(post.content || post.description, {
      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'img', 'blockquote'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel', 'class'],
    });

    // Extract post ID from the URL
    const urlParts = (post.link || '').split('/');
    const id = urlParts[urlParts.length - 1] || post.guid;

    // Get author name without email
    const authorName = this.getAuthorName(post.author);

    return {
      id: id,
      title: post.title,
      content: sanitizedContent,
      excerpt: excerpt,
      image: imageUrl,
      author: authorName,
      date: new Date(post.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      url: post.link,
      labels: post.categories || []
    };
  }

  getAuthorName(author) {
    // If the author is in the format "email@domain.com (Name)"
    if (author.includes('noreply@blogger.com')) {
      return 'YesGrant Team';
    }
    
    // If there's a name in parentheses, extract it
    const nameMatch = author.match(/\((.*?)\)/);
    if (nameMatch) {
      return nameMatch[1];
    }

    // Remove email if present
    const emailRemoved = author.split('@')[0];
    
    // Capitalize first letter of each word
    return emailRemoved
      .split('.')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getReadingTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

export default new BlogService(); 