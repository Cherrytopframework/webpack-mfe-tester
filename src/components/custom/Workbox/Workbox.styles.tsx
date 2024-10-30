export const Styled = {
    Textarea: ({ children, ...props }: any) => (
        <textarea
            {...props}
            style={{
                minHeight: 300,
                height: "auto",
                width: '100%',
                backgroundColor: '#222',
                color: 'white',
                borderRadius: '8px',
                ...props?.style,
                ...props?.sx
            }}
        >
            {children}
        </textarea>
    ),
    Iframe: ({ children, ...props }: any) => (
        <iframe
            {...props}
            style={{
                minHeight: 300,
                height: "auto",
                width: '100%',
                ...props?.style,
                ...props?.sx
            }}
        >
            {children}
        </iframe>
    )
}