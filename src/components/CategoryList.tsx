import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  Typography,
  Card,
  Box,
  CardMedia,
  CardContent,
  useTheme,
} from '@mui/material';
import { Category } from '../types/Category';

const carouselSettings = {
  responsive: {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  },
  draggable: true,
  infinite: true,
  keyBoardControl: true,
  renderButtonGroupOutside: false,
  renderDotsOutside: false,
  showDots: false,
  swipeable: true,
};

type CategoryListProps = {
  categories: Category[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: '2rem',
        margin: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
        color: theme.palette.secondary.main,
      }}
    >
      <Typography variant="h3" sx={{ margin: '2rem' }}>
        Categories
      </Typography>
      <Carousel {...carouselSettings}>
        {categories.map((category) => (
          <Card
            key={category.id}
            sx={{ marginRight: '2rem', height: 350, width: 350 }}
          >
            <CardMedia
              component="img"
              sx={{ height: 300, aspectRatio: 1 }}
              image={category.image}
              alt={category.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {category.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default CategoryList;
