import { getClient } from "@/data/fake-data";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { ContactInfo } from "./ContactInfo";
import { ContactInfoSkeleton } from "./ContactInfoSkeleton";
import { NoContactInfo } from "./NoContactInfo";

export const ContactDetails = () => {
  const { clientId } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", clientId],
    queryFn: () => getClient(clientId!),
    enabled: !!clientId, //cuando sea true, se ejecutará la consulta
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (!client) return <NoContactInfo />;
  if (isLoading) return <ContactInfoSkeleton />;
  if (client) return <ContactInfo client={client} />;
};
