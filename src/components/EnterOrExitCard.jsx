import PropTypes from "prop-types";
import { Text, Divider, Image, Flex } from "@chakra-ui/react";
// import GuestCard from './GuestCard';
// eslint-disable-next-line react/prop-types
const EnterOrExitCard = ({ event }) => {
  const { name, UF, lote, picture, category_id } = event;
  return (
    <Flex direction="column" px={2}>
      {/* <Image
        src="/faceImg.png"
        alt="Face-id img"
        mt={4}
        mb={2}
        boxSize="550px"
        objectFit="cover"
        h="auto"
      /> */}

      <Image
        src={`data:image/png;base64,${picture}`}
        alt="Face-id img"
        mt={4}
        mb={2}
        boxSize="450px"
        objectFit="cover"
        h="auto"
      />
      <Text
        fontSize={{
          xl: "24px",
          "2xl": "35px",
        }}
        fontWeight={600}
        color="#536d79"
      >
        {/* <Text fontSize={20} fontWeight={600} color="#536d79"> */}
        {name}
      </Text>
      <Text
        fontWeight={300}
        fontSize={{
          xl: "20px",
          "2xl": "24px",
        }}
      >
        {`${category_id}, Lote ${lote} - UF ${UF}`}
      </Text>
      {/* <Divider borderWidth={1} borderColor="#D9D9D9" /> */}
    </Flex>
  );
};

EnterOrExitCard.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    UF: PropTypes.number.isRequired,
    lote: PropTypes.number.isRequired,
    category_id: PropTypes.string.isRequired,
    picture: PropTypes.isRequired,
  }),
};

export default EnterOrExitCard;
