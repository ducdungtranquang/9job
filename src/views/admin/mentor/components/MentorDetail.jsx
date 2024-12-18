import { Box, Grid, Rating, Typography } from "@mui/material";

const MentorDetailPage = ({ data }) => {
  return (
    <Box>
      {data ? (
        <Grid container>
          <Grid item xs={6}>
            <Typography className="my-1">
              <span className="font-bold">Công ty:</span> {data?.company_name}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Vị trí:</span> {data?.company_position}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Lĩnh vực:</span> {data?.company_industry}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">SL mentee:</span> {data?.mentee_no}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Lượt xem:</span> {data?.views}
            </Typography>
            <Typography className="my-1 flex items-center">
              <span className="font-bold">Đánh giá:</span> <Rating value={data.rating} readOnly />
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Giờ làm việc:</span> {data?.working_hour}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Loại liên kết:</span> {data?.connection_type}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Link kết nối:</span> {data?.connection_link}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Box>Thông tin mentor chưa được cập nhật!</Box>
      )}
    </Box>
  );
};

export default MentorDetailPage;
