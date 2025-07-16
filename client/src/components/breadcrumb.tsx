import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-stone-gray">
      <Link href="/" className="flex items-center hover:text-stone-bronze transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4" />
          {item.href && index < items.length - 1 ? (
            <Link href={item.href} className="hover:text-stone-bronze transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="text-stone-dark font-medium">{item.name}</span>
          )}
        </div>
      ))}
    </nav>
  );
}