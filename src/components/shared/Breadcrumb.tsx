import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="py-4">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
                {/* Home */}
                <li>
                    <Link
                        to="/"
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                        <Home className="w-3.5 h-3.5" />
                        <span>Home</span>
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={index} className="flex items-center gap-1.5">
                            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-muted-foreground/50" />
                            {isLast || !item.href ? (
                                <span className="text-foreground font-medium truncate max-w-[200px]">
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.href}
                                    className="hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
