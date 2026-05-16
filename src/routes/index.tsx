import { createFileRoute } from "@tanstack/react-router";
import { Game } from "@/game/Game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Our Run Through Forever — Happy Anniversary" },
      {
        name: "description",
        content:
          "A cinematic playable love story — an endless run through every memory we've made together.",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Dancing+Script:wght@500;700&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <Game />;
}
