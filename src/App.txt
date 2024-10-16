import { useEffect, useState } from "react";
import EnterOrExitCard from "./components/EnterOrExitCard";
import InfoCard from "./components/InfoCard";
import { io } from "socket.io-client";
import {
  Grid,
  GridItem,
  Text,
  Flex,
  Box,
  Divider,
  Image,
} from "@chakra-ui/react";

const socket = io.connect(import.meta.env.VITE_HOST);

function App() {
  const [entryEvent, setEntryEvent] = useState(null);
  const [exitEvent, setExitEvent] = useState(null);
  const [entryHistory, setEntryHistory] = useState([]);
  const [exitHistory, setExitHistory] = useState([]);

  // const handleAccessControlEvent = (data) => {
  //   const parsedData = JSON.parse(data);

  //   const currentDateTime = new Date();

  //   const eventWithDateTime = {
  //     event: parsedData,
  //     dateTime: currentDateTime,
  //   };

  //   if (parsedData.event_type === "ENTRY") {
  //     if (!entryEvent) {
  //       setEntryEvent(eventWithDateTime);
  //     } else {
  //       setEntryHistory((prevHistory) => [
  //         entryEvent,
  //         ...prevHistory.slice(0, 7),
  //       ]);
  //       setEntryEvent(eventWithDateTime);
  //     }
  //   } else if (parsedData.event_type === "EXIT") {
  //     if (!exitEvent) {
  //       setExitEvent(eventWithDateTime);
  //     } else {
  //       setExitHistory((prevHistory) => [
  //         exitEvent,
  //         ...prevHistory.slice(0, 7),
  //       ]);
  //       setExitEvent(eventWithDateTime);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   // socket.on("connect", () => {
  //   //   console.log(socket.id);
  //   // });

  //   socket.on("accessControlEvent", handleAccessControlEvent);

  //   return () => {
  //     socket.off("accessControlEvent", handleAccessControlEvent);
  //   };
  // }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });
    const handleAccessControlEvent = (data) => {
      const parsedData = JSON.parse(data);

      const currentDateTime = new Date();

      const eventWithDateTime = {
        event: parsedData,
        dateTime: currentDateTime,
      };

      if (parsedData.event_type === "ENTRY") {
        if (!entryEvent) {
          setEntryEvent(eventWithDateTime);
        } else {
          setEntryHistory((prevHistory) => [
            entryEvent,
            ...prevHistory.slice(0, 10),
          ]);
          setEntryEvent(eventWithDateTime);
        }
      } else if (parsedData.event_type === "EXIT") {
        if (!exitEvent) {
          setExitEvent(eventWithDateTime);
        } else {
          setExitHistory((prevHistory) => [
            exitEvent,
            ...prevHistory.slice(0, 10),
          ]);
          setExitEvent(eventWithDateTime);
        }
      }
    };
    socket.on("accessControlEvent", handleAccessControlEvent);

    return () => {
      socket.off("accessControlEvent", handleAccessControlEvent);
    };
  }, [entryEvent, exitEvent]);

  return (
    <Grid
      templateColumns="170px 1fr 170px"
      templateRows="100vh"
      fontFamily="poppins"
      overflow="hidden"
    >
      <GridItem
        borderColor="#035187"
        borderRightWidth={2}
        borderTopRightRadius={18}
      >
        <Text
          fontSize={18}
          textAlign="center"
          bg="#035187"
          borderTopRightRadius={18}
          p={2}
          color="white"
          mb={2}
          fontFamily="poppins"
        >
          Últimos ingresos
        </Text>
        {entryHistory.map((event, index) => (
          <InfoCard
            key={`entry-${index}`}
            name={event.event.name}
            batch={`Lote ${event.event.lote}, UF ${event.event.UF}`}
            dateTime={event.dateTime.toLocaleString()}
            category={event.event.category_id}
          />
        ))}
      </GridItem>
      <GridItem>
        <Flex justifyContent="center">
          <Image src="/logo.svg" mt={2} h="50px" />
        </Flex>
        <Flex h="100%" mt={6}>
          <Box flex="1" pl={16} mr={10}>
            <Flex alignItems="center">
              <Image src="/SignIn.svg" alt="Face-id img" h={8} mr={2} />
              <Text
                fontWeight={500}
                fontSize={{
                  xl: "22px",
                  "2xl": "26px",
                }}
              >
                Ingresando
              </Text>
            </Flex>
            {/* <Divider borderColor="#035187" borderWidth={1} /> */}
            {/* ENTRY */}
            {entryEvent && (
              <EnterOrExitCard event={entryEvent.event} title="Ingresando" />
            )}
          </Box>
          <Box flex="1" pr={16}>
            <Flex alignItems="center">
              <Image src="/SignOut.svg" alt="Face-id img" h={8} mr={2} />
              <Text
                fontSize={{
                  xl: "22px",
                  "2xl": "26px",
                }}
                fontWeight={500}
              >
                Egresando
              </Text>
            </Flex>

            {/* <Divider borderColor="#035187" borderWidth={1} /> */}
            {/* EXIT */}
            {exitEvent && (
              <EnterOrExitCard event={exitEvent.event} title="Egresando" />
            )}
          </Box>
        </Flex>
      </GridItem>
      <GridItem
        borderColor="#035187"
        borderLeftWidth={2}
        borderTopLeftRadius={18}
      >
        <Text
          fontSize={18}
          textAlign="center"
          bg="#035187"
          borderTopLeftRadius={18}
          p={2}
          color="white"
          mb={2}
          fontFamily="poppins"
        >
          Últimos egresos
        </Text>
        {exitHistory.map((event, index) => (
          <InfoCard
            key={`exit-${index}`}
            name={event.event.name}
            batch={`Lote ${event.event.lote}, UF ${event.event.UF}`}
            category={event.event.category_id}
            dateTime={event.dateTime.toLocaleString()} // dateTime={event.dateTime}
          />
        ))}
      </GridItem>
    </Grid>
  );
}

export default App;
