import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(({ className, type, label, error, ...props }, ref) => {
    return (
        <div className="w-full space-y-2">
            {/* Label only renders if provided */}
            {label && (
                <label className="text-sm font-medium leading-none text-neutral-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </label>
            )}

            <input
                type={type}
                className={cn(
                    "flex h-10 w-full rounded-md border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 disbled:cursor-not-allowed disabled:opacity-50",
                    error && "border-danger focus:ring-danger",
                    className
                )}
                ref={ref}
                {...props}
            />

            {/* Error message slot */}
            {error && (
                <p className="text-sm font-medium text-danger animate-slide-up">
                    {error}
                </p>
            )}
        </div>
    );
})

Input.displayName = 'Input';

export { Input };