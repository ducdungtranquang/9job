import { Table } from "@mantine/core";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const CoinRefundDetail = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Đối tác</TableCell>
            <TableCell align="left">Số xu hoàn trả</TableCell>
            <TableCell align="left">Phần trăm hoàn trả</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data?.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {console.log()}
                  {row?.category_name}
                </TableCell>
                <TableCell align="left">{row?.total_coin_amount}</TableCell>
                <TableCell align="left">
                  {parseFloat(row?.percentage).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CoinRefundDetail;
