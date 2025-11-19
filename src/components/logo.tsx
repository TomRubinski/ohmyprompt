export function Logo({ className = "h-8 w-8" }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" className="text-primary fill-primary/20" />
            <path d="M12 12L2 12" className="text-primary" />
            <path d="M12 12L12 22" className="text-primary" />
            <circle cx="12" cy="12" r="2" className="fill-primary text-primary" />
        </svg>
    )
}
