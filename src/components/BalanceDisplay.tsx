import React, { useState, useEffect } from "react";
import { getBalance } from "../utils/ethers";
import { Card, CardBody, CardHeader, CircularProgress, Heading, useToast, Text, Box } from "@chakra-ui/react";
import TransferButton from "./TransferButton";

interface BalanceDisplayProps {
  address: string | null;
}

const BalanceDisplay = ({ address }: BalanceDisplayProps) => {
  const toast = useToast();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (address) {
        try {
          const bal = await getBalance(address);
          setBalance(bal);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
          toast({
            title: "Fetch Balance Failed",
            description: "Failed to fetch balance. Please try again.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    };
    fetchBalance();
  }, [address, toast]);

  return (
    <Card mx="auto" mt={6} mb={6} p={6} shadow="md" borderRadius="lg" bg="gray.50" minW={{ lg: "600px" }}>
      <CardHeader>
        <Heading as="h1" size="md">
          Welcome to Scroll Wallet Transfer
        </Heading>
      </CardHeader>
      <CardBody>
        {address && <>
          <Text fontWeight={700}> Wallet Balance:</Text>
          <Box mb={4}>
            {balance ? <p>{balance} ETH</p> : <CircularProgress isIndeterminate />}
          </Box>
          <TransferButton address={address} balance={balance}/>
        </>}
      </CardBody>
    </Card>
  );
};

export default BalanceDisplay;
