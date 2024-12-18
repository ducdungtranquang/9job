import { Table } from "@mantine/core";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

const TransactionDetail = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Đối tác</TableCell>
            <TableCell align="left">Số xu hoàn trả của giao dịch</TableCell>
            <TableCell align="left">Phần trăm hoàn trả của giao dịch</TableCell>
            <TableCell align="left">Số xu hiện tại</TableCell>
            <TableCell align="left">Phần trăm hiện tại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data?.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.source_name}
                </TableCell>
                <TableCell align="left">{row?.coins_refund}</TableCell>
                <TableCell align="left">
                  {parseFloat(row?.current_percent).toFixed(2)} %
                </TableCell>
                <TableCell align="left">{row?.wallet_coins}</TableCell>
                <TableCell align="left">
                  {parseFloat(row?.wallet_current_percent).toFixed(2)} %
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionDetail;
