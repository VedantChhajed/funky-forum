
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { categories } from '@/data/mockData';

const CreateThreadForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your thread.",
        variant: "destructive"
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Missing Category",
        description: "Please select a category for your thread.",
        variant: "destructive"
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Missing Content",
        description: "Please provide content for your thread.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Thread Created!",
      description: "Your thread has been successfully created.",
    });
    
    navigate('/category/' + categories.find(c => c.id === category)?.slug);
  };
  
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(currentTag.trim()) && tags.length < 5) {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag('');
      }
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <form onSubmit={handleSubmit} className="animate-slide-up">
      <div className="mb-4">
        <label htmlFor="title" className="block font-bold mb-2">Thread Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your thread a clear, descriptive title..."
          className="w-full p-3 border-2 border-black rounded-sm shadow-brutal-sm focus:outline-none focus:shadow-brutal transition-all duration-300"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="category" className="block font-bold mb-2">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border-2 border-black rounded-sm shadow-brutal-sm focus:outline-none focus:shadow-brutal bg-white transition-all duration-300"
        >
          <option value="">Select a category...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="content" className="block font-bold mb-2">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          rows={8}
          className="w-full p-3 border-2 border-black rounded-sm shadow-brutal-sm focus:outline-none focus:shadow-brutal transition-all duration-300"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="tags" className="block font-bold mb-2">Tags (up to 5, press Enter to add)</label>
        <input
          id="tags"
          type="text"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tags..."
          className="w-full p-3 border-2 border-black rounded-sm shadow-brutal-sm focus:outline-none focus:shadow-brutal transition-all duration-300"
        />
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <div 
                key={tag} 
                className="flex items-center bg-funky-blue/20 text-funky-blue px-2 py-1 rounded-sm border border-funky-blue animate-scale-in"
              >
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)} 
                  className="ml-1 hover:text-funky-red transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          onClick={() => navigate(-1)} 
          className="mr-2 neubrutal-button-orange"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="neubrutal-button"
        >
          Create Thread
        </Button>
      </div>
    </form>
  );
};

export default CreateThreadForm;
