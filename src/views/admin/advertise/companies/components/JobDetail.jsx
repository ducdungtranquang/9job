import { Box, Flex, Image, Text } from "@mantine/core";
import PreviewHtmlCode from "components/PreviewHtmlCode";

const JobDetail = ({ data }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          padding: "8px",
          width: "100%",
          textAlign: "start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexBasis: "50%",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          }}
        >
          <Flex gap={"sm"}>
            <Text weight={500}>{"Tên công việc"}: </Text>
            <Text>{data.job_details?.name}</Text>
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Mô tả công việc"}: </Text>
            <PreviewHtmlCode htmlCode={data.job_details?.job_descriptions} />
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Yều cầu công việc"}: </Text>
            <PreviewHtmlCode htmlCode={data.job_details?.job_requirements} />
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Lợi ích"}: </Text>
            <PreviewHtmlCode htmlCode={data.job_details?.benefits} />
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Quyền lợi"}: </Text>
            <PreviewHtmlCode htmlCode={data.job_details?.rights} />
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Địa chỉ làm việc"}: </Text>
            <PreviewHtmlCode htmlCode={data.job_details?.work_places} />
          </Flex>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexBasis: "50%",
            flexDirection: "column",
            gap: "8px",
            padding: "8px",
          }}
        >
          <Flex gap={"sm"}>
            <Text weight={500}>{"Vị trí ứng tuyển"}: </Text>
            <Text>{data.job_details?.position}</Text>
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Kinh nghiệm"}: </Text>
            <Text>{data.job_details?.experience}</Text>
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Hình thức làm việc"}: </Text>
            <Text>{data.job_details?.work_arrangement}</Text>
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Tên công ty"}: </Text>
            <Text>{data.company?.name}</Text>
          </Flex>
          <Flex gap={"sm"}>
            <Text weight={500}>{"Logo Công ty"}: </Text>
            <Box>
              <Image 
              width={100}
              height={100}
              src={data?.company_logo} />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default JobDetail;
