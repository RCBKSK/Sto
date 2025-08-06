import React, { useState, useRef, useEffect } from 'react';
import { useCMS } from '@/contexts/cms-context';
import { Button } from '@/components/ui/button';
import { Save, Edit2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditableContentProps {
  pageName: string;
  sectionKey: string;
  defaultContent?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  placeholder?: string;
  multiline?: boolean;
  children?: React.ReactNode;
}

export function EditableContent({
  pageName,
  sectionKey,
  defaultContent = '',
  className = '',
  as: Component = 'div',
  placeholder = 'Click to edit...',
  multiline = true,
  children,
}: EditableContentProps) {
  const { isEditMode, getContent, updateContent } = useCMS();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  // Get content from CMS or use default
  const cmsContent = getContent(pageName, sectionKey);
  const displayContent = cmsContent || defaultContent;

  useEffect(() => {
    setContent(displayContent);
  }, [displayContent]);

  const handleEdit = () => {
    setIsEditing(true);
    setContent(displayContent);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        if (multiline && inputRef.current instanceof HTMLTextAreaElement) {
          inputRef.current.style.height = 'auto';
          inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
        }
      }
    }, 0);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateContent(pageName, sectionKey, content);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save content:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setContent(displayContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    } else if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    }
  };

  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  if (!isEditMode) {
    // Normal display mode
    if (children) {
      return <>{children}</>;
    }
    
    return React.createElement(Component, {
      className,
      dangerouslySetInnerHTML: { __html: displayContent || defaultContent },
    });
  }

  // Edit mode
  return (
    <div
      className={cn(
        'relative group transition-all duration-200',
        isEditMode && 'hover:ring-2 hover:ring-blue-300 hover:ring-opacity-50 rounded-sm',
        isEditing && 'ring-2 ring-blue-500 rounded-sm',
        className
      )}
    >
      {!isEditing ? (
        <>
          <Component
            ref={contentRef}
            className={cn(
              'cursor-pointer transition-all',
              !displayContent && 'text-gray-400 italic'
            )}
            onClick={handleEdit}
            dangerouslySetInnerHTML={{
              __html: displayContent || `<span class="text-gray-400 italic">${placeholder}</span>`,
            }}
          />
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="outline"
              className="h-6 w-6 p-0"
              onClick={handleEdit}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-2">
          {multiline ? (
            <textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={content}
              onChange={handleTextareaResize}
              onKeyDown={handleKeyDown}
              className={cn(
                'w-full p-2 border rounded resize-none overflow-hidden min-h-[40px]',
                'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              )}
              placeholder={placeholder}
            />
          ) : (
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                'w-full p-2 border rounded',
                'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              )}
              placeholder={placeholder}
            />
          )}
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="h-8"
            >
              <Save className="h-3 w-3 mr-1" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="h-8"
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}