import { Container, Typography, useTheme } from '@mui/material';
import { formatPrice } from '../utils/helpers';

type Props = {
  title: string;
  price: number;
  description: string;
  categoryName: string;
};

const ProductDetail = ({ title, price, description, categoryName }: Props) => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        padding: '2rem',
        color: theme.palette.secondary.main,
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h6" sx={{ color: 'red' }}>
        {formatPrice(price)}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <Typography variant="body1">
        <span style={{ fontWeight: 500 }}>Category:</span> {categoryName}
      </Typography>
    </Container>
  );
};
export default ProductDetail;
