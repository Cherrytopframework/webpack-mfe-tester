import React from 'react';

export const Styled = {
    Grid: (
        { children, ...props }:
        { children: React.ReactNode, [key: string]: any }
    ) => (
        <div
            {...props}
            style={{
                width: (!props?.container && props?.size)
                    ? (((props.size / 12.2) * 100).toFixed(2).toString() + "%")
                    : "100%",
                // margin: "0 16px",
                ...props?.container && {
                    marginTop: "100px", 
                    display: "flex", 
                    flexWrap: "wrap", 
                    maxWidth: "100vw",
                    padding: "16px",
                    gap: "16px"
                },
                ...props.style, 
                ...props.sx 
            }}
        >
            {children}
        </div>
    )
};
