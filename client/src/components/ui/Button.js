import React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";


const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shdow-sm focus:ring-primary-500',
    secondary: 'bg-white text-neutral-900 border border-neutral-200 hover:bg-neutral-50 shadow-sm',
    ghost: 'bg-transparent tet-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
    danger: 'bg-danger text-white hover:opacity-90 shadow-sm',
};

const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-8 text-lg',
};

const Button = React.forwardRef(({
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    disabled,
    type = 'button',
    ...props 
}, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            disabled={disabled || isLoading}
            className={cn(
                'relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {/* Show spinner if loading */}
            {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };