import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { PageHeader } from "@/components/PageHeader";
import { ReferenceImage } from "@/components/ReferenceImage";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const signDescriptions: Record<string, string> = {
  A: "Make a fist with thumb alongside",
  B: "Fingers together pointing up, thumb across palm",
  C: "Curved hand forming C shape",
  D: "Index finger up, other fingers touch thumb",
  E: "All fingertips touching thumb",
  F: "Index and thumb touching in circle, other fingers up",
  G: "Index finger and thumb pointing forward",
  H: "Index and middle finger extended sideways",
  I: "Pinky finger extended up",
  J: "Draw a J with pinky finger",
  K: "Index and middle finger up, thumb between them",
  L: "Thumb and index forming L shape",
  M: "Thumb under three fingers",
  N: "Thumb under two fingers",
  O: "All fingertips touching in circle",
  P: "Like K but pointing down",
  Q: "Index finger and thumb pointing down",
  R: "Index and middle fingers crossed",
  S: "Fist with thumb across fingers",
  T: "Thumb between index and middle",
  U: "Index and middle fingers together, pointing up",
  V: "Index and middle fingers apart, pointing up",
  W: "Three fingers up and apart",
  X: "Index finger curved like a hook",
  Y: "Thumb and pinky extended",
  Z: "Draw a Z with index finger",
  "👍": "Thumbs up gesture",
};

const Guide = () => {
  const navigate = useNavigate();

  return (
    <PageLayout onBack={() => navigate("/")} backAriaLabel="Back to home">
      <PageHeader
        title="Sign Language Guide"
        subtitle="Browse the ASL alphabet and jump into letter practice"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {alphabet.concat("👍").map((letter) => (
          <article
            key={letter}
            className="panel-card p-4 sm:p-5 hover:border-primary hover:neon-glow transition-all duration-300 space-y-3 group flex flex-col"
          >
            <div className="text-center">
              <span className="text-4xl sm:text-5xl font-bold text-primary group-hover:scale-105 transition-transform duration-300 inline-block">
                {letter}
              </span>
            </div>

            {letter.length === 1 && /[A-Z]/.test(letter) && (
              <ReferenceImage letter={letter} compact frameClassName="min-h-[100px]" />
            )}

            <p className="text-xs text-muted-foreground text-center min-h-[2.5rem] leading-snug">
              {signDescriptions[letter]}
            </p>

            <Button
              onClick={() => navigate(`/practice/${letter}`)}
              size="sm"
              className="w-full rounded-xl mt-auto focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              variant="outline"
            >
              Practice
            </Button>
          </article>
        ))}
      </div>
    </PageLayout>
  );
};

export default Guide;
