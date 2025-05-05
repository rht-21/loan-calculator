import { Button } from "@mui/material";

const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-dvh">
      <h3 className="text-2xl md:text-4xl mb-2 text-center">
        Ugh! Page Not Found.
      </h3>
      <p className="text-lg text-center">
        The page you are looking for does not exist.
      </p>
      <Button variant="contained" href="/" className="!my-5">
        Return Home
      </Button>
    </main>
  );
};

export default NotFound;
