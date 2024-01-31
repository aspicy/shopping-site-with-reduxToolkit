import { useNavigate } from 'react-router-dom';

import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles';

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    const imageurl = imageUrl;

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage
                imageurl={imageurl}
                // Alternative to passing imageurl as a prop to styled component
                // style={{
                //     backgroundImage: `url(${imageUrl})`,
                // }}
            />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;