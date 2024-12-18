import { Box, Grid, Typography } from "@mui/material";

const EmployerDetail = ({ data }) => {
  return (
    <Box>
      {data ? (
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography className="my-1">
              <span className="font-bold">Họ tên: </span>
              {data?.fullName}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Email: </span>
              {data?.email}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Sinh nhật: </span>
              {data?.birthday}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">SDT: </span>
              {data?.phone_number}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Mã giới thiệu: </span>{" "}
              {data?.referral_code}
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Tên Cty: </span>
              {data?.company_name}
            </Typography>
            <Typography className="my-1 flex items-center">
              <span className="font-bold">Chức vụ: </span>
              <span>{data?.job_position}</span>
            </Typography>
            <Typography className="my-1">
              <span className="font-bold">Địa chỉ: </span>
              {data?.location}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Box>Thông tin mentor chưa được cập nhật!</Box>
      )}
    </Box>
  );
};

export default EmployerDetail;
