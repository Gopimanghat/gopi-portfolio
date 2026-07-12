import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="bg-black py-10 text-gray-400">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

          <p>
            © 2026 Gopikrishnan M. All rights reserved.
          </p>

          <p>
            Built with Next.js • Tailwind CSS • Framer Motion
          </p>

        </div>
      </Container>
    </footer>
  );
}