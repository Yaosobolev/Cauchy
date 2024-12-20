import { notFound } from "next/navigation";
import { Container, Header, Result } from "@/components/shared";

export default function Home({ params: { id } }: { params: { id: string } }) {
  if (id !== "1" && id !== "test") return notFound();
  return (
    <Container>
      <Header id={id} />
      <Result id={id} />
    </Container>
  );
}
