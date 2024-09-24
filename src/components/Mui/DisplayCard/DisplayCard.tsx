import { Card, CardContent, CardMedia, Typography, Button, Chip, Stack, Link as MuiLink } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import DateTimeLabel from '../../custom/DateTimeLabel/DateTimeLabel';
import Image from '../../custom/layout/Image/Image';
// import { Styled } from './DisplayCard.styles';


const defaultCard = {
    "name": "DisplayCard",
    "icon": "home",
    "link": "#",
    "url": "#",
    "dev_url": "#",
    "repo": "#",
    "disabled": false,
    "category": "#",
    "tags": "#"
};

const DisplayCard = (props: { data?: any, onData?: any, [key: string]: any[] }) => {
    if (props?.onData) props?.onData(props?.data); // this helps with debugging
    if (!props?.data) props.data = defaultCard;
    return (
        // @ts-ignore
        <Card
            sx={{ 
                maxWidth: 345, 
                opacity: props?.disabled ? 0.5 : 1, 
                ...props?.sx 
            }}
            onClick={(props?.onClick && typeof props.onClick === "function") 
                ? () => (props as any).onClick(props?.data) 
                : () => {}
            }
        >
            <Image sx={{ height: 400 }} />
            <CardContent>
                {/* App Name */}
                <Typography gutterBottom variant="h5" component="div">
                    {props.data.name}
                </Typography>

                {/* Optional Links (e.g., url, dev_url) */}
                <Stack direction="row" spacing={2}>
                    {/* Display App Icon if available */}
                    {props.data.icon && (
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.data.icon}
                            alt={props.data.name}
                        />
                    )}

                    {props.data.url && (
                        <MuiLink href={props.data.url} target="_blank" rel="noopener noreferrer" underline="none">
                            <Button color="inherit" size="small" startIcon={<LinkIcon />}>
                                Live
                            </Button>
                        </MuiLink>
                    )}
                    {props.data.dev_url && (
                        <MuiLink href={props.data.dev_url} target="_blank" rel="noopener noreferrer" underline="none">
                            <Button color="inherit" size="small" startIcon={<LinkIcon />}>
                                Dev
                            </Button>
                        </MuiLink>
                    )}
                    {props.data.repo && (
                        <MuiLink href={props.data.repo} target="_blank" rel="noopener noreferrer" underline="none">
                            <Button color="inherit" size="small" startIcon={<GitHubIcon />}>
                                Repo
                            </Button>
                        </MuiLink>
                    )}
                </Stack>

                {/* Categories */}
                {props.data.category && (
                    <Stack direction="row" spacing={1}>
                        {props.data.category.map((cat: string) => (
                            <Chip key={cat} label={cat} variant="outlined" />
                        ))}
                    </Stack>
                )}

                {/* Tags */}
                {props.data.tags && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {props.data.tags.map((tag: string) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}

                <DateTimeLabel />
            </CardContent>
        </Card>
    );
};

export default DisplayCard;

