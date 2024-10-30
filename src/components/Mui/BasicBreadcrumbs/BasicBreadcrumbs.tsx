import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';


// defaults
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
};

const links = [
    {
        name: 'Home',
        path: '/'
    }
];

// render
export default function BasicBreadcrumbs(props?: {
    links?: any;
    handleClick?: any;
    [key: string]: any;
}) {
    let breadcrumbs = (props?.links || links);
    return (
        <div role="presentation" onClick={props?.handleClick || handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography sx={{ color: 'text.primary' }}>Home</Typography>
                {breadcrumbs && breadcrumbs.map((link: any) => (
                    <Link
                        key={link.name}
                        underline="hover"
                        color="inherit"
                        // href={link.path}
                    >
                        {link.name}
                    </Link>
                ))}
            </Breadcrumbs>
        </div>
    );
};
