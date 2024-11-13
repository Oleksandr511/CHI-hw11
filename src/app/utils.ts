// import { useRouter } from "next/router";

export const handleCardClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  id: string,
  router: ReturnType<typeof useRouter>
) => {
  const target = e.target as HTMLDivElement;
  if (target.tagName === "BUTTON") return;

//   const router = useRouter(); // Use useRouter to navigate
  router.push(`/post/${id}`); // Navigate to the dynamic route
  
};
