import Card from "./Card";

export default function TwistCard({ twist }: any) {
  return (
    <Card>
      <h2>🌩️ Twist</h2>
      <h3>{twist.name}</h3>
      <p>{twist.effect}</p>
    </Card>
  );
}