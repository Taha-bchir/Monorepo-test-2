import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, ...other }: ButtonProps): React.ReactNode {
    return (
        <button type="button" {...other}>
            {children}
        </button>
    );
}
