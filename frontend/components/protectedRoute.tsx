// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";

// // export default function ProtectedRoute({ children }) {
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");

// //     if (!token) {
// //       router.push("/auth/login");
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [router]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         Loading...
// //       </div>
// //     );
// //   }

// //   return children;
// // }

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/auth/login");
//       setIsAuthenticated(false);
//     } else {
//       setIsAuthenticated(true);
//     }
//   }, [router]);

//   // Still checking localStorage or actively redirecting
//   if (isAuthenticated === null || isAuthenticated === false) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return <>{children}</>;
// }