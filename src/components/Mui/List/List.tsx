import { List, ListItem } from '@mui/material';


const ListContainer = (props: { data?: any[] }) => (
    <List>
        {props?.data
            && props.data.map((listItem, index) => (
                <ListItem key={index} {...listItem?.listItemProps}>
                    {listItem?.name}
                </ListItem>
            ))
        }
    </List>
);

export default ListContainer;
