import { 
    Box, Card, CardContent, CardMedia, Typography, 
    Button, Chip, Stack, Link as MuiLink 
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import DateTimeLabel from '../../custom/DateTimeLabel/DateTimeLabel';
import Image from '../../custom/layout/Image/Image';
import ReusablePopover from '../../custom/ReusablePopover/ReusablePopover';
import QueryWrapper from '../../custom/wrappers/QueryWrapper';
// import { Styled } from './DisplayCard.styles';


const defaultCard= {
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

const isDevelopment = (process.env.NODE_ENV === "development");

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
            {props?.data?.thumbnail && (
                <Image 
                    {
                        ...props.data.thumbnail.startsWith("http")
                            ? { fullUrl: props.data.thumbnail }
                            : { url: props.data.thumbnail }
                    } 
                    sx={{ minHeight: 400 }}
                />
            )}
            <CardContent>
                {/* App Name */}
                <Typography gutterBottom variant="h5" component="div">
                    {props?.data?.name || ""}
                </Typography>

                {/* Optional Links (e.g., url, dev_url) */}
                <Stack spacing={2}>
                    {/* Display App Icon if available */}
                    {props?.data?.icon && (
                        <CardMedia
                            component="img"
                            // height="140"
                            image={props.data.icon}
                            alt={props?.data?.name || ""}
                        />
                    )}

                    <Box sx={{ display: 'flex', gap: 2}}>
                    {props?.data?.url && (
                        <Button 
                            color="inherit" 
                            size="small" 
                            startIcon={<LinkIcon />}
                            onClick={
                                props?.data?.liveLinkClick
                                ? () => (props as any).data.liveLinkClick(props.data)
                                : () => {}
                            }
                        >
                            Live
                        </Button>
                    )}
                    {(props?.data?.dev_url && isDevelopment) && (
                        <MuiLink color="inherit" href={props.data.dev_url} target="_blank" rel="noopener noreferrer" underline="none">
                            <Button color="inherit" size="small" startIcon={<LinkIcon />}>
                                Dev
                            </Button>
                        </MuiLink>
                    )}
                    {props?.data?.repo && (
                        <MuiLink color="inherit" href={props.data.repo} target="_blank" rel="noopener noreferrer" underline="none">
                            <Button color="inherit" size="small" startIcon={<GitHubIcon />}>
                                Repo
                            </Button>
                        </MuiLink>
                    )}
                    </Box>
                </Stack>

                {/* Categories */}
                {props?.data?.category && (
                    <Stack direction="row" spacing={1} sx={{ maxWidth: "100%", flexWrap: "wrap" }}>
                        {props.data.category.map((cat: string) => (
                            <Chip key={cat} label={cat} variant="outlined" />
                        ))}
                    </Stack>
                )}

                {/* Tags */}
                {props?.data?.tags && (
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                        {props.data.tags.map((tag: string) => (
                            <Chip key={tag} label={tag} size="small" />
                        ))}
                    </Stack>
                )}
                Last Updated
                <DateTimeLabel />

                <Box>
                    {props?.data?.showCommits && (
                        <QueryWrapper path={(paths: { [key: string]: string }) => `${paths.commits}/${props?.data?.name}`}>
                            {(response) => response && (
                                <ReusablePopover data={response.data}>
                                    View Changelog
                                </ReusablePopover>
                            )}
                        </QueryWrapper>
                    )}
                    {props?.data?.docsLinkClick && (
                        <Button 
                            color="inherit" 
                            variant="text" 
                            fullWidth 
                            sx={{ textTransform: "none" }}
                            onClick={() => props.data.docsLinkClick(props.data)}
                        >
                            Docs
                        </Button>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default DisplayCard;

