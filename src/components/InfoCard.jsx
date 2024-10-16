import { Text, Flex, Divider } from "@chakra-ui/react";
// eslint-disable-next-line react/prop-types
const InfoCard = ({ name, batch, dateTime, category_id }) => {
  return (
    <Flex direction="column" px={2} mb={1}>
      <Text
        fontSize={12}
        color="#536d79"
        fontWeight={500}
       
      >
        {name}
      </Text>
      <Text fontSize={10} color="#536d79" fontWeight={500}>
        {category_id}
      </Text>
      <Text fontSize={12}>{batch}</Text>
      <Text fontSize={12} mb={1}>
        {dateTime}
      </Text>
      <Divider borderColor="#D9D9D9" />
    </Flex>
  );
};

export default InfoCard;
